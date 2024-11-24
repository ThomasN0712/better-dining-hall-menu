import { BriefcaseBusiness, House, UserRound } from "lucide-react";

import HeroSection from "./sections/HeroSection";
import { Navbar } from "./components/NavBar";

const navItems = [
  { name: "Home", link: "#home", icon: <House /> },
  { name: "About", link: "#about", icon: <UserRound /> },
  { name: "Work", link: "#work", icon: <BriefcaseBusiness /> },
];

export default function MenuPage() {
  return (
    <main className="">
      <Navbar navItems={navItems} />
      <HeroSection />
    </main>
  );
}
