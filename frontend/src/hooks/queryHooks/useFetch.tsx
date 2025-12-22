import { apiService } from "../../config/service.api";
import { isAxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";


async function fetchData(hash: string): Promise<any[]> {

    try {
        const res = await apiService({ method: "GET", url: hash });

        return res.data;
    }
    catch (err) {
        if (isAxiosError(err)) {
            if (err.response?.status === 404) {
                const msg = 'End point not found';
                throw new Error(msg);
            }
            else {
                const msg = err.response?.data?.message || 'Something went wrong while fetching axios error';
                throw new Error(msg);
            }
        }
        throw new Error('Something went wrong while fetching')

    }
}


export function useFetch(hash: string) {
    return useQuery({
        queryKey: ["data"],
        queryFn: () => { return fetchData(hash) }
    })
}