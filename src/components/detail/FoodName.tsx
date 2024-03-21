import React from "react";


const FoodName = ({ tag, name, way, type }) => {

    return (
        <div className="mb-10">
            <p className="text-brown text-2xl font-bold mb-2.5">{name}</p>
            
            <div className="flex mt-3">
                {tag && (
                <div className="flex items-center ml-2 justify-center bg-grey h-10 w-28 border-pink border-2 rounded-3xl">
                    <p className="text-xl font-medium">#{tag}</p>
                </div>
                )}
                <div className="flex items-center ml-2 justify-center bg-grey h-10 w-28 border-pink border-2 rounded-3xl">
                    <p className="text-xl font-medium">#{way}</p>
                </div>
                <div className="flex items-center ml-2 justify-center bg-grey h-10 w-28 border-pink border-2 rounded-3xl">
                    <p className="text-xl font-medium">#{type}</p>
                </div>
            </div>
        </div>
    );
}

export default FoodName;