import React from "react";

interface IngredientsProps {
    ingre: string;
}

const Ingredients: React.FC<IngredientsProps> = ({ingre}) => {
    return (
        <div>
            <div className="mb-2.5">
                <p className="text-brown text-2xl font-bold ml-2">재료</p>
            </div>
            <div className="flex justify-center items-center bg-grey h-32 w-600 border-pink border-2 rounded-3xl">
                <p className="p-6 font-medium">{ingre}</p>
            </div>
        </div>
    );
}

export default Ingredients;