import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles, Zap, Users, BookOpen } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DarkToggle } from "../components/DarkToggle";


interface FloatingCardProps {
  isDark: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

interface CardSectionProps {
  isDark: boolean;
  index: number;
  children: React.ReactNode;
}

function FloatingCard({ isDark, icon, title, description, delay }: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={`p-8 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${isDark
        ? "bg-white/5 border-white/10 hover:bg-white/10"
        : "bg-black/5 border-black/10 hover:bg-black/10"
        }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${-position.y}deg) rotateY(${position.x}deg)`,
      }}
    >
      <motion.div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isDark ? "bg-white/10" : "bg-black/10"
          }`}
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      >
        {icon}
      </motion.div>
      <h3
        className={`text-xl mb-2 transition-colors duration-700 ${isDark ? "text-white" : "text-black"
          }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed transition-colors duration-700 ${isDark ? "text-white/60" : "text-black/60"
          }`}
      >
        {description}
      </p>
    </motion.div>
  );
}

function AnimatedGrid({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
              strokeWidth="1"
            />
          </pattern>
          <linearGradient id="gridFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopOpacity="0" />
            <stop offset="50%" stopOpacity="1" />
            <stop offset="100%" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#gridFade)" />
      </svg>
    </div>
  );
}

function GlowOrb({ isDark, delay }: { isDark: boolean; delay: number }) {
  return (
    <motion.div
      className="absolute w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
      style={{
        backgroundImage: isDark
          ? "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)"
          : "radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)",
      }}
      animate={{
        x: [0, 100, -100, 0],
        y: [0, -100, 100, 0],
        scale: [1, 1.2, 0.8, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

function CardSection({ isDark, index, children }: CardSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);

  return (
    <motion.section
      ref={ref}
      data-section-index={index}
      className="h-screen sticky top-0 flex items-center justify-center px-6"
      style={{
        zIndex: index,
      }}
    >
      <motion.div
        className={`absolute inset-0 ${index > 1 ? 'rounded-t-[3rem]' : ''} transition-colors duration-700 ${isDark ? "bg-[#0a0a0a]" : "bg-[#f5f5f5]"
          }`}
        style={{
          scale,
          opacity,
        }}
      />
      <div className="relative z-10 w-full max-w-6xl">
        {children}
      </div>
    </motion.section>
  );
}

export function LandingPage({ isDark }: { isDark: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSnapping, setIsSnapping] = useState(false);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const navigate = useNavigate();


  return <>
    <div className="fixed top-10 right-10 z-100">
      <DarkToggle></DarkToggle>
    </div>
    <div className="relative">

      {/* Fixed Background Elements */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <AnimatedGrid isDark={isDark} />
        <GlowOrb isDark={isDark} delay={0} />
        <GlowOrb isDark={isDark} delay={5} />
      </div>

      {/* Hero Section - Card 1 */}
      <CardSection isDark={isDark} index={1}>
        <motion.div
          className="text-center"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          {/* Main Title with Gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6"
          >
            <h1
              className="text-6xl md:text-8xl mb-4 relative inline-block"
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(135deg, #ffffff 0%, #888888 100%)"
                  : "linear-gradient(135deg, #000000 0%, #666666 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Epistoria
            </h1>

            {/* Animated Underline */}
            <motion.div
              className={`h-1 mx-auto rounded-full ${isDark ? "bg-white" : "bg-black"
                }`}
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className={`text-xl md:text-3xl mb-12 max-w-3xl mx-auto leading-relaxed ${isDark ? "text-white/60" : "text-black/60"
              }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Where creativity meets technology. Explore insights on fashion, tech,
            cinema, and life through a modern lens.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={() => { navigate('/home') }}
            className={`group relative px-10 py-5 rounded-full text-lg font-medium overflow-hidden ${isDark
              ? "bg-white text-black"
              : "bg-black text-white"
              }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className={`absolute inset-0 ${isDark ? "bg-gray-200" : "bg-gray-800"
                }`}
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-3">
              Explore Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </CardSection>

      {/* Features Section - Card 2 */}
      <CardSection isDark={isDark} index={2}>
        <div className="py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`text-5xl md:text-6xl mb-4 ${isDark ? "text-white" : "text-black"
                }`}
            >
              Discover What's Inside
            </h2>
            <p
              className={`text-xl ${isDark ? "text-white/60" : "text-black/60"
                }`}
            >
              A curated collection of stories, insights, and innovations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FloatingCard
              isDark={isDark}
              icon={<BookOpen className={`w-6 h-6 ${isDark ? "text-white" : "text-black"}`} />}
              title="Rich Content"
              description="Deep dives into tech, fashion, cinema, and personal stories"
              delay={0.2}
            />
            <FloatingCard
              isDark={isDark}
              icon={<Zap className={`w-6 h-6 ${isDark ? "text-white" : "text-black"}`} />}
              title="Fresh Ideas"
              description="Cutting-edge perspectives on modern life and innovation"
              delay={0.3}
            />
            <FloatingCard
              isDark={isDark}
              icon={<Users className={`w-6 h-6 ${isDark ? "text-white" : "text-black"}`} />}
              title="Community"
              description="Join conversations with like-minded creatives and thinkers"
              delay={0.4}
            />
            <FloatingCard
              isDark={isDark}
              icon={<Sparkles className={`w-6 h-6 ${isDark ? "text-white" : "text-black"}`} />}
              title="Showcase"
              description="Explore innovative projects and creative experiments"
              delay={0.5}
            />
          </div>
        </div>
      </CardSection>

      {/* Testimonial / Quote Section - Card 3 */}
      <CardSection isDark={isDark} index={3}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className={`text-4xl md:text-5xl leading-relaxed mb-8 transition-colors duration-700 ${isDark ? "text-white" : "text-black"
              }`}
            style={{
              fontStyle: "italic",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            "A space where ideas flourish, creativity thrives, and stories come
            to life"
          </motion.div>
        </motion.div>
      </CardSection>

      {/* Final CTA Section - Card 4 */}
      <CardSection isDark={isDark} index={4}>
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            className={`p-12 md:p-20 rounded-3xl backdrop-blur-xl border text-center max-w-4xl ${isDark
              ? "bg-white/5 border-white/10"
              : "bg-black/5 border-black/10"
              }`}
          >
            <h2
              className={`text-4xl md:text-6xl mb-6 ${isDark ? "text-white" : "text-black"
                }`}
            >
              Ready to Begin?
            </h2>
            <p
              className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-black/60"
                }`}
            >
              Step into a world of inspiration, innovation, and authentic
              storytelling
            </p>
            <motion.button
              onClick={() => { navigate('/home') }}
              className={`group px-10 py-5 rounded-full text-lg font-medium ${isDark
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </CardSection>

      {/* Footer - Card 5 */}
      <CardSection isDark={isDark} index={5}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className={`text-6xl md:text-8xl mb-12 transition-colors duration-700 ${isDark ? "text-white" : "text-black"
              }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Epistoria x Kunal
          </motion.h2>
          <p
            className={`mb-2 transition-colors duration-700 ${isDark ? "text-white/80" : "text-black/80"
              }`}
          >
            Design & Developed by Kunalx1
          </p>
          <p
            className={`text-sm transition-colors duration-700 ${isDark ? "text-white/50" : "text-black/50"
              }`}
          >
            © 2026. All rights reserved.
          </p>
        </motion.div>
      </CardSection>
    </div>
  </>
}