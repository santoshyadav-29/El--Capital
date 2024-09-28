import Logo from "../assets/green-leaf-logo-free-png.webp";
import Services from "@/components/blocks/service";
import Classify from "@/components/blocks/classify";

const Home = () => {
 
  return (
    <div className=" mx-auto w-[90%]  ">
      <section
        id="home"
        className="flex flex-col items-center justify-center mt-10"
      >
        <img className="block w-[30%]" src={Logo} alt="Algoo" />
        <h1 className="text-4xl text-center font-bold p-3">Welcome to Algoo</h1>
        <p className="text-lg text-center p-3 md:w-[80ch] text-gray-500">
          Algoo is a simple calculator that helps you calculate your daily
          needs. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Perspiciatis nihil, ullam aliquid error eos totam suscipit iste enim
          consequuntur adipisci?
        </p>
      </section>
      <Services />
      
      <Classify />
    </div>
  );
};

export default Home;
