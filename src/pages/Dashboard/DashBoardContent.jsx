import React from "react";

export default function DashBoardContent({ content }) {
  return (
    <div className="flex items-center justify-between px-4 my-4 gap-2 border-2">
      <h1 className="text-slate-800 font-semibold">{content?.title}</h1>
      <img
        className="w-[40px] h-[40px] rounded-full"
        src={content?.blogImage}
        alt=""
      />
    </div>
  );
}
