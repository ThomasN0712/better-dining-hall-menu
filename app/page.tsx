import {
  BriefcaseBusiness,
  Contact as ContactIco,
  House,
  UserRound,
} from "lucide-react";
import { Navbar } from "@/app/_components/ui/Navbar";
import Footer from "@/app/_components/Footer";
import Carousel3D from "./_components/Carousel3D";
import AlwaysAvailableCard from "./_components/AlwaysAvailableCard";

const navItems = [
  { name: "Home", link: "#home", icon: <House /> },
  { name: "About", link: "#about", icon: <UserRound /> },
  { name: "Work", link: "#work", icon: <BriefcaseBusiness /> },
];

const Homepage = () => {
  return (
    <main className="flex flex-col min-h-screen justify-between">
      <div className="flex flex-col items-center">
        <Navbar navItems={navItems} />

        <div className="h-screen flex items-center justify-center space-x-20">
          <Carousel3D />
        </div>
        <div className="flex flex-col items-center space-y-10">
          <AlwaysAvailableCard />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Homepage;
