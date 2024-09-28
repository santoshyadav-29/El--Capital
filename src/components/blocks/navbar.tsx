import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 80; // Adjust this value based on your navbar height
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-0 bg-white text-white z-20 p-3 pb-5 shadow-md">
      <header className="flex justify-around items-center">
        <div className="logo text-3xl text-green-400 font-bold hover:cursor-pointer hover:text-green-500 transition-colors">
          <Link to="/#">Algoo.info</Link>
        </div>
        <div className="nav-links text-gray-400">
          <ul className="gap-3 hidden sm:flex font-bold">
            <a href="#home" onClick={(e) => handleScroll(e, "home")}>
              <li className="hover:text-gray-500">Home</li>
            </a>
            <a href="#services" onClick={(e) => handleScroll(e, "services")}>
              <li className="hover:text-gray-500">Calculate</li>
            </a>
            <a href="#classify" onClick={(e) => handleScroll(e, "classify")}>
              <li className="hover:text-gray-500">Classify</li>
            </a>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
