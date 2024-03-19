import React from "react";

const FilteredFoods = () => {
  return (
    <>
      {" "}
      <div className="flex w-full justify-between text-sm items-center mb-1">
        <div className="">
          검색결과 <span className="text-rose-500 text-lg">13</span>건 조회
        </div>
        <div className="flex gap-2 cursor-pointer text-gray-400">
          <div>✔ 최신순</div>
          <div>·</div>
          <div>조회순</div>
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
