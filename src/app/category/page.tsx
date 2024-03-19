import CategoryBar from "@/components/category/CategoryBar";
import FilteredFoods from "@/components/category/FilteredFoods";
import React from "react";

const categoryPage = () => {
  return (
    <div className="bg-gray-200 w-3/5 m-auto  min-w-96">
      <CategoryBar />
      <div className="mt-16 flex flex-col items-center">
        <div className="font-bold text-2xl mb-4">
          <span className="text-rose-500">양식</span> 검색결과
        </div>
        <FilteredFoods />
      </div>
    </div>
  );
};

export default categoryPage;
