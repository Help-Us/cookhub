import { filterData } from "@/api/supabase/supabase";
import Category from "@/components/category/Category";

import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const categoryPage = async ({ params }: { params: { search: string } }) => {
  //키워드 어떻게 가져오지..?
  const { search } = params;
  const searchKeyword = decodeURIComponent(search);
  const filteredRecipes = await filterData(searchKeyword);

  return (
    <div>
      <Category
        filteredRecipes={filteredRecipes}
        searchKeyword={searchKeyword}
      />
    </div>
  );
};

export default categoryPage;
