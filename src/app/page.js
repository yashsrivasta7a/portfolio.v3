import Image from "next/image";
import DashboardPage from "./dashboard/page";
import FeaturedPage from "./featured/page";

export default function Home() {
  return (
    <div >
      <DashboardPage/>
      <FeaturedPage/>
    </div>
  );
}
