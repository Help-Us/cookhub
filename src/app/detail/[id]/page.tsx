"use client";

import React, { useEffect } from "react";
import Ingredients from "@/components/detail/Ingredients";
import Nutrient from "@/components/detail/Nutrient";
import FoodName from "@/components/detail/FoodName";
import Cooking from "@/components/detail/Cooking";
import Comments from "@/components/detail/Comments";
import Image from "next/image";
import { supabase } from "@/api/supabase/supabase";

const DetailPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;

    const fatchdata = async () => {
        let { data: cookrcp, error } = await supabase
            .from('cookrcp')
            .select('*')
            .eq('RCP_ID', id)
        console.log(cookrcp)
        return cookrcp;
    }

    useEffect(
        () => {
            const kda = fatchdata();
            console.log(kda);
        }, []
    )

    console.log('현재 아이디는',id);

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