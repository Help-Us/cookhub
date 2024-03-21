import React from "react";
import Image from "next/image";

const Cooking = ({ manualIMG1, manualIMG2, manualIMG3, manualIMG4, manualIMG5, manualIMG6, manual1, manual2, manual3, manual4, manual5, manual6 }) => {

    const splitText = (text, maxLength) => {
        var result = [];
        for (let i = 0; i < text.length; i += maxLength) {
            result.push(text.substring(i, i + maxLength));
        }
        return result;
    };

    const renderManualText = (text) => {
        return splitText(text, 48).map((item, index) => (
            <p className="ml-5" key={index}>
                {item}
            </p>
        ));
    };

    return (
        <div className="flex-col mt-20">
            <p className="text-brown text-2xl font-bold">만드는 방법</p>
            {manualIMG1 && (
                <div className="flex mt-10">
                    <Image
                        src={manualIMG1}
                        alt="step image"
                        width={200}
                        height={10}
                        className=""
                    />
                    <div className="flex-col">
                        <p className="text-xl font-medium ml-10 mb-5">Step 1</p>
                        <p className="ml-10">{renderManualText(manual1)}</p>
                    </div>
                </div>
            )}
            {manualIMG2 && (
                <div className="flex mt-10">
                    <Image
                        src={manualIMG2}
                        alt="step image"
                        width={200}
                        height={10}
                        className=""
                    />
                    <div className="flex-col">
                        <p className="text-xl font-medium ml-10 mb-5">Step 2</p>
                        <p className="ml-10">{renderManualText(manual2)}</p>
                    </div>
                </div>
            )}
            {manualIMG3 && (
                <div className="flex mt-10">
                    <Image
                        src={manualIMG3}
                        alt="step image"
                        width={200}
                        height={10}
                        className=""
                    />
                    <div className="flex-col">
                        <p className="text-xl font-medium ml-10 mb-5">Step 3</p>
                        <p className="ml-10">{renderManualText(manual3)}</p>
                    </div>
                </div>
            )}
            {manualIMG4 && (
                <div className="flex mt-10">
                    <Image
                        src={manualIMG4}
                        alt="step image"
                        width={200}
                        height={10}
                        className=""
                    />
                    <div className="flex-col">
                        <p className="text-xl font-medium ml-10 mb-5">Step 4</p>
                        <p className="ml-10">{renderManualText(manual4)}</p>
                    </div>
                </div>
            )}
            {manualIMG5 && (
                <div className="flex mt-10">
                    <Image
                        src={manualIMG5}
                        alt="step image"
                        width={200}
                        height={10}
                        className=""
                    />
                    <div className="flex-col">
                        <p className="text-xl font-medium ml-10 mb-5">Step 5</p>
                        <p className="ml-10">{renderManualText(manual5)}</p>
                    </div>
                </div>
            )}
            {manualIMG6 && (
                <div className="flex mt-10">
                    <Image
                        src={manualIMG6}
                        alt="step image"
                        width={200}
                        height={10}
                        className=""
                    />
                    <div className="flex-col">
                        <p className="text-xl font-medium ml-10 mb-5">Step 6</p>
                        <p className="ml-10">{renderManualText(manual6)}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cooking;