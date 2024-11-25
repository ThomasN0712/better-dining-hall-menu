import { BriefcaseBusiness, House, UserRound } from "lucide-react";

import { Navbar } from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import Footer from "./sections/Footer";

const navItems = [
  { name: "Home", link: "#home", icon: <House /> },
  { name: "About", link: "#about", icon: <UserRound /> },
  { name: "Work", link: "#work", icon: <BriefcaseBusiness /> },
];

export default function MenuPage() {
  return (
    <main className="bg-background-light dark:bg-background-dark">
      <Navbar navItems={navItems} />
      <HeroSection />
      <Footer />
    </main>
  );
}
