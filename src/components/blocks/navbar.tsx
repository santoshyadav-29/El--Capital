import React from "react";

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-white z-20 p-3 pb-5 border-b-2">
      <header className="flex justify-around items-center   ">
        <div className="logo text-3xl text-green-400 font-bold">Algoo.info</div>
        <div className="nav-links text-gray-700">
          <ul className=" gap-3 hidden sm:flex">
            <a href="#home">
              <li>Home</li>{" "}
            </a>
            <a href="#services">
              <li>Calculate</li>{" "}
            </a>
            <a href="#about">
              <li>About</li>{" "}
            </a>
          </ul>
        </div>
      </header>
     
    </div>
  );
};

export default Navbar;
