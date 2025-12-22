
import { CategorySection } from '../components/CategorySection';
import { ContactSection } from '../components/ContactSection';
import { HeroSection } from '../components/HeroSection';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useContext, useEffect } from 'react';
import { ScrollContext } from '../contextProvider/scrollContext';


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
    }, [location.hash]); // imp if at / and wants to scroll to contact (hash changes)

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
