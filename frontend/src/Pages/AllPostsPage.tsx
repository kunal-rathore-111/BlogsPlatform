

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import type { RootState } from '../store/store';
import { samplePostss } from './PostDetailPage';

export const AllPostsPage = () => {
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const navigate = useNavigate();

    const [visibleCount, setVisibleCount] = useState(5);


    const blogs = samplePostss;
    const visibleBlogs = blogs.slice(0, visibleCount); // show top 5 blogs only
    const hasMore = visibleCount < blogs.length; // store boolean

    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + 5, blogs.length));
    };

    // Scroll to top on dom render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}
        >
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className={`flex items-center gap-2 mb-8 transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}>

                    <span className='flex gap-2'> <ArrowLeft className="w-5 h-5" />Back to Home</span>
                </button>

                {/* Title */}
                <div className="mb-12">
                    <h2 className={`text-5xl md:text-7xl italic ${isDark ? 'text-white' : 'text-black'}`}>
                        All Posts
                    </h2>
                    <p className={`text-lg mt-4 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                        Showing {visibleBlogs.length} of {blogs.length} posts
                    </p>
                </div>

                {/* Post Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleBlogs.map((blog) => (
                        <div
                            key={blog.id}
                            className={`relative rounded-3xl overflow-hidden h-[400px] group cursor-pointer ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                                }`}
                            onClick={() => navigate(`/post-detail/${blog.id}`)}
                        >
                            <img
                                src={blog.image}
                                alt={blog.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Date & Tags */}
                            <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                                <span className={`px-3 py-1 rounded-full backdrop-blur text-xs ${isDark ? 'bg-white/90 text-black' : 'bg-white/90'}`}>
                                    {blog.date}
                                </span>
                                {blog.tags.slice(0, 2).map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded-full border border-white/40 backdrop-blur text-white text-xs"
                                    >
                                        + {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-white text-xl mb-2 line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-white/80 text-sm line-clamp-2 mb-4">
                                    {blog.description}
                                </p>
                            </div>

                            {/* Arrow Button */}
                            <button
                                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-white hover:bg-gray-100'
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/post-detail/${blog.id}`);
                                }}
                            >
                                <ArrowUpRight className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                    <div className="flex justify-center mt-12 mb-20">
                        <button
                            onClick={loadMore}
                            className={`px-8 py-4 rounded-full transition-colors ${isDark
                                ? 'bg-white text-black hover:bg-gray-200'
                                : 'bg-black text-white hover:bg-gray-800'
                                }`}
                        >
                            Load More
                        </button>
                    </div>
                )}

                {/* End Message */}
                {!hasMore && blogs.length > 5 && (
                    <div className={`text-center mt-12 mb-20 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                        You've reached the end of all posts
                    </div>
                )}
            </div>
        </motion.div>
    );
};