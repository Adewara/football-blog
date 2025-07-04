import { Facebook, Twitter, Youtube } from "lucide-react";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Logo */}
          <div className="text-white">
            <Logo />
          </div>

          {/* Links */}
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm">
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">Advertise</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms of Use</li>
          </ul>

          {/* Social icons */}
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-white">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-sm text-center text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold hover:text-white cursor-pointer">
            Yours Truly
          </span>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
