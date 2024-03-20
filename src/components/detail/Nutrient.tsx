import React from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";

const Nutrient = () => {
    return (
        <div className="bg-hotpink h-72 w-60 text-white font-medium">
            <div className="p-1">
                <p className="text-xl ml-2 mt-2">영양성분</p>
            </div>
            <hr className="border-1.3 border-white w-52 mx-auto mb-3 mt-1" />
            <div className="flex justify-between">
                <div className="ml-4">
                    <p className="mb-1">탄수화물</p>
                    <p className="mb-1">단백질</p>
                    <p className="mb-1">나트륨</p>
                    <p className="mb-1">지방</p>
                    <p className="mb-2">열량</p>
                </div>
                <div className="pr-5">
                    <p className="mb-1">g</p>
                    <p className="mb-1">g</p>
                    <p className="mb-1">mg</p>
                    <p className="mb-1">g</p>
                    <p className="mb-1">kcal</p>
                </div>
            </div>
            <div className="bg-pink text-black h-16 w-52 mx-auto flex justify-center items-center">
                <p className="text-2xl flex items-center">스크랩ㅤ<IoBookmarkOutline /></p>
            </div>
        </div>
    );
}

export default Nutrient;
