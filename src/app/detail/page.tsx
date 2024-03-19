import React from "react";
import Ingredients from "@/components/detail/Ingredients";
import Nutrient from "@/components/detail/Nutrient";
import FoodName from "@/components/detail/FoodName";

const DetailPage = () => {
    return (
        <main className="flex justify-center items-center">
            <div className="mr-5">
                <FoodName />
                <Ingredients />
            </div>
            <div className="">
                <Nutrient />
            </div>
        </main>
    );
}


export default DetailPage;
