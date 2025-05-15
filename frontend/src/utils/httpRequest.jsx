import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

export const httpRequest = async (
    endpoint,
    method = "GET",
    body = {},
    queryParams = {},
    authentication = false,
    formData = false,
) => {
    try {
        const baseUrl = import.meta.env.VITE_Backend_Url
        console.log("base url : ", baseUrl)
        const config = {
            method: method.toUpperCase(),
            url: `${baseUrl}${endpoint}`,
            params: queryParams,
            data: body,
            headers: {
                "Content-Type": formData ? "multipart/form-data" : "application/json",
            },
        };

        if (authentication) {
            const token = localStorage.getItem("token");
            console.log("http token : ", token)
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }

        const response = await axios(config);

        return response.data;
    } catch (error) {
        if (error?.response?.data === "Unauthorized") {
            router?.push("/login");
            toast?.error(error?.response?.data);
            return false;
        }
        console.log("error", error);
        toast.error(error?.response?.data?.errors?.msg || "An error occurred");
        return false;
    }
};
