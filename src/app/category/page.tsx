import CategoryBar from "@/components/category/CategoryBar";
import FilteredFoods from "@/components/category/FilteredFoods";
import SearchBox from "@/components/layout/SearchBox";
import React from "react";

const categoryPage = () => {
  return (
    <>
      <div className="w-3/5 m-auto min-w-fit">
        <div className="flex flex-col justify-center w-3/4 m-auto">
          <CategoryBar />
        </div>
        <div className="mt-16 flex flex-col items-center">
          <div className="font-bold text-2xl mb-10">
            <span className="text-rose-500">양식</span> 검색결과
          </div>
          <FilteredFoods />
        </div>
      </div>
    </>
  );
};

export default categoryPage;
