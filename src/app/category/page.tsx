import React from "react";

const page = () => {
  return (
    <div className="bg-gray-200 w-3/5 m-auto ">
      <div className="flex p-2 items-center">
        <div
          className={`flex items-center justify-center border border-solid border-rose-500 w-28 h-8 text-md/[10px] rounded-xl bg-amber-100`}
        >
          요리 종류
        </div>
        <div className="bg-amber-100 w-2 h-10 ml-4 mr-8"></div>
        <div className="flex items-center gap-6">
          <div className="text-md pl-4 pr-4 text-center cursor-pointer">밥</div>
          <div className="text-md pl-4 pr-4 text-center cursor-pointer">
            반찬
          </div>
          <div className="text-md pl-4 pr-4 text-centercursor-pointer">
            국 / 찌개
          </div>
          <div className="text-md pl-4 pr-4 text-center cursor-pointer">
            후식
          </div>
        </div>
      </div>
      <div className="flex p-2 items-center">
        <div
          className={`flex items-center justify-center border border-solid border-rose-500 w-28 h-8 text-md/[10px] rounded-xl bg-amber-100`}
        >
          칼로리
        </div>
        <div className="bg-amber-100 w-2 h-10 ml-4 mr-8"></div>
        <div className="flex items-center gap-6">
          <div className="text-md pl-4 pr-4 text-center cursor-pointer">
            다이어트 <br />
            <p className="text-sm">(~100kcal)</p>
          </div>
          <div className="text-md pl-4 pr-4 text-center cursor-pointer">
            간단 한끼
            <br />
            <p className="text-sm">(~250kcal)</p>
          </div>
          <div className="text-md pl-4 pr-4 text-center cursor-pointer">
            일반식
            <br />
            <p className="text-sm">(~350kcal)</p>
          </div>
          <div className="text-md pl-4 pr-4 text-center cursor-pointer">
            푸짐하게
            <br />
            <p className="text-sm">(~450kcal)</p>
          </div>
          <div className="text-md pl-4 pr-4 text-center cursor-pointer">
            오늘만 산다
            <br />
            <p className="text-sm">(~500kcal)</p>
          </div>
        </div>
      </div>
      <div className="bg-lime-100 mt-10 flex flex-col items-center">
        <div className="font-bold ">
          <span className="text-rose-500">양식</span> 검색결과
        </div>
        <div className="flex w-full justify-between text-sm">
          <div className="">
            검색결과 <span className="text-rose-500 text-lg">13</span>건 조회
          </div>
          <div className="flex gap-2">
            <div>최신순</div>
            <div>조회순</div>
          </div>
        </div>
        <div className="w-full grid grid-flow-col grid-rows-2 gap-2">
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
      </div>
    </div>
  );
};

export default page;
