"use client";

import React, { useState, ChangeEvent, KeyboardEvent } from "react";

const Comments = () => {

    const [inputText, setInputText] = useState('');
    const [comments, setComments] = useState<string[]>([]);

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputText.trim() !== '' && inputText.length <= 100) {
            setComments([...comments, inputText]);
            setInputText('');
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newText = event.target.value
        if (newText.length > 100) {
            alert("100자 이내로 작성해주세요.");
        } else {
            setInputText(newText);
        }
    }

    return (
        <div className="flex-col mt-20">
            <div className="flex">
                <p className="text-brown text-2xl font-bold">댓글</p>
                <p className="text-deepgrey text-2xl font-bold ml-2">{comments.length}</p>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="댓글을 입력해주세요."
                    className="flex h-20 w-950 p-10 mt-5 rounded-3xl caret-peach border-2 border-peach text-xl shadow-lg shadow-black-500"
                    value={inputText}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
            </div>
            <div>
                {comments.length > 0 ? (
                    <div className="flex flex-col min-h-[300px] w-950 mt-5 rounded-3xl border-2 border-peach text-xl shadow-lg shadow-black-500">
                        {comments.map((comment, index) => (
                            <div key={index} className="p-4 border-b-2 border-peach">
                                <p className="">{comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center min-h-[300px] w-950 mt-5 rounded-3xl border-2 border-peach text-xl shadow-lg shadow-black-500">
                        <p className="text-center font-light">댓글을 작성하여 레시피의 리뷰 또는 난이도를 공유해보세요 🙂</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Comments;