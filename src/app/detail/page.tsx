import React from "react";
import Ingredients from "@/components/detail/Ingredients";
import Nutrient from "@/components/detail/Nutrient";
import FoodName from "@/components/detail/FoodName";
import Cooking from "@/components/detail/Cooking";
import Comments from "@/components/detail/Comments";
import Image from "next/image";

const DetailPage = () => {
    return (
        <main className="flex flex-col items-center">
            <div className="mb-10">
                <Image
                    src={'https://images.pexels.com/photos/2205270/pexels-photo-2205270.jpeg?cs=srgb&dl=pexels-donald-tong-2205270.jpg&fm=jpg'}
                    alt="food image"
                    width={600}
                    height={600}
                    className=""
                />
            </div>

            <div className="flex">
                <div className="mr-5">
                    <FoodName />
                    <Ingredients />
                    <Cooking />
                </div>
                <div className="ml-5">
                    <Nutrient />
                </div>
            </div>

            <div className="flex ml-5">
                <Comments />
            </div>


        </main>
    );
}


export default DetailPage;
