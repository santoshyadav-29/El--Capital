import { Route, Routes } from "react-router-dom";
import Home from "./app/home";
import Classify from "./app/classify";
import Navbar from "./components/blocks/navbar";
import Footer from "./components/blocks/footer";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classify" element={<Classify />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
