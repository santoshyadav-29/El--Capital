import Logo from "../assets/green-leaf-logo-free-png.webp";

const Home = () => {
  return (
    <div className=" mx-auto w-[90%] ">
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
      <section id="service">
        <h2 className="text-2xl text-center font-bold p-3">
          Calculate your daily needs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 shadow-md rounded-md">
            <h3 className="text-xl font-bold">Calories</h3>
            <p className="text-gray-500">Calculate your daily calorie needs</p>
          </div>
          <div className="bg-white p-3 shadow-md rounded-md">
            <h3 className="text-xl font-bold">BMI</h3>
            <p className="text-gray-500">Calculate your Body Mass Index</p>
          </div>
          <div className="bg-white p-3 shadow-md rounded-md">
            <h3 className="text-xl font-bold">BMR</h3>
            <p className="text-gray-500">Calculate your Basal Metabolic Rate</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
