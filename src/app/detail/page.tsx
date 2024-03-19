import React from "react";
import Ingredients from "@/components/detail/Ingredients";
import Nutrient from "@/components/detail/Nutrient";
import FoodName from "@/components/detail/FoodName";
import Image from "next/image";

const DetailPage = () => {
    return (
        <main className="flex flex-col items-center">
            <div className="imageContainer mb-10">
                <Image
                    src={'https://png.pngtree.com/thumb_back/fh260/background/20210207/pngtree-pink-solid-color-simple-background-image_556899.jpg'}
                    alt="food image"
                    width={600}
                    height={100}
                    className=""
                />
            </div>
            <div className="componentsContainer flex">
                <div className="mr-5">
                    <FoodName />
                    <Ingredients />
                </div>
                <div className="">
                    <Nutrient />
                </div>
            </div>
        </main>
    );
}


export default DetailPage;
