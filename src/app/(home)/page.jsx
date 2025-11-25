import Dashboard from "./sections/Dashboard";
import TechStack from "./sections/TechStack";
import Featured from "./sections/Featured";
import Internship from "./sections/Internship";

export default function HomePage() {
  return (
    <div className="pt-24">
      <Dashboard />
      <TechStack />
      <Featured />
      <Internship />
    </div>
  );
}
