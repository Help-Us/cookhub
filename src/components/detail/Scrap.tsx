"use client";

import React from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";

const Scrap = () => {
  return (
    <>
      <div className="bg-[color:var(--subColor7)] cursor-pointer text-[color:var(--subColor8)] h-16 w-full mx-auto flex justify-center items-center rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)] border border-solid border-[color:var(--highlightColor1)]">
        <p className="text-md mr-1 font-semibold flex items-center ">
          스크랩하기
        </p>
        <IoBookmarkOutline size={18} />
      </div>
      <div className="bg-[color:var(--subColor4)] text-white h-16 w-full mx-auto flex justify-center items-center rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)] border border-solid border-[color:var(--highlightColor1)]">
        <p className="text-md mr-1 font-semibold flex items-center ">
          스크랩된 레시피
        </p>
        <IoBookmark size={18} />
      </div>
    </>
  );
};

export default Scrap;
