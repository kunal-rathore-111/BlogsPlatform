import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { LayoutPage } from "./Pages/LayoutPage";
import { HomePage } from "./Pages/HomePage";
import { PostDetailPage } from "./Pages/PostDetailPage";
import { AllPostsPage } from "./Pages/AllPostsPage";
import { PostsDataContextProvider } from "./contextProvider/postsDataContext";
import { useFetch } from "./hooks/queryHooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { LandingPage } from "./Pages/LandingPage";
import { toggleTheme } from "./features/themeSlice";
import { Moon, Sun } from "lucide-react";







function LenisWrapper({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time: number) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }

    return () => {
      // Keep instance alive for entire app
    };
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  return <>{children}</>;
}

export default function App() {


  const isDark = useSelector((state: RootState) => state.theme.isDark)


  return (


    <BrowserRouter>
      <LenisWrapper>

        <Routes>
          <Route path="/" element={<LandingPage isDark={isDark} />} />

          {/* Parent Route to keep fix the Nav bar */}
          <Route element={<LayoutPage />}>


            {/* the loads the Home page */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/all-posts" element={<AllPostsPage />} />
            <Route path="/post-detail/:id" element={<PostDetailPage />} />
          </Route>
        </Routes>
      </LenisWrapper>
    </BrowserRouter >
  );
}
