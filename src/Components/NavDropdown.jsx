import { ChevronDown, ChevronUp } from "lucide-react";

function NavDropdown({ label, items = [], isOpen, onToggle }) {
  const handleClick = () => {
    if (window.innerWidth < 1024) {
      onToggle(label); // Notify parent
    }
  };

  return (
    <li className="relative w-full lg:w-auto group">
      {/* Trigger */}
      <div
        className="flex items-center justify-between hover:underline cursor-pointer"
        onClick={handleClick}
      >
        <span>{label}</span>
        <span className="ml-1 lg:hidden">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </div>

      {/* Dropdown Menu */}
      <ul
        className={`mt-2 lg:absolute lg:right-0 bg-gray-700 rounded-md shadow-lg overflow-hidden transition-all duration-200 ${
          isOpen ? "block" : "hidden"
        } lg:block lg:opacity-0 lg:invisible group-hover:lg:visible group-hover:lg:opacity-100 lg:w-40`}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="px-4 py-2 hover:bg-gray-900 cursor-pointer whitespace-nowrap"
          >
            {item}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default NavDropdown;
