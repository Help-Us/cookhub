import React from "react";

const page = () => {
  return (
    <div className="bg-gray-200 w-4/5 m-auto ">
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
      <div>칼로리</div>
      <div>
        검색결과 컨테이너
        <div>검색결과 수</div>
        <div>최신순</div>
        <div>조회순</div>
        <div>
          음식 그리드 컨테이나
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default page;
