import React from "react";

export default function Education() {
  return (
    <div
      data-aos="flip-left"
      className="max-w-4xl mx-auto my-12 overflow-hidden"
    >
      <h1 className="text-center font-semibold text-4xl">Education</h1>
      <div className="flex flex-col bg-slate-100 rounded-lg p-12">
        <div className="mt-8">
          <div className="flex flex-col items-center gap-2">
            <h2 className="font-semibold text-xl">
              Bachelor of Science in Computer Science Engineering
            </h2>
            <span className="font-semibold">2020-2024</span>
            <p>Internation University Of Business Agriculture and Technology</p>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex flex-col items-center gap-2">
            <h2 className="font-semibold text-xl">higher secondary</h2>
            <span className="font-semibold">2018</span>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex flex-col items-center gap-2">
            <h2 className="font-semibold text-xl">Secondary School </h2>
            <span className="font-semibold">2016</span>
          </div>
        </div>
      </div>
    </div>
  );
}
