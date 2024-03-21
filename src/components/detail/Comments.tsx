"use client";

import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";

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
        <div className="flex-col mt-28">
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
                            <div className="m-5 h-54">
                                <div className="flex items-center mt-5">
                                    <Image
                                        src={'https://i.pinimg.com/280x280_RS/ce/6c/fc/ce6cfc73ef62f44510a64bc62937328f.jpg'}
                                        alt="food image"
                                        width={60}
                                        height={60}
                                        className="rounded-full ml-5"
                                    />
                                    <p className="text-black text-xl font-bold ml-5">닉네임</p>
                                </div>
                                <div key={index} className="p-4 border-2 rounded-br-lg m-5">
                                    <p className="">{comment}</p>
                                </div>
                                <div className="flex justify-end ml-10">
                                    <button className="mr-10">수정</button>
                                    <button className="mr-5">삭제</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center min-h-[300px] w-950 mt-5 rounded-3xl border-2 border-peach text-xl shadow-lg shadow-black-500">
                        <p className="text-center font-light">댓글을 작성하여 리뷰 또는 난이도를 공유해보세요 🙂</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Comments;