import React from "react";
import Ingredients from "@/components/Ingredients";
import Nutrient from "@/components/Nutrient";

const DetailPage = () => {
    return (
        <main className="flex justify-center items-center">
            <div className="mr-5">
                <Ingredients />
            </div>
            <div className="">
                <Nutrient />
            </div>
        </main>
    );
}


export default DetailPage;
