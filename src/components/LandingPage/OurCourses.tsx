import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import image1 from "../../assets/landingpage/image1.png";
import image2 from "../../assets/landingpage/image2.png";
import image3 from "../../assets/landingpage/image3.png";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import CustomButton from "./CustomButton";

function OurCourses() {
  const slides = [
    {
      title: "Tailored Training",
      description:
        "Custom programs designed to enhance your performance on the court.",
      category: "Skill Development",
      image: image2,
    },
    {
      title: "Empowering Coaches",
      description:
        "Utilize cutting-edge tools to manage and track player performance.",
      category: "State-of-the-Art Facilities",
      image: image1,
    },
    {
      title: "Advanced Analytics",
      description:
        "Gain deep insights into player strengths and areas of improvement.",
      category: "Data-Driven Insights",
      image: image3,
    },
    {
      title: "Elite Training Camps",
      description: "Train with top-tier coaches in an immersive environment.",
      category: "Intensive Programs",
      image: image1,
    },
  ];
  const [index, setIndex] = useState(0);
  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };
  return (
    <div className="p-2 md:p-0 ">
      <div className="relative  my-5  sm:my-10 md:my-20 container mx-auto border bg-[#F5F6F9] shadow-lg rounded-3xl px-6 md:px-10 py-6 ">
        <div className="flex flex-col md:flex-row justify-between items-center my-6 px-4 md:px-10 gap-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-0 sm:gap-2 md:gap-4 xl:gap-6">
            <button className="px-4 py-2 border border-black rounded-full text-sm font-semibold ">
              Our Courses
            </button>
            <h1 className="text-lg md:text-2xl font-bold text-center md:text-left">
              Unleash Your Tennis Potential
            </h1>
          </div>
          <CustomButton title="Discover More" className="hidden md:flex" />
        </div>

        <div className="w-full overflow-x-hidden py-4">
          <motion.div
            className="flex gap-4 md:gap-8"
            animate={{ x: `-${index * 50}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            style={{ width: `${(slides.length / 2) * 50}%` }}
          >
            {slides.map((slide, i) =>
              i % 2 === 0 ? (
                <div key={i} className="flex gap-x-2 md:gap-x-4">
                  <motion.div
                    className="relative w-40 h-56 md:w-80 md:h-96 bg-gray-300 rounded-2xl p-4 md:p-6 text-white flex flex-col justify-end"
                    style={{
                      backgroundImage: `url('${slides[i]?.image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      flex: "0 0 50%",
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-sm md:text-lg font-semibold">
                      {slides[i]?.title}
                    </h3>
                  </motion.div>

                  {slides[i + 1] && (
                    <motion.div
                      className="relative w-36 h-56 md:w-72 md:h-96 bg-gray-300 rounded-2xl p-4 md:p-6 text-white flex flex-col justify-end"
                      style={{
                        backgroundImage: `url('${slides[i + 1]?.image}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        flex: "0 0 50%",
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <h3 className="text-sm md:text-lg font-semibold">
                        {slides[i + 1]?.title}
                      </h3>
                    </motion.div>
                  )}
                </div>
              ) : null
            )}
          </motion.div>
        </div>

        <div className="flex items-center justify-between flex-col md:flex-row gap-4">
          <div className="flex gap-2 mt-4">
            <div
              onClick={prevSlide}
              className="w-8 h-8 md:w-10 md:h-10 cursor-pointer flex items-center justify-center rounded-full bg-white shadow-md"
            >
              <LuChevronLeft size={24} className="text-primary" />
            </div>
            <div
              onClick={nextSlide}
              className="w-8 h-8 md:w-10 md:h-10 cursor-pointer flex items-center justify-center rounded-full bg-primary shadow-md"
            >
              <LuChevronRight size={24} className="text-white" />
            </div>
          </div>
          <p className="text-xs md:text-sm w-full md:w-1/2 text-center md:text-right">
            Engage in expertly designed programs at MPI that elevate your
            skills, enrich your understanding of the game, and refine your
            performance metrics, helping you achieve your goals on and off the
            court.
          </p>
        </div>

        <div className="w-full  flex md:hidden justify-center items-center my-1">
          <CustomButton title="Discover More" />
        </div>

        {/* <div className=" absolute h-[90%] w-[110%] md:w-[110%] -z-10 rounded-[2.4rem] bg-primary top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></div> */}
      </div>
    </div>
  );
}

export default OurCourses;
