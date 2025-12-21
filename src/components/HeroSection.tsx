import { ArrowUpRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";


export function HeroSection() {
    return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LeftCard />
        <RightCards />
    </div>
}


function LeftCard() {
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    return <>
        <div className="lg:col-span-2">
            <div
                className={` relative rounded-3xl overflow-hidden h-[450px] group ${isDark ? 'bg-gradient-to-br from-blue-900 to-blue-800' : 'bg-gradient-to-br from-blue-200 to-blue-300'}`}>

                {/* Render the post image */}
                <ImgComp imgUrl={'https://images.unsplash.com/photo-1762430815620-fcca603c240c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcnVud2F5JTIwbW9kZWx8ZW58MXx8fHwxNzY1NjQ5MDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'} alt={'tag1'} />

                <div className="absolute top-6 right-8 bottom-6 max-w-xs">
                    <div className={`rounded-2xl p-6 shadow-lg ${isDark ? 'bg-[#2a2a2a]' : 'bg-white'}`}>
                        <div className={`text-xs mb-3 ${isDark ? 'text-white/60' : 'opacity-60'}`}>

                            + Travel

                        </div>
                        <h3 className={`text-2xl mb-2 ${isDark ? 'text-white' : 'text-black'}`}>

                            Get to your dream now destinations with Travel Pro

                        </h3>
                        <p className={`text-sm ${isDark ? 'text-white/60' : 'opacity-60'}`}>

                            Learn more about amazing travel destinations...

                        </p>
                    </div>
                </div>

                <div onClick={() => { }} /*Onclick will Redirect to post detail route */
                    className={`cursor-pointer absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-white hover:bg-gray-100'}`}>

                    <ArrowUpRight className="w-5 h-5" />
                </div>
            </div>
        </div>
    </>
}


function RightCards() {
    const navigate = useNavigate();
    return <>
        <div className="flex flex-col gap-6">
            <RightCard1 />
            <RightCard2 />
        </div>
    </>

    /* the first card of right card */
    function RightCard1() {

        const isDark = useSelector((state: RootState) => state.theme.isDark);
        return <>
            <div className={`relative rounded-3xl p-6 h-[210px] flex flex-col justify-between ${isDark ? 'bg-gradient-to-br from-cyan-900 to-cyan-800' : 'bg-gradient-to-br from-cyan-100 to-cyan-200'}`}>

                <div className="flex items-start justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs ${isDark ? 'border border-white/40 text-white' : 'border border-gray-400'}`}>

                        + ADS

                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-white hover:bg-gray-100'}`}>
                        <Plus className="w-4 h-4" />
                    </div>
                </div>
                <div>
                    <div className={`text-sm mb-1 ${isDark ? 'text-white' : ''}`}>
                        Become A
                        <br />
                        BROADCAST MEMBER
                    </div>
                    <h3 className={`text-2xl mb-3 ${isDark ? 'text-white' : ''}`}>
                        Real talk in a corporate world
                    </h3>
                    <button
                        onClick={() => navigate('/post-detail/1')} /*Onclick will Redirect to post detail route */
                        className={`text-xs hover:underline transition-all ${isDark ? 'text-white/80' : ''}`}>
                        Learn more
                    </button>
                </div>
            </div>
        </>
    }

    /* the second card of right card */
    function RightCard2() {

        const isDark = useSelector((state: RootState) => state.theme.isDark);
        return <>
            < div className={`relative rounded-3xl overflow-hidden h-[210px] group ${isDark ? 'bg-gradient-to-br from-green-900 to-green-800' : 'bg-gradient-to-br from-green-200 to-green-300'}`
            }>
                <ImgComp imgUrl={'https://images.unsplash.com/photo-1762430815620-fcca603c240c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcnVud2F5JTIwbW9kZWx8ZW58MXx8fHwxNzY1NjQ5MDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'} alt={'tag1'} />

                <div onClick={() => { }} /*Onclick will Redirect to post detail route */
                    className={`cursor-pointer absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-400 hover:scale-120 ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-white hover:bg-gray-100'}`}>

                    <span className="text-sm">→</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                    <div
                        className={`w-full rounded-2xl px-4 py-3 text-sm transition-all duration-300 hover:scale-105 ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-white hover:bg-gray-100'}`}>

                        TITLE

                    </div>
                </div>
            </div >
        </>
    }

}


function ImgComp({ imgUrl, alt }: { imgUrl: string, alt: string }) {

    const isDark = useSelector((state: RootState) => state.theme.isDark);
    return <img
        src={imgUrl}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isDark ? 'opacity-80' : ''}`}
    />
}