import Category from "@/components/category/Category";
import React from "react";

const categoryPage = ({ params }: { params: { search: string } }) => {
  const { search } = params;
  const searchKeyword = decodeURIComponent(search);

  return <Category searchKeyword={searchKeyword} />;
};

export default categoryPage;
