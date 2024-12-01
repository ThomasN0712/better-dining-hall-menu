import { BriefcaseBusiness, House, UserRound } from "lucide-react";

import { Navbar } from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import ReportIssueForm from "./sections/ReportIssueSection";
import Footer from "./sections/Footer";

const navItems = [{ name: "Home", link: "#home", icon: <House /> }];

export default function MenuPage() {
  return (
    <main className="bg-background-light dark:bg-background-dark">
      <Navbar navItems={navItems} />
      <HeroSection />
      <ReportIssueForm />
      <Footer />
    </main>
  );
}
