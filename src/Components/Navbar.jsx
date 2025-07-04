import { useEffect, useState } from "react";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import NavDropdown from "./NavDropdown";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 👈

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Toggle logic for dropdowns
  const handleDropdownToggle = (label) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-gray-900 text-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Logo />
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <ul
          className={`flex-col lg:flex-row lg:flex items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6 absolute lg:static top-full left-0 w-full lg:w-auto bg-gray-800 lg:bg-transparent px-4 py-4 lg:p-0 transition-all duration-300 ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          <li className="hover:underline cursor-pointer">Home</li>

          <NavDropdown
            label="Premier League"
            items={[
              "Liverpool",
              "Manchester City",
              "Manchester United",
              "Chelsea",
              "Arsenal",
              "Tottenham",
            ]}
            isOpen={activeDropdown === "Premier League"}
            onToggle={handleDropdownToggle}
          />
          <NavDropdown
            label="La Liga"
            items={[
              "Real Madrid",
              "Barcelona",
              "Atletico Madrid",
              "Valencia",
              "Sevilla",
              "Athletic Bilbao",
            ]}
            isOpen={activeDropdown === "La Liga"}
            onToggle={handleDropdownToggle}
          />
          <NavDropdown
            label="Serie A"
            items={[
              "Serie A",
              "Juventus",
              "Inter Milan",
              "AC Miilan",
              "Bologna",
              "AS Roma",
            ]}
            isOpen={activeDropdown === "Serie A"}
            onToggle={handleDropdownToggle}
          />
          <NavDropdown
            label="Bundesliga"
            items={[
              "Bayern Munich",
              "Dortmund",
              "Rb Leipzig",
              "Bayer Leverkusen",
              "Schalke",
              "Wolfsburg",
            ]}
            isOpen={activeDropdown === "BundesLiga"}
            onToggle={handleDropdownToggle}
          />
          <NavDropdown
            label="Ligue 1"
            items={[
              "Paris Saint Germain",
              "Olympique Lyon",
              "AS Monaco",
              "Marseille",
              "OGC Nice",
              "Rennes FC",
            ]}
            isOpen={activeDropdown === "Ligue 1"}
            onToggle={handleDropdownToggle}
          />

          <li className="hover:underline cursor-pointer">About</li>
          <li className="hover:underline cursor-pointer">Contact</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
