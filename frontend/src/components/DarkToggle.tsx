import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { Moon, Sun } from "lucide-react";
import type { RootState } from "../store/store";



export function DarkToggle() {

    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const dispatch = useDispatch();
    return <button
        onClick={() => { dispatch(toggleTheme()) }}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 ${isDark
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-black text-white hover:bg-gray-800'
            }`}
    >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
}