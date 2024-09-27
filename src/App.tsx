import { Route, Routes } from "react-router-dom";
import Home from "./app/home";
import Details from "./app/detail";
import Navbar from "./components/blocks/navbar";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Details />} />
      </Routes>

    </>
  );
}

export default App;
