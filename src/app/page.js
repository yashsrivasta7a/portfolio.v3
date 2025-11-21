import Image from "next/image";
import DashboardPage from "./dashboard/page.jsx";
import FeaturedPage from "./featured/page.jsx";
import { Internship } from "./internship/page.jsx";
import StackPage from "./stack/page.jsx";

export default function Home() {
  return (
    <div className="pt-24">
      <DashboardPage />
      <StackPage/>
      <FeaturedPage/>
      <Internship/>
    </div>
  );
}
