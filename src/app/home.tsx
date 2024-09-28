import Logo from "../assets/green-leaf-logo-free-png.webp";
import Services from "@/components/blocks/service";
import Classify from "@/components/blocks/classify";
import mascot from "../assets/mascot.png";

const Home = () => {
 
  return (
    <div className=" mx-auto w-[90%]  ">
      <section
        id="home"
        className="flex flex-col items-center justify-center mt-10"
      >
        <img className="block w-[30%]" src={mascot} alt="Algoo" />
        <h1 className="text-4xl text-center font-bold p-3">Welcome to ILYMO</h1>
        <p className="text-lg text-center p-3 md:w-[80ch] text-gray-500">
        As the demand of aquaculture and water resources is increasing in the world the algal bloom problem becomes more and more severe these days. ILYMO is a project aimed at developing a research tool to predict the algal bloom population(concentration). It also classify them into different categories and provide a visualization of the data giving a clear insight of the data.
        </p>
      </section>
      <Services />
      
      <Classify />
    </div>
  );
};

export default Home;
