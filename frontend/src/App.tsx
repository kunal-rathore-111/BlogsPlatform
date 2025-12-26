import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Client } from "./config/queryClient";
import { LayoutPage } from "./Pages/LayoutPage";
import { HomePage } from "./Pages/HomePage";
import { PostDetailPage } from "./Pages/PostDetailPage";
import { AllPostsPage } from "./Pages/AllPostsPage";

export default function App() {


  return <QueryClientProvider client={Client}>

    <BrowserRouter>
      <Routes>
        {/* Parent Route to keep fix the Nav bar */}
        <Route element={<LayoutPage />} >
          {/* the main page loads the Home page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/all-posts" element={<AllPostsPage />} />
          <Route path="/post-detail/:id" element={<PostDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
}
