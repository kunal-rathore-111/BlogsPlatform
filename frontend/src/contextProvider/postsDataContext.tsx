import { createContext, type ReactNode } from "react";
import { type PostType } from "../hooks/queryHooks/useFetch";




export const postsDataContext = createContext<PostType[] | null>(null);

export function PostsDataContextProvider({ children, data }: { children: ReactNode, data: PostType[] }) {

    return <postsDataContext.Provider value={data}>
        {children}
    </postsDataContext.Provider>
}