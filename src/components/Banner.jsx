import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function Banner() {
  return (
    <div className="grid overflow-hidden grid-cols-1 bg-slate-100 p-6 gap-6 sm:grid-cols-4  rounded-lg items-center justify-between">
      <div
        data-aos="fade-right"
        data-aos-offset="100"
        data-aos-easing="ease-in-sine"
        data-aos-duration="600"
        className="sm:col-span-2"
      >
        <h1 className="text-4xl font-semibold font-serif">
          Hi,I am Sakib Hasan
        </h1>
        <TypeAnimation
          preRenderFirstString={true}
          sequence={[
            500,
            "I am Learning web development",
            1000,
            "Feeling Crazy after learning Html",
            1000,
            "After learning css,i move another world JS",
            1000,
            "Then React,Node js,mongodb,express js",
            500,
            "searching job",
            500,
            "Now learning js ,because learning is never stop",
            500,
          ]}
          speed={50}
          style={{ fontSize: "2em", fontFamily: "sans-serif", color: "green" }}
          repeat={Infinity}
        />
        <p className="font-semibold my-12">
          I have basic understanding of <b>MERN stack</b> and{" "}
          <b>system analysis </b>
          knowledge including <b>diagram design</b> ,system requirement,
          <b>Agile methodology </b>
          different types of model and approach but I am really interested to
          enhance my skills and knowledge as well as experience through working
          with a <b>team</b>
        </p>
      </div>
      <div
        data-aos="fade-up-left"
        data-aos-offset="100"
        data-aos-easing="ease-in-sine"
        data-aos-duration="1000"
        className="sm:col-span-2 p-16"
      >
        <img
          src="https://i.ibb.co/Hx036Tc/my-passport-photo-removebg-preview.png"
          className="h-full w-full rounded-lg object-cover"
          alt=""
        />
      </div>
    </div>
  );
}
// https://i.ibb.co/6mDG3sf/my-passport-photo.jpg
