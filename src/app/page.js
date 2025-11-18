import Image from "next/image";
import DashboardPage from "./dashboard/page";
import FeaturedPage from "./featured/page";
import { Internship } from "./internship/page";

export default function Home() {
  return (
    <div >
      <DashboardPage/>
      <FeaturedPage/>
      <Internship/>
    </div>
  );
}
