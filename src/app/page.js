import Image from "next/image";
import DashboardPage from "./dashboard/page";
import FeaturedPage from "./featured/page";
import { Internship } from "./internship/page";
import StackPage from "./stack/page";

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
