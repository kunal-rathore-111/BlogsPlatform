import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';

import { Home } from 'lucide-react';
import { DarkToggle } from './DarkToggle';

export function Navbar() {

    const navigate = useNavigate();



    const isDark = useSelector((state: RootState) => state.theme.isDark);
    return (

        <header className={`w-full px-6 md:px-12 py-6 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">

                    <div onClick={() => { navigate('/') }}
                        className={`cursor-pointer ${isDark ? 'text-white' : 'text-black'}`}>
                        <Home></Home>
                    </div>

                    {/* Logo/Name */}
                    <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); navigate('/home') }}
                        className={`  text-2xl tracking-tight transition-opacity hover:opacity-70  italic ${isDark ? 'text-white' : 'text-black'}`}>
                        Epistoria
                    </button>

                    <nav className="flex flex-row items-center gap-6 text-sm">

                        <AllPosts_ContactButton title={'AllPosts'}
                            onClickFunc={() => navigate('/all-posts')}
                            isDark={isDark} />

                        <AllPosts_ContactButton title={'Contact'}
                            onClickFunc={() => navigate('/home/#contact')}
                            isDark={isDark} />

                    </nav>
                </div>
                {/* dark theme icon */}
                <DarkToggle />
            </div>
        </header >
    );
}

interface AllPosts_ContactButton_DTO {
    title: string, onClickFunc: () => void, isDark: boolean
}
const AllPosts_ContactButton = ({ title, onClickFunc, isDark }: AllPosts_ContactButton_DTO) => {

    return <button
        onClick={onClickFunc}
        className={`transition-opacity hover:opacity-70 ${isDark ? 'text-white/90' : 'text-black/90'}`}>
        {title}

    </button>

}
