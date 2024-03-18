"use client";
import React, { useState } from 'react';

interface SearchBoxProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [input, setInput] = useState<string>('');

  // 키 입력 이벤트 핸들러
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') { // 엔터 키를 눌렀을 때만 onSearch 호출
      onSearch(input);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-64 bg-[#F5EEE6]">
        <div className="w-full max-w-4xl py-8 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">레시피를 검색해주세요</h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="레시피를 입력해주세요"
              className="form-input px-4 py-2 w-full max-w-md border rounded shadow"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress} // 엔터 키 입력을 감지하기 위한 이벤트 핸들러 추가
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => onSearch(input)}
            >
              검색
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBox;
