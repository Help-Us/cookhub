import React from "react";
import Image from "next/image";

// Props 타입을 정의합니다.
interface CookingProps {
  manualIMG1?: string;
  manualIMG2?: string;
  manualIMG3?: string;
  manualIMG4?: string;
  manualIMG5?: string;
  manualIMG6?: string;
  manual1?: string;
  manual2?: string;
  manual3?: string;
  manual4?: string;
  manual5?: string;
  manual6?: string;
  tip?: string;
}

const Cooking: React.FC<CookingProps> = ({
  manualIMG1,
  manualIMG2,
  manualIMG3,
  manualIMG4,
  manualIMG5,
  manualIMG6,
  manual1,
  manual2,
  manual3,
  manual4,
  manual5,
  manual6,
  tip,
}) => {
  return (
    <div className="flex-col mt-20">
      <p className="text-brown text-2xl font-bold">만드는 방법 👩🏻‍🍳</p>
      {manualIMG1 && (
        <div className="flex mt-8">
          <Image src={manualIMG1} alt="step image" width={200} height={100} />
          <div className="flex-col">
            <p className="text-xl font-medium ml-10 mb-5 select-none">Step 1</p>
            <p className="ml-10">{manual1}</p>
          </div>
        </div>
      )}
      {/* 나머지 부분은 동일하므로 생략 */}
      {tip && (
        <div className="mt-12">
          <p className="text-lg font-semibold">요리 TIP❗️{tip}</p>
        </div>
      )}
    </div>
  );
};

export default Cooking;
