import Category from "@/components/category/Category";
import filterData from "@/utils/filterData";
import { useSearchParams } from "next/navigation";
import React from "react";

const categoryPage = async () => {
  //키워드 어떻게 가져오지..?
  const filteredRecipes = await filterData("나물");

  return (
    <div>
      <Category filteredRecipes={filteredRecipes} />
    </div>
  );
};

export default categoryPage;
