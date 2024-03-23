"use client";

import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
import { supabase } from "@/api/supabase/supabase";
import { getCurrentLoginUserInfo } from "@/utils/supabase/checkLoginUser";
import { addComment, deleteComment,  } from "@/api/supabase/supabase";

const Comments = ({ post_id }: { post_id: string }) => {
    const [inputText, setInputText] = useState('');
    // 댓글 데이터를 저장할 상태를 배열 대신 객체 배열로 변경
    const [comments, setComments] = useState<{ comment_id: string, post_id: string, user_id: string, content: string, nickname: string, avatar_url: string, created_at: string }[]>([]);
    // 페이지 로드 시 댓글 데이터를 불러오는 함수
    const fetchComments = async () => {
        
        const { data, error } = await supabase
        
            .from('comments')
            .select('*')
            .eq('post_id', post_id)
            .order('created_at', { ascending: false });

        if (data) {
            setComments(data);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [post_id]);

    const handleKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputText.trim() !== '') {
            const currentLoginUserInfo = await getCurrentLoginUserInfo();
            if (currentLoginUserInfo) {
                const { id: userId, user_metadata } = currentLoginUserInfo;
                const result = await addComment(userId, post_id, inputText); // 지금 이 부분 문제있음. 콘솔로 result찍어보니 null 나옴
    
                if (result) {
                    // 성공적으로 댓글이 추가되면 댓글 목록 상태를 업데이트
                    setComments([result[0], ...comments]);
                    setInputText(''); // 입력 필드 초기화
                } else {
                    console.error("댓글 추가 실패");
                    console.log(currentLoginUserInfo); // 유저 정보 가져와짐
                }
            }
        }
    };
    

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleDeleteComment = async (comment_id) => {
        const isDelete = await deleteComment(comment_id);
        if (isDelete) {
            setComments(comments.filter(comment => comment.comment_id !== comment_id));
        } else {
            console.log("댓글 삭제 실패");
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
                        {comments.map((comment) => (
                            <div key={comment.comment_id} className="m-5 h-54">
                                <div className="flex items-center mt-5">
                                    <Image
                                        src={comment.avatar_url || 'https://i.pinimg.com/280x280_RS/ce/6c/fc/ce6cfc73ef62f44510a64bc62937328f.jpg'}
                                        alt="user image"
                                        width={60}
                                        height={60}
                                        className="rounded-full ml-5"
                                    />
                                    <p className="text-black text-xl font-bold ml-5">{}</p>
                                </div>
                                <div className="p-4 border-2 rounded-br-lg m-5">
                                    <p className="">{comment.content}</p>
                                </div>
                                <div className="flex justify-end ml-10">
                                    <p>{comment.created_at}</p>
                                    <button className="mr-10">수정</button>
                                    <button className="mr-5" onClick={() => handleDeleteComment(comment.comment_id)}>삭제</button>
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