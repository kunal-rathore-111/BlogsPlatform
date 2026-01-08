import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Nav";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { ScrollContextProvider } from "../contextProvider/scrollContext";
import { PostsDataContextProvider } from "../contextProvider/postsDataContext";
import { useFetch } from "../hooks/queryHooks/useFetch";


export function LayoutPage() {


    const { data, isLoading, isError, error } = useFetch(); // runs only ones when the HomePage mounts

    const isDark = useSelector((state: RootState) => state.theme.isDark);


    if (isLoading) return <div>
        <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
            <svg className="animate-spin h-12 w-12 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="img" aria-label="Loading">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
        </div>
    </div>

    return <ScrollContextProvider >

        <div className={`min-h-screen transition-colors duration-700 ${isDark ? 'bg-black' : 'bg-white'}`}>

            <div className="fixed top-0 left-0 right-0 z-50">
                <div className="h-2 md:h-3 flex justify-center">
                    <div className="w-full max-w-[950px] h-full backdrop-blur-xl"></div>
                </div>

                <div className={`max-w-[950px] mx-auto transition-colors duration-700 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#ededec]'}`}>

                    <Navbar />
                </div>
            </div>

            <PostsDataContextProvider props={{ data, isLoading, isError, error }}>
                <MainPage />

            </PostsDataContextProvider>
        </div>

    </ScrollContextProvider>
}

function MainPage() {



    const isDark = useSelector((state: RootState) => state.theme.isDark);





    return <main className="pt-24 md:pt-28 p-4 md:p-8">
        <div className={`max-w-[950px] mx-auto rounded-3xl overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#ededec]'}`}>
            <div className="p-6 md:p-12">
                <Outlet />
            </div>
        </div>
    </main>
}