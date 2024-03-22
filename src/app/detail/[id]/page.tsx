"use client";

import React, { useEffect, useState } from "react";
import Ingredients from "@/components/detail/Ingredients";
import Nutrient from "@/components/detail/Nutrient";
import FoodName from "@/components/detail/FoodName";
import Cooking from "@/components/detail/Cooking";
import Comments from "@/components/detail/Comments";
import Image from "next/image";
import { supabase } from "@/api/supabase/supabase";
import Scrap from "@/components/detail/Scrap";

const DetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  // 데이터를 저장할 상태를 useState를 통해 생성
  const [cookrcp, setCookrcp] = useState<any | null>(null);

  const fetchData = async () => {
    let { data: cookrcp, error } = await supabase
      .from("cookrcp")
      .select("*")
      .eq("RCP_ID", id);
    if (error) console.error("데이터를 불러오는데 실패했습니다.", error);
    else setCookrcp(cookrcp[0]); // 데이터를 상태에 저장
  };

  useEffect(() => {
    fetchData();
  }, [id]); // 의존성 배열에 id를 추가하여 id가 변경될 때마다 fetchData를 호출

  //   console.log("현재 아이디는", id);

  return (
    <main className="flex flex-col items-center">
      {cookrcp && (
        <div className="mb-10">
          <Image
            src={cookrcp.RCP_IMG_BIG} // 기본 이미지 URL 사용
            alt="food image"
            width={600}
            height={600}
            className=""
            unoptimized={true}
          />
        </div>
      )}
      {cookrcp && (
        <div className="flex">
          <div className="mr-5">
            <FoodName
              tag={cookrcp.HASH_TAG}
              way={cookrcp.RCP_WAY}
              name={cookrcp.RCP_NAME}
            />
            <Ingredients ingre={cookrcp.RCP_INGREDIENT} />
            <Cooking />
          </div>
          <div className="ml-5">
            <Nutrient
              tan={cookrcp.INFO_TAN}
              dan={cookrcp.INFO_PRO}
              ge={cookrcp.INFO_FAT}
              kcal={cookrcp.INFO_CAR}
              na={cookrcp.INFO_NA}
            />
            <Scrap recipeId={id} />
          </div>
        </div>
      )}
      <div className="flex ml-5">
        <Comments />
      </div>
    </main>
  );
};

export default DetailPage;
