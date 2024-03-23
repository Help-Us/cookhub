import React from "react";

interface FootNameProps {
    name: string;
    tag: string;
    way: string;
    type: string;
}
const FoodName: React.FC<FootNameProps> = ({ name, tag, way, type }) => {

    return (
        <div className="mb-10">
            <p className="text-brown text-3xl font-bold mb-4 ml-2">{name}</p>
            
            <div className="flex mt-3">
                {tag && (
                <div className="flex items-center ml-2 justify-center bg-grey h-10 w-28 border-pink border-2 rounded-3xl">
                    <p className="text-xl font-medium">#{tag}</p>
                </div>
                )}
                {way && (
                <div className="flex items-center ml-2 justify-center bg-grey h-10 w-28 border-pink border-2 rounded-3xl">
                    <p className="text-xl font-medium">#{way}</p>
                </div>
                )}
                {type && (
                <div className="flex items-center ml-2 justify-center bg-grey h-10 w-28 border-pink border-2 rounded-3xl">
                    <p className="text-xl font-medium">#{type}</p>
                </div>
                )}
            </div>
        </div>
    );
}

export default FoodName;