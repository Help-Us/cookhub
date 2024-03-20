"use client";
import React, { useState } from 'react';

interface SearchBoxProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [input, setInput] = useState<string>('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      onSearch(input);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-64 bg-[color:var(--baseColor)]">
        <div className="w-full max-w-4xl py-8 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">레시피를 검색해주세요</h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="레시피를 입력해주세요"
              className="form-input px-4 py-2 w-full max-w-xl border rounded shadow"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBox;
