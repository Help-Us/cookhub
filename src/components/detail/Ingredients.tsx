import React from "react";

const Ingredients = ({ingre}) => {


    return (
        <div>
            <div className="mb-2.5">
                <p className="text-brown text-2xl font-bold">재료</p>
            </div>
            <div className="bg-grey h-32 w-600 border-pink border-2 rounded-3xl">
                <p className="flex justify-center items-center p-6">{ingre}</p>
            </div>
        </div>
    );
}

export default Ingredients;