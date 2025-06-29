import { Book, BookOpenText, Flag } from "lucide-react";

import { Navbar } from "./components/NavBar";
import Menu from "./sections/Menu";
// import ChatContainer from "./components/Chatbot/ChatContainer";
import Footer from "./sections/Footer";

const navItems = [
  { name: "Menu", link: "#menu", icon: <BookOpenText /> },
  { name: "Report Problem", link: "#report", icon: <Flag /> },
];

export default function MenuPage() {
  return (
    <main className="relative min-h-screen">
      {/* Grid Background */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-white bg-grid-black/[0.2] dark:bg-black dark:bg-grid-white/[0.2]">
        {/* Radial Gradient */}
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      </div>

      <Navbar navItems={navItems} />
      <Menu />
      {/* <ChatContainer /> */}
      <Footer />
    </main>
  );
}
