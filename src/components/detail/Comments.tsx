"use client";

import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
import { supabase } from "@/api/supabase/supabase";
import { getCurrentLoginUserInfo } from "@/utils/supabase/checkLoginUser";

const Comments = ({ recipeId }: { recipeId: string }) => {
    const [inputText, setInputText] = useState('');
    // 댓글 데이터를 저장할 상태를 배열 대신 객체 배열로 변경
    const [comments, setComments] = useState<{ id: string, content: string, nickname: string, avatar_url: string }[]>([]);

    // 페이지 로드 시 댓글 데이터를 불러오는 함수
    const fetchComments = async () => {
        
        const { data, error } = await supabase
        
            .from('comments')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) {
            setComments(data);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputText.trim() !== '') {
            const currentLoginUserInfo = await getCurrentLoginUserInfo();
            if (currentLoginUserInfo) {
                const { id: id, user_metadata } = currentLoginUserInfo;
                const { data, error } = await supabase
                    .from('comments')
                    .insert([
                        { project_id: recipeId, content: inputText, user_id: id, nickname: user_metadata.nickname, avatar_url: user_metadata.avatar_url }
                    ]);
                    

                if (data) {
                    setComments([data[0], ...comments]);
                    setInputText('');
                }

                if (error) {
                    console.error("댓글 추가 오류:", error.message);
                }

                console.log(currentLoginUserInfo);
            }
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };


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
                        {comments.map((comment) => (
                            <div key={recipeId} className="m-5 h-54">
                                <div className="flex items-center mt-5">
                                    <Image
                                        src={comment.avatar_url}
                                        alt="user image"
                                        width={60}
                                        height={60}
                                        className="rounded-full ml-5"
                                    />
                                    <p className="text-black text-xl font-bold ml-5">{comment.nickname}</p>
                                </div>
                                <div className="p-4 border-2 rounded-br-lg m-5">
                                    <p className="">{comment.content}</p>
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