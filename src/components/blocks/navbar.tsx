import React from "react";

const Navbar = () => {
  return (
    <>
      <header className="flex justify-around items-center m-3">
        <div className="logo text-3xl text-green-400 font-bold">
          Algooo.info
        </div>
        <div className="nav-links text-gray-700">
          <ul className="flex gap-3">
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
      <hr />
    </>
  );
};

export default Navbar;
