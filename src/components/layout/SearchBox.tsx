"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import searchImage from "@/assets/search.png";

interface SearchBoxProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const router = useRouter();

  const [input, setInput] = useState<string>("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(input);
      router.push(`/category/${input.trim() ? input : "All"}`);
    }
  };

  const handleClick = () => {
    router.push(`/category/${input.trim() ? input : "All"}`);
  }

  return (
    <>
      <div className="bg-[color:var(--baseColor)] w-screen">
        <div className="w-full max-w-4xl py-12 mx-auto mt-0">
          <h1 className="text-2xl font-bold mb-6 text-brown text-center">
            레시피를 검색해보세요!
          </h1>
          <div className="flex items-center gap-2 justify-center relative">
            <input
              type="text"
              placeholder="레시피를 입력해주세요"
              className="form-input px-4 py-2 w-full max-w-xl rounded-2xl border-2 border-[color:var(--borderColor2)] pr-10"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="w-8 cursor-pointer" onClick={handleClick}>
              <Image alt="SearchImage" src={searchImage}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBox;