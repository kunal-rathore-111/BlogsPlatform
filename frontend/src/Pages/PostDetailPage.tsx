import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import type { RootState } from '../store/store';
import { BackToPostsButton } from '../components/BackToPostsButton';
import { postsDataContext } from '../contextProvider/postsDataContext';
import { NoPostsComponent } from '../components/NoPosts';


export const PostDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);


    const postsData = useContext(postsDataContext);




    const isDark = useSelector((state: RootState) => state.theme.isDark)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // no postsData
    if (!Array.isArray(postsData?.data)) {
        return <NoPostsComponent isDark={isDark} />
    }

    const post = postsData?.data.find(p => p.id === id);

    // invalid post id
    if (!post) {
        return <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
            <h2 className="text-3xl font-bold mb-4">Post not found</h2>
            <BackToPostsButton></BackToPostsButton>
        </div>

    }

    const handleCopyLink = async () => {
        const postUrl = `${window.location.origin}/post-detail/${id}`;
        try {
            await navigator.clipboard.writeText(postUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >

        <BackToPostsButton></BackToPostsButton>


        <motion.div
            className="relative rounded-3xl overflow-hidden mb-8 h-100 md:h-125"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <img
                src={post.imageUrl}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover"
            />
        </motion.div>

        {/* Date, Category Tags and Author*/}
        <motion.div
            className="flex flex-wrap items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <span className={`px-4 py-2 rounded-full text-sm ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-gray-100 text-black border border-gray-200'}`}>

                {post.updated_at.slice(0, 10)}

            </span>
            <span className={`px-4 py-2 rounded-full text-sm ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-gray-100 text-black border border-gray-200'}`}>

                + {post.category}

            </span>

            {post.author ?
                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                    - By {post.author}
                </span>
                :
                null
            }
        </motion.div>

        {/* Tags */}
        <motion.div
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            {post.tags.map((tag, index) => (
                <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm ${isDark
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'bg-gray-100 text-black border border-gray-200'
                        }`}
                >
                    + {tag}
                </span>
            ))}
        </motion.div>

        <motion.h1
            className={`text-4xl md:text-6xl mb-6 ${isDark ? 'text-white' : 'text-black'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            {post.title}
        </motion.h1>

        {/* Description */}
        <motion.p
            className={`text-xl mb-8 ${isDark ? 'text-white/80' : 'text-black/80'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
        >
            {post.description}
        </motion.p>

        {/* Divider line */}
        <motion.div
            className={`h-px mb-8 ${isDark ? 'bg-white/10' : 'bg-black/10'}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
        />

        {/* Content */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={`prose prose-lg max-w-none ${isDark
                ? 'prose-invert prose-headings:text-white prose-p:text-white/80 prose-a:text-blue-400'
                : 'prose-headings:text-black prose-p:text-black/80 prose-a:text-blue-600'
                }`}
        >
            {post?.description?.split('\n\n').map((paragraph, index) => (
                <p key={index} className={isDark ? 'text-white/80' : 'text-black/80'}>
                    {paragraph}
                </p>
            ))}
        </motion.div>
        <motion.div
            className={`mt-12 pt-8 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
        >
            <h3 className={`text-xl mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                Share this post
            </h3>
            <button
                onClick={handleCopyLink}
                className={`px-6 py-3 rounded-full transition-colors ${isDark ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' : 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-200'}`}>
                {copied ? 'Copied!' : 'Copy Link'}
            </button>
        </motion.div>
    </motion.div>
}