import Hero from "../components/Hero.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Statistics from "../components/Statistics.jsx";
import CTA from "../components/CTA.jsx";
import Features from "../components/Features.jsx";

function Home() {
    return (
        <>
            <Hero />
            <Features />
            <HowItWorks />
            <Statistics />
            <CTA />
        </>
    )
}
export default Home