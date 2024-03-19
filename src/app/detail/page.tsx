import React from "react";
import Ingredients from "@/components/detail/Ingredients";
import Nutrient from "@/components/detail/Nutrient";
import FoodName from "@/components/detail/FoodName";
import Cooking from "@/components/detail/Cooking";
import Image from "next/image";

const DetailPage = () => {
    return (
        <main className="flex flex-col items-center">
            <div className="mb-10">
                <Image
                    src={'https://static.wtable.co.kr/image/production/service/recipe/1967/bfbec835-45b4-4e15-a658-ec4f1947ba2e.jpg'}
                    alt="food image"
                    width={600}
                    height={100}
                    className=""
                />
            </div>

            <div className="flex">
                <div className="mr-5">
                    <FoodName />
                    <Ingredients />
                    <Cooking />
                </div>
                <div className="">
                    <Nutrient />
                </div>
            </div>



        </main>
    );
}


export default DetailPage;
