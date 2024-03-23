import React from "react";
import Scrap from "./Scrap";

const Nutrient = ({ tan, dan, ge, kcal, na }) => {
  return (
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
  );
};

export default Nutrient;