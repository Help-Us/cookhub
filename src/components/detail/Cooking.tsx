import React from "react";
import Image from "next/image";

const Cooking = () => {

    return (
        <div className="flex-col mt-20">
            <p className="text-brown text-2xl font-bold">만드는 방법</p>
            <div className="flex mt-5">
                <Image
                    src={'https://lh3.googleusercontent.com/proxy/8lSvdDvsWQLwxYpIuFZK3J9dv5Vhh961c0yROUnP4BCczQSSSKm36XwToxnMDIUk27QC0zzOPpFpHzjPwKrjPXsd24amPUogjs9BDv5EeAYvyRkiSpzXmgxYsvc79vz7UMhxJZrR5vlDwPyvT_PcYVJHyk0T'}
                    alt="step image"
                    width={200}
                    height={10}
                    className=""
                />
                <div className="flex-col">
                    <p className="text-xl font-medium ml-10">Step 1</p>
                    <p className="ml-10 ">마늘은 편 썰고, 양파는 슬라이스한다.</p>
                </div>
            </div>
            <div className="flex mt-5">
                <Image
                    src={'https://lh3.googleusercontent.com/proxy/8lSvdDvsWQLwxYpIuFZK3J9dv5Vhh961c0yROUnP4BCczQSSSKm36XwToxnMDIUk27QC0zzOPpFpHzjPwKrjPXsd24amPUogjs9BDv5EeAYvyRkiSpzXmgxYsvc79vz7UMhxJZrR5vlDwPyvT_PcYVJHyk0T'}
                    alt="step image"
                    width={200}
                    height={10}
                    className=""
                />
                <div className="flex-col">
                    <p className="text-xl font-medium ml-10">Step 2</p>
                    <p className="ml-10 ">일단 대충 써놓기나 해보자  ㅡ.  ㅡ..</p>
                </div>
            </div>
        </div>
    );
}

export default Cooking;