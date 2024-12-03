import { Book, BookOpenText, Flag } from "lucide-react";

import { Navbar } from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import Footer from "./sections/Footer";

const navItems = [{ name: "Menu", link: "#menu", icon: <BookOpenText/> },
  { name: "Report Problem", link: "#report", icon: <Flag/> },
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
