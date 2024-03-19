"use client";

import React, { useState } from "react";

const FilteredFoods = () => {
  const [orderBy, setOrderBy] = useState("latest");

  const handleOrderByLatest = () => {
    setOrderBy("latest");
  };

  const handleOrderByView = () => {
    setOrderBy("view");
  };

  return (
    <>
      {" "}
      <div className="flex w-full justify-between text-sm items-center mb-1">
        <div className="">
          검색결과 <span className="text-rose-500 text-lg">13</span>건 조회
        </div>
        <div className={`flex gap-2 cursor-pointer  `}>
          <div
            className={`${orderBy === "latest" ? "text-gray-900" : "text-gray-400"}`}
            onClick={handleOrderByLatest}
          >{`${orderBy === "latest" ? "✔" : ""} 최신순`}</div>
          <div className="text-gray-400">·</div>
          <div
            className={`${orderBy === "view" ? "text-gray-900" : "text-gray-400"}`}
            onClick={handleOrderByView}
          >{`${orderBy === "view" ? "✔" : ""} 조회순`}</div>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-1">
        <div className="mb-8">
          <img
            className="w-64"
            src="https://img.hankyung.com/photo/202309/99.20417298.1.jpg"
          ></img>
          <div className="flex text-sm text-gray-600 gap-2 mt-1">
            <span>#파스타</span>
            <span>#오일파스타</span>
            <span>#새우오일파스타</span>
          </div>
          <div className="mt-2 text-lg">마라 삼계탕</div>
        </div>
        <div>
          <img
            className="w-64"
            src="https://www.shutterstock.com/ko/blog/wp-content/uploads/sites/17/2018/11/shutterstock_1181891455.jpg"
          ></img>
          <div className="flex text-sm text-gray-600 gap-2 mt-1">
            <span>#파스타</span>
            <span>#오일파스타</span>
            <span>#새우오일파스타</span>
          </div>
          <div className="mt-2 text-lg">새우 오일 파스타</div>
        </div>
        <div>
          <img
            className="w-64"
            src="https://www.shutterstock.com/ko/blog/wp-content/uploads/sites/17/2018/11/shutterstock_1181891455.jpg"
          ></img>
          <div className="flex text-sm text-gray-600 gap-2 mt-1">
            <span>#파스타</span>
            <span>#오일파스타</span>
            <span>#새우오일파스타</span>
          </div>
          <div className="mt-2 text-lg">새우 오일 파스타</div>
        </div>
        <div>
          <img
            className="w-64"
            src="https://www.shutterstock.com/ko/blog/wp-content/uploads/sites/17/2018/11/shutterstock_1181891455.jpg"
          ></img>
          <div className="flex text-sm text-gray-600 gap-2 mt-1">
            <span>#파스타</span>
            <span>#오일파스타</span>
            <span>#새우오일파스타</span>
          </div>
          <div className="mt-2 text-lg">새우 오일 파스타</div>
        </div>
        <div>
          <img
            className="w-64"
            src="https://www.shutterstock.com/ko/blog/wp-content/uploads/sites/17/2018/11/shutterstock_1181891455.jpg"
          ></img>
          <div className="flex text-sm text-gray-600 gap-2 mt-1">
            <span>#파스타</span>
            <span>#오일파스타</span>
            <span>#새우오일파스타</span>
          </div>
          <div className="mt-2 text-lg">새우 오일 파스타</div>
        </div>
      </div>
    </>
  );
};

export default FilteredFoods;
