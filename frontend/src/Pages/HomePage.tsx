
import { CategorySection } from '../components/CategorySection';
import { ContactSection } from '../components/ContactSection';
import { HeroSection } from '../components/HeroSection';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useContext, useEffect } from 'react';
import { ScrollContext } from '../contextProvider/scrollContext';
import { useFetch } from '../hooks/queryHooks/useFetch';


export function HomePage() {

    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const navigate = useNavigate();

    const location = useLocation(); // to scroll to the contact section using useEffect hash based scroll
    const context = useContext(ScrollContext);

    /* Scroll whenever the hash changes  */
    useEffect(() => {
        if (location.hash === '#contact') {
            context?.scrollToFunc();
        }
    }, [location.hash]); // imp if at / route and wants to scroll to contact (hash changes)


    const { data, isLoading, isError, error } = useFetch(); // runs only ones when the HomePage mounts



    if (isLoading) return <div>
        <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
            <svg className="animate-spin h-12 w-12 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="img" aria-label="Loading">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
        </div>
    </div>

    if (isError) return (
        <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
            <div className={`max-w-lg w-full p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                <div className="flex items-start gap-4">
                    <svg className={`h-10 w-10 flex-shrink-0 ${isDark ? 'text-red-400' : 'text-red-600'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold">Something went wrong</h3>
                        <p className="mt-1 text-sm opacity-80">{error?.message ?? 'An unexpected error occurred. Please try again.'}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    console.log("DATA:", data);

    return (
        <div className='flex flex-col gap-30'>
            <div>
                <div className="flex items-end justify-between mb-8">

                    <h2 className={`text-5xl md:text-7xl italic ${isDark ? 'text-white' : 'text-black'}`}>
                        Top latest posts
                    </h2>

                    <button
                        onClick={() => navigate('/all-posts')}
                        className={`text-sm pb-2 transition-all duration-600 hover:translate-x-1 ${isDark ? 'text-white/60 hover:text-white' : 'opacity-60 hover:opacity-100'}`}>
                        See all posts →
                    </button>
                </div>
                <HeroSection></HeroSection>
            </div>

            <div className='flex flex-col gap-30'>
                <CategorySection isDark={isDark} data={fashionData} />
                <CategorySection isDark={isDark} data={fashionData} />
                <CategorySection isDark={isDark} data={fashionData} />
                <CategorySection isDark={isDark} data={fashionData} />
            </div>

            <footer>
                <ContactSection isDark={isDark}></ContactSection>
            </footer>
        </div>
    );
}


const fashionData = {

    title: "Fashion ",
    subtitle: "Category",
    cards: {
        left: {
            image: "...",
            title: "Sustainable Fashion",
            gradient: 'bg-gradient-to-br from-purple-900 to-purple-800'
        },
        center: {
            image: "...",
            title: "Representing brands as the source for inspiration",
            gradient: 'bg-gradient-to-br from-amber-900 to-amber-800'
        },
        right: {
            image: "...",
            tag: "+ Fashion",
            title: "How brands dictate the vision",
            gradient: 'bg-gradient-to-br from-blue-900 to-blue-800'
        }
    }
};
