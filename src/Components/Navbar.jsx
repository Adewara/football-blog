import { useEffect, useState } from "react";
import Logo from "./Logo";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react"; // optional icons

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-gray-900 text-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Hamburger (mobile only) */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Nav Menu */}
        <ul
          className={`flex-col lg:flex-row lg:flex items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6 absolute lg:static top-full left-0 w-full lg:w-auto bg-gray-800 lg:bg-transparent px-4 py-4 lg:p-0 transition-all duration-300 ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          <li className="hover:underline cursor-pointer">Home</li>

          {/* Dropdown */}
          <li className="relative w-full lg:w-auto">
            {/* Dropdown trigger */}
            <div
              className="flex items-center justify-between hover:underline cursor-pointer lg:group"
              onClick={() => {
                if (window.innerWidth < 1024) toggleDropdown(); // only on mobile
              }}
            >
              <span>Premier League</span>
              <span className="ml-1 lg:hidden">
                {dropdownOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </span>
            </div>

            {/* Dropdown menu */}
            <ul
              className={`mt-2 lg:absolute lg:right-0 bg-gray-700 rounded-md shadow-lg overflow-hidden transition-all duration-200 ${
                dropdownOpen ? "block" : "hidden"
              } lg:group-hover:block lg:opacity-0 lg:invisible lg:group-hover:visible lg:group-hover:opacity-100 lg:w-40`}
            >
              <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer whitespace-nowrap">
                Liverpool
              </li>
              <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer whitespace-nowrap">
                Manchester City
              </li>
              <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer whitespace-nowrap">
                Manchester United
              </li>
              <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer whitespace-nowrap">
                Chelsea
              </li>
              <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer whitespace-nowrap">
                Arsenal
              </li>
              <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer whitespace-nowrap">
                Tottenham
              </li>
            </ul>
          </li>

          <li className="hover:underline cursor-pointer">About</li>
          <li className="hover:underline cursor-pointer">Contact</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
