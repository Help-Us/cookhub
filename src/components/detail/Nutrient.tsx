import React from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";

const Nutrient = ({ tan, dan, ge, kcal, na }) => {
  return (
    <>
      <div className="bg-hotpink h-56 w-60 text-white font-medium rounded-lg mb-1.5 shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]">
        <div className="p-1">
          <p className="text-xl ml-2 mt-3">영양성분</p>
        </div>
        <hr className="border-1.3 border-white w-52 mx-auto mb-3 mt-1" />
        <div className="flex justify-between">
          <div className="ml-4">
            <p className="mb-2">열량</p>
            <p className="mb-1">나트륨</p>
            <p className="mb-1">탄수화물</p>
            <p className="mb-1">단백질</p>
            <p className="mb-1">지방</p>
          </div>
          <div className="pr-5">
            <p className="mb-1">{kcal} kcal</p>
            <p className="mb-1">{na} mg</p>
            <p className="mb-1">{tan} g</p>
            <p className="mb-1">{dan} g</p>
            <p className="mb-1">{ge} g</p>
          </div>
        </div>
      </div>
      <div className="bg-[color:var(--subColor7)] text-[color:var(--subColor8)] h-16 w-full mx-auto flex justify-center items-center rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)] border border-solid border-[color:var(--highlightColor1)]">
        <p className="text-md mr-1 font-semibold flex items-center ">
          스크랩하기
        </p>
        <IoBookmarkOutline size={18} />
      </div>
      <div className="bg-[color:var(--subColor7)] text-[color:var(--subColor8)] h-16 w-full mx-auto flex justify-center items-center rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)] border border-solid border-[color:var(--highlightColor1)]">
        <p className="text-md mr-1 font-semibold flex items-center ">
          스크랩된 레시피
        </p>
        <IoBookmark size={18} />
      </div>
    </>
  );
};

export default Nutrient;
