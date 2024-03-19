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
                <div className="ml-4">
                    <p className="mb-1">탄수화물ㅤㅤㅤㅤㅤㅤㅤg</p>
                    <p className="mb-1">단백질ㅤㅤㅤㅤㅤㅤㅤㅤg</p>
                    <p className="mb-1">나트륨ㅤㅤㅤㅤㅤㅤㅤㅤmg</p>
                    <p className="mb-1">지방ㅤㅤㅤㅤㅤㅤㅤㅤㅤg</p>
                    <p className="mb-2">열량ㅤㅤㅤㅤㅤㅤㅤㅤㅤkcal</p>
                </div>
                <div className="bg-pink text-black h-16 w-52 mx-auto flex justify-center items-center">
                    <p className="text-2xl flex items-center">스크랩ㅤ<IoBookmarkOutline /></p>
                </div>
            </div>
    );
}

export default Nutrient;
