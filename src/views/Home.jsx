
import Navbar from '../components/Navbar';
import CostEstimatorCard from '../components/ui/CostEstimatorCard';
import HeroSection from '../components/ui/Hero';
import WhyBP from '../components/WhyBP';
import ConstructionPackages from '../components/ui/ConstructionPackages';
import PackageDetailsGallery from '../components/ui/PackageDetailsGallery';
import ConstructionProjects from '../components/ui/ConstructionProjects';
import HowItWorks from '../components/ui/HowItWorks';
import HireService from '../components/ui/HireService';
import Footer from '../components/Footer';

const Home = () => {

  return (
    <div>
      <Navbar />
      <HeroSection />
      <WhyBP />
      <div id="estimator" className="py-20 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <CostEstimatorCard />
        </div>
      </div>
      <ConstructionPackages />
      <PackageDetailsGallery />
      <ConstructionProjects />
      <HowItWorks />
      <HireService />
      <Footer />
    </div>
  )
}

export default Home
