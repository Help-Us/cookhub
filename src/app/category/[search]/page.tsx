import { filterData } from "@/api/supabase/supabase";
import Category from "@/components/category/Category";
import SearchBox from "@/components/layout/SearchBox";

import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const categoryPage = async ({ params }: { params: { search: string } }) => {
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
