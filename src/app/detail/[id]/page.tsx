import React from "react";
import Ingredients from "@/components/detail/Ingredients";
import Nutrient from "@/components/detail/Nutrient";
import FoodName from "@/components/detail/FoodName";
import Cooking from "@/components/detail/Cooking";
import Comments from "@/components/detail/Comments";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

const DetailPage = async () => {
    const supabase = createClient();

    let { data: cookrcp, error } = await supabase
    .from('cookrcp')
    .select('*')
    .eq('RCP_ID', '28')

    console.log('======',cookrcp);

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