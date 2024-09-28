import { Routes, Route } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Navbar from "./components/blocks/navbar";
import mascot from "./assets/mascot.png";
import mascot2 from "./assets/mascot2.png";
import mascot3 from "./assets/mascot3.png";

import Footer from "./components/blocks/footer";
import Home from "./app/home";
import logo from "./assets/logo2.png";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <Navbar />
      <SignedOut>
        <div className="flex justify-center flex-col items-center">
          <img
            src={mascot2}
            alt=""
            className="hidden md:block absolute md:left-3 md:bottom-[190px] md:w-[140px] opacity-50 animate-moveUpDown"
          />
          <img
            src={mascot3}
            alt=""
            className="hidden md:block absolute md:right-0 md:top-[90px] md:w-[140px] opacity-50 animate-moveLeftRight"
          />
          <img className="w-[20%] " src={logo} alt="" />
          <h1 className="text-4xl font-bold p-3">Welcome to Algoo</h1>
          <p className="text-lg text-center p-3 md:w-[80ch] text-gray-500">
            Algoo is a simple calculator that helps you calculate your daily
            needs. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis nihil, ullam aliquid error eos totam suscipit iste enim
            consequuntur adipisci?
          </p>
          <SignInButton>
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <div>
          <div className="m-3">
            <UserButton />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </SignedIn>
      <Footer />
    </div>
  );
}

export default App;
