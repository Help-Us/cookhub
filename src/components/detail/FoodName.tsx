import React from "react";

interface FootNameProps {
    tag: string;
    name: string;
    way: string;
}
const FoodName: React.FC<FootNameProps> = ({ tag, name, way }) => {

    return (
        <div className="mb-10">
            <p className="text-brown text-2xl font-bold mb-2.5">{name}</p>
            <div className="flex">
                <div className="flex items-center justify-center bg-grey h-10 w-28 border-pink border-2 rounded-3xl">
                    <p className="text-xl font-medium">#{tag}</p>
                </div>
                <div className="flex items-center ml-3 justify-center bg-grey h-10 w-28 border-pink border-2 rounded-3xl">
                    <p className="text-xl font-medium">#{way}</p>
                </div>
            </div>
        </div>
    );
}

export default FoodName;