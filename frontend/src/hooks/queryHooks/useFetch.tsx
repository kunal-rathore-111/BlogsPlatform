import { apiService } from "../../config/service.api"
import { useQuery } from "@tanstack/react-query";


type Post = {
    title: string;
    description: string;
    imageUrl: string;
    readTimeMints: number;
    category: 'entertainment' | 'myLife' | 'technology' | 'fashion' | 'travel' | 'games' | 'jobs' | 'others';
    tags: string[];
};

async function fetchPosts(): Promise<Post[] | string> {

    try {
        const response = await apiService({
            url: '/fetch-posts',
            method: "GET"
        });

        console.log(response.data);

        if (response.data.posts) return response.data.posts;

        else {
            throw new Error(response.data.message || "Someething"); // if fetch failed due to db error
        }

    } catch (err) {
        console.log("Error while fetching- ", err);
        throw err; // for useQuery
    }
}


export const useFetch = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });
}