import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useContext } from "react";
import { ScrollContext } from "../contextProvider/scrollContext";


export const ContactSection = ({ isDark }: { isDark: boolean }) => {
    const context = useContext(ScrollContext);

    return <div ref={context?.contactRef} className="mt-16 md:mt-24 text-center">
        <div className="mb-12">
            <h2 className={`text-5xl md:text-7xl italic ${isDark ? 'text-white' : 'text-black'}`}>Talk to me</h2>
        </div>

        <div className="flex justify-center items-center gap-4">

            {[Github, Linkedin, Mail, Twitter].map((Icon, i) => (
                <div onClick={() => { }}
                    key={i} className="w-28 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer">

                    <Icon className="w-6 h-6 text-black" />

                </div>
            ))}
        </div>
    </div>
}
