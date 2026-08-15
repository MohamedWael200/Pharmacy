import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "../components/Hero.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Statistics from "../components/Statistics.jsx";
import CTA from "../components/CTA.jsx";
import Features from "../components/Features.jsx";

function Home() {
    // Scroll progress scale للتأثير الحركي مع التمرير
    const { scrollY } = useScroll();
    const backgroundY = useTransform(scrollY, [0, 2000], [0, -150]);
    const floatY1 = useTransform(scrollY, [0, 1000], [0, -80]);
    const floatY2 = useTransform(scrollY, [0, 1000], [0, 100]);

    // إعدادات أنيميشن الأقسام
    const sectionVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" }
        }
    };

    return (
        <div className="relative overflow-hidden bg-slate-50/70 min-h-screen selection:bg-teal-500 selection:text-white">
            {/* ==================== 🌟 ANIMATED BACKGROUND LAYER 🌟 ==================== */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Gradient Mesh Orbs */}
                <motion.div
                    style={{ y: backgroundY }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.35, 0.5, 0.35],
                        rotate: [0, 90, 0]
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-gradient-to-br from-teal-300/30 via-emerald-200/20 to-transparent rounded-full blur-3xl"
                />

                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.25, 0.45, 0.25],
                        rotate: [0, -120, 0]
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-gradient-to-tl from-cyan-300/20 via-teal-100/30 to-transparent rounded-full blur-3xl"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.25, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-300/20 via-teal-200/20 to-transparent rounded-full blur-3xl"
                />

                {/* Animated Grid Lines Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e0a_1px,transparent_1px),linear-gradient(to_bottom,#0f766e0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                {/* Floating Medical Tech Orbs / Capsules */}
                <motion.div
                    style={{ y: floatY1 }}
                    animate={{ y: [0, -18, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-44 left-8 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-lg shadow-teal-500/5 text-xs font-bold text-teal-700"
                >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    💊 2,400+ Medicines Available
                </motion.div>

                <motion.div
                    style={{ y: floatY2 }}
                    animate={{ y: [0, 20, 0], rotate: [0, -8, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-2/3 right-10 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-lg shadow-emerald-500/5 text-xs font-bold text-slate-700"
                >
                    <span className="text-teal-600 font-black">⚡ Instant</span> Reservation Confirmed
                </motion.div>
            </div>

            {/* ==================== 🚀 MAIN CONTENT WITH ANIMATED REVEAL 🚀 ==================== */}
            <div className="relative z-10 space-y-12 lg:space-y-20">
                {/* Hero Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Hero />
                </motion.section>

                {/* Features Section */}
                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <Features />
                </motion.section>

                {/* How It Works Section */}
                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <HowItWorks />
                </motion.section>

                {/* Statistics Section */}
                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <Statistics />
                </motion.section>

                {/* Call To Action (CTA) Section */}
                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    <CTA />
                </motion.section>
            </div>
        </div>
    );
}

export default Home;