import Navbar from "./LandingComponents/Navbar";
import CTASection from "./LandingComponents/CTASection";
import FeaturesSection from "./LandingComponents/FeaturesSection";
import Footer from "./LandingComponents/Footer";
import TestimonialCarousel from "./LandingComponents/TestimonialCarousel";
import HeroSection from "./LandingComponents/HeroSection";
import CourseSection from "./LandingComponents/CourseSection";

function Landing(){
    return (
      <>
        <Navbar/>
        <HeroSection/>
        <CourseSection/>
        <FeaturesSection/>
        <TestimonialCarousel/>
        <CTASection/>
        <Footer/>
      </>
    );
}
export default Landing;