import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { BackToPostsButton } from '../components/BackToPostsButton';

// Sample blog post data - replace with your backend data
export const samplePostss = [
    {
        id: '1',
        title: 'Get to your dream now destinations with Travel Pro',
        description: 'Learn more about amazing travel destinations and how to plan your perfect vacation with expert tips and insider knowledge.',
        content: `Traveling to dream destinations has never been more accessible. With proper planning and the right mindset, you can turn your travel dreams into reality.

Planning your journey is the first step to success. Research your destination, understand the local culture, and prepare for the adventure ahead. Every great trip starts with thorough preparation.

The world is full of incredible places waiting to be explored. From pristine beaches to mountain peaks, from bustling cities to quiet villages, there's a destination for every type of traveler.

Don't let fear or uncertainty hold you back. Start small, gain confidence, and gradually expand your horizons. The experiences you'll gain are invaluable and will stay with you forever.

Remember, the journey is just as important as the destination. Embrace the unexpected, meet new people, and create memories that will last a lifetime.`,
        image: 'https://images.unsplash.com/photo-1714412192114-61dca8f15f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcGFyYWRpc2V8ZW58MXx8fHwxNzY1NjQ4MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Travel', 'Adventure', 'Tips'],
        category: 'travel',
        date: 'Sep 06, 2022',
        author: 'John Doe',
        readTime: '5'
    },
    {
        id: '2',
        title: 'Real talk in a corporate world',
        description: 'Learn more about our community and benefits of being part of the Broadcast membership.',
        content: `The corporate world can be challenging, but it doesn't have to be impersonal. Real conversations and authentic connections matter more than ever.

Building a community of like-minded professionals creates opportunities for growth, learning, and mutual support. When we share our experiences openly, everyone benefits.

The Broadcast membership brings together thought leaders, innovators, and professionals who value honest dialogue over corporate speak. We believe in transparency, collaboration, and real human connection.

Join us in creating a space where authenticity is celebrated, ideas are shared freely, and professional growth is a collective journey. Together, we're changing the conversation.`,
        image: 'https://images.unsplash.com/photo-1632813985160-b0c2c88d1bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBzdGFydHVwfGVufDF8fHx8MTc2NTcwNjMyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['ADS', 'Community', 'Business'],
        category: 'business',
        date: 'Sep 08, 2022',
        author: 'Jane Smith',
        readTime: '4'
    },
    {
        id: '3',
        title: 'Representing brands as the source for inspiration',
        description: 'Discover how brands are becoming the new source of creative inspiration in the fashion industry.',
        content: `Fashion brands are no longer just selling products—they're selling dreams, lifestyles, and inspiration. The modern brand is a creative force that shapes culture and influences how we see the world.

Today's most successful brands understand that their role extends beyond commerce. They're curators of taste, trendsetters, and storytellers who connect with audiences on an emotional level.

The relationship between brands and consumers has evolved into a dialogue. Social media has democratized fashion, allowing brands to engage directly with their audience and vice versa.

Innovation in fashion comes from this creative exchange. When brands listen to their community and stay true to their vision, they create something truly special—products and experiences that resonate deeply.

The future of fashion is collaborative, sustainable, and inspiring. Brands that embrace this reality will lead the way forward.`,
        image: 'https://images.unsplash.com/photo-1762430815620-fcca603c240c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcnVud2F5JTIwbW9kZWx8ZW58MXx8fHwxNzY1NjQ5MDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Fashion', 'Brands', 'Inspiration'],
        category: 'fashion',
        date: 'Dec 28, 2022',
        author: 'Sarah Johnson',
        readTime: '6'
    },
    {
        id: '4',
        title: 'The Art of Minimalist Living',
        description: 'Embrace simplicity and discover the freedom that comes with living with less.',
        content: `Minimalism is not about deprivation—it's about intentionality. By removing the excess, we make room for what truly matters in our lives.

Living with less doesn't mean living without joy. In fact, many minimalists report feeling more fulfilled and happier after simplifying their lives.

Start small. Choose one area of your life to declutter, whether it's your closet, your digital files, or your daily schedule. The process of letting go can be liberating.

Minimalism looks different for everyone. It's not about following strict rules, but about finding what works for you and your unique circumstances.`,
        image: 'https://images.unsplash.com/photo-1603741614953-4187ed84cc50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpa2luZyUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NjU2MzkzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Lifestyle', 'Minimalism', 'Wellness'],
        category: 'myLife',
        date: 'Nov 15, 2022',
        author: 'Alex Chen',
        readTime: '4'
    },
    {
        id: '5',
        title: 'Digital Detox: Reclaiming Your Time',
        description: 'Learn how to disconnect from technology and reconnect with yourself.',
        content: `In our hyper-connected world, taking a break from digital devices has become more important than ever. A digital detox can help reset your relationship with technology.

Start by identifying your digital habits. How much time do you spend on your phone? Which apps consume most of your attention? Awareness is the first step.

Set boundaries. Designate tech-free times during your day, like during meals or before bed. Create spaces in your home where devices aren't allowed.

Replace screen time with meaningful activities. Read a book, take a walk, have face-to-face conversations. You'll be surprised how much time you reclaim.`,
        image: 'https://images.unsplash.com/photo-1595623654300-b27329804025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMGNvZGluZ3xlbnwxfHx8fDE3NjU3MDYzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Technology', 'Wellness', 'Productivity'],
        category: 'technology',
        date: 'Oct 22, 2022',
        author: 'Maria Rodriguez',
        readTime: '5'
    },
    {
        id: '6',
        title: 'Sustainable Fashion: A Modern Necessity',
        description: 'Explore how sustainable practices are reshaping the fashion industry.',
        content: `The fashion industry is one of the largest polluters globally, but change is happening. Sustainable fashion is no longer a niche—it's becoming mainstream.

Consumers are demanding transparency. They want to know where their clothes come from, who made them, and what impact they have on the environment.

Brands are responding with innovative solutions: recycled materials, circular business models, and ethical manufacturing practices.

As individuals, we can make a difference through our choices. Buy less, choose quality over quantity, support sustainable brands, and care for the clothes you already own.`,
        image: 'https://images.unsplash.com/photo-1595550510467-930da051f939?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjBwaW5rfGVufDF8fHx8MTc2NTcwMzEwMHww&ixlib=rb-4.1.0&q=80&w=1080',
        tags: ['Fashion', 'Sustainability', 'Environment'],
        category: 'fashion',
        date: 'Sep 30, 2022',
        author: 'Emma Thompson',
        readTime: '7'
    },
    {
        id: '7',
        title: 'The Future of Remote Work',
        description: 'How remote work is transforming careers and lifestyles worldwide.',
        content: `Remote work has evolved from a temporary solution to a permanent fixture in the modern workplace. This shift is changing how we think about careers and life balance.

Companies are discovering that remote work can increase productivity and employee satisfaction while reducing overhead costs.

For workers, the benefits are clear: no commute, flexible schedules, and the freedom to live anywhere. But challenges exist too—maintaining boundaries, staying connected, and avoiding isolation.

The future is likely hybrid, combining the best of remote and office work. Success requires intentional communication, trust, and the right tools.`,
        image: 'https://images.unsplash.com/photo-1617035969674-85423701b235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW1vdGUlMjB3b3JrJTIwbGFwdG9wfGVufDF8fHx8MTc2NTY0MzUyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Work', 'Career', 'Technology'],
        category: 'technology',
        date: 'Aug 18, 2022',
        author: 'David Park',
        readTime: '6'
    },
    {
        id: '8',
        title: 'Mindfulness in the Modern Age',
        description: 'Practical techniques for staying present in a distracted world.',
        content: `Mindfulness is the practice of being fully present in the moment. In our fast-paced, distraction-filled world, this simple concept has become revolutionary.

You don't need to meditate for hours to benefit from mindfulness. Start with just five minutes a day, focusing on your breath and observing your thoughts without judgment.

Bring mindfulness into daily activities. Pay attention while eating, walking, or even washing dishes. These moments of presence add up.

The benefits are backed by science: reduced stress, improved focus, better emotional regulation, and enhanced well-being. Mindfulness isn't just a trend—it's a valuable life skill.`,
        image: 'https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMHlvZ2ElMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc2NTcwNjMyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Wellness', 'Mental Health', 'Meditation'],
        category: 'myLife',
        date: 'Jul 12, 2022',
        author: 'Lisa Wong',
        readTime: '5'
    },
    {
        id: '9',
        title: 'Cinema Classics That Shaped Modern Storytelling',
        description: 'Exploring the timeless films that continue to influence filmmakers today.',
        content: `The history of cinema is filled with masterpieces that have stood the test of time. These classics didn't just entertain—they revolutionized the art of storytelling.

From the groundbreaking techniques of early cinema to the bold narratives of the New Hollywood era, each generation of filmmakers has pushed boundaries and expanded what's possible on screen.

Understanding these classics helps us appreciate modern cinema. Today's directors still draw inspiration from the cinematography, narrative structures, and emotional depth of these timeless works.

Whether you're a casual viewer or a serious cinephile, exploring cinema classics opens up a rich world of artistic achievement and human expression.`,
        image: 'https://images.unsplash.com/photo-1640127249308-098702574176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwc2NyZWVufGVufDF8fHx8MTc2NTYzMDcyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Movies', 'Cinema', 'Storytelling'],
        category: 'movies',
        date: 'Nov 10, 2022',
        author: 'Michael Stevens',
        readTime: '8'
    }
];

export const PostDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = samplePostss.find(p => p.id === id);

    const isDark = useSelector((state: RootState) => state.theme.isDark)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
            <h2 className="text-3xl font-bold mb-4">Post not found</h2>
            <BackToPostsButton></BackToPostsButton>
        </div>

    }

    return <div>

        <BackToPostsButton></BackToPostsButton>


        <div className="relative rounded-3xl overflow-hidden mb-8 h-100 md:h-125">
            <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover"
            />
        </div>

        {/* Date, Category Tags and Author*/}
        <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`px-4 py-2 rounded-full text-sm ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-gray-100 text-black border border-gray-200'}`}>

                {post.date}

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
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
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
        </div>

        <h1 className={`text-4xl md:text-6xl mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            {post.title}
        </h1>

        {/* Description */}
        <p className={`text-xl mb-8 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
            {post.description}
        </p>

        {/* Divider line */}
        <div className={`h-px mb-8 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

        {/* Content */}
        <div
            className={`prose prose-lg max-w-none ${isDark
                ? 'prose-invert prose-headings:text-white prose-p:text-white/80 prose-a:text-blue-400'
                : 'prose-headings:text-black prose-p:text-black/80 prose-a:text-blue-600'
                }`}
        >
            {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className={isDark ? 'text-white/80' : 'text-black/80'}>
                    {paragraph}
                </p>
            ))}
        </div>
        <div className={`mt-12 pt-8 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            <h3 className={`text-xl mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                Share this post
            </h3>
            <button
                className={`px-6 py-3 rounded-full transition-colors ${isDark ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' : 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-200'}`}>
                Copy Link
            </button>
        </div>
    </div>
}