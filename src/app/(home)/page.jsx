import Dashboard from "./sections/Dashboard";
import TechStack from "./sections/TechStack";
import Featured from "./sections/Featured";
import Internship from "./sections/Internship";
import AboutPage from "./sections/About";
import Footer from "./sections/Footer";

export default function HomePage() {
  return (
    <div className="pt-24 flex flex-col gap-32">
      <AboutPage />
      <Featured />
      <Internship />
      <Footer />
    </div>
  );
}
