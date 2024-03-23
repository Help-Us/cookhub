"use client";

import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
import { supabase } from "@/api/supabase/supabase";
import { getCurrentLoginUserInfo } from "@/utils/supabase/checkLoginUser";
import { addComment, deleteComment, updateComment } from "@/api/supabase/supabase";

const Comments = ({ post_id }: { post_id: string }) => {
    const [inputText, setInputText] = useState('');

    // 댓글 데이터를 저장할 상태를 배열 대신 객체 배열로 변경
    const [comments, setComments] = useState<{ comment_id: string, post_id: string, user_id: string, content: string, created_at: string, nickname: string, avatar_img: string }[]>([]);

    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');

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
        fetchCurrentUserId(); // 컴포넌트 마운트 시 현재 로그인한 사용자의 ID를 가져오는 함수 호출
    }, [post_id]);

    const fetchCurrentUserId = async () => {
        const userInfo = await getCurrentLoginUserInfo();
        if (userInfo) {
            setCurrentUserId(userInfo.id); // 현재 로그인한 사용자의 ID를 상태에 저장
        }
    };


    // 댓글 추가
    const handleKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputText.trim() !== '') {
            const currentLoginUserInfo = await getCurrentLoginUserInfo();
            if (currentLoginUserInfo) {
                const { id: userId } = currentLoginUserInfo || {};
                const { avatar_img, nickname } = currentLoginUserInfo?.user_metadata || {};

                const result = await addComment(userId, post_id, inputText, nickname, avatar_img); // 지금 이 부분 문제있음. 콘솔로 result찍어보니 null 나옴

                if (result !== null) {
                    // 성공적으로 댓글이 추가되면 댓글 목록 상태를 업데이트
                    setComments([result[0], ...comments]);
                    setInputText(''); // 입력 필드 초기화
                } else {
                    console.error("댓글 추가 실패");
                }
            }
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    // 댓글 삭제
    const handleDeleteComment = async (comment_id) => {
        const currentLoginUserInfo = await getCurrentLoginUserInfo();
        if (!currentLoginUserInfo) {
            console.log("로그인한 사용자 정보를 가져올 수 없음");
            return;
        }
        const { id: userId } = currentLoginUserInfo;

        // 댓글 삭제 전 확인 메시지를 표시
        const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
        if (isConfirmed) {
            // 사용자가 '예'를 선택한 경우, 댓글 삭제 로직 실행
            const isDelete = await deleteComment(comment_id, userId);
            if (isDelete) {
                // 삭제 성공 시, 댓글 목록에서 해당 댓글 제거
                setComments(comments.filter(comment => comment.comment_id !== comment_id));
            } else {
                console.log("댓글 삭제 실패");
            }
        } else {
            // 사용자가 '아니오'를 선택한 경우, 아무런 작업도 수행하지 않음
            console.log("댓글 삭제 취소");
        }
    }

    // 댓글 수정 시작
    const startEditComment = (commentId: string, currentContent: string) => {
        setEditingCommentId(commentId);
        setEditText(currentContent);
    };

    // 댓글 수정 취소
    const cancelEditComment = () => {
        setEditingCommentId(null);
        setEditText('');
    };

    // 댓글 수정 제출
    const submitEditComment = async (commentId: string) => {
        const currentLoginUserInfo = await getCurrentLoginUserInfo();
        if (!currentLoginUserInfo) {
            console.log("로그인한 사용자 정보를 가져올 수 없음");
            return;
        }
        const { id: userId } = currentLoginUserInfo;

        const isUpdate = await updateComment(commentId, userId, editText);
        if (isUpdate) {
            // 수정 성공 시, 댓글 목록 갱신
            const updatedComments = comments.map(comment =>
                comment.comment_id === commentId ? { ...comment, content: editText } : comment
            );
            setComments(updatedComments);
            cancelEditComment();
        } else {
            console.log("댓글 수정 실패");
        }
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
                    <div className="flex flex-col min-h-[300px] w-950 mt-5 pb-8 rounded-3xl border-2 border-peach text-xl shadow-lg shadow-black-500">
                        {comments.map((comment) => (
                            <div key={comment.comment_id} className="m-5 h-54">
                                <div className="flex items-center mt-5 justify-between">
                                    <div className="flex items-center">
                                        <Image
                                            src={'https://i.pinimg.com/280x280_RS/ce/6c/fc/ce6cfc73ef62f44510a64bc62937328f.jpg'}
                                            alt="user image"
                                            width={60}
                                            height={60}
                                            className="rounded-full ml-5"
                                        />
                                        <p className="text-black text-xl font-bold ml-5">{comment.nickname}</p>
                                    </div>
                                    <p className="mr-5">{comment.created_at}</p>
                                    {/* 시간대 수정해야함 */}
                                </div>
                                {editingCommentId === comment.comment_id ? (
                                    <div>
                                        <div className="p-4 border-2 rounded-br-lg m-5">
                                            <input className="w-full text-xl" type="text" value={editText} onChange={(event) => setEditText(event.target.value)} />
                                        </div>
                                        <div className="flex justify-end ml-10">
                                            <button className="mr-5 text-lg border-2 w-20 rounded-full ring-2 hover:bg-peach hover:text-black hover:ring-0" onClick={() => submitEditComment(comment.comment_id)}>수정 완료</button>
                                            <button className="mr-5 text-lg border-2 w-20 rounded-full ring-2 hover:bg-peach hover:text-black hover:ring-0" onClick={cancelEditComment}>취소</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="p-4 border-2 rounded-br-lg m-5">
                                            <p className="">{comment.content}</p>
                                        </div>
                                        <div className="flex justify-end ml-10">
                                            {currentUserId === comment.user_id && (
                                                <div>
                                                    <button className="mr-5 text-lg border-2 w-20 rounded-full ring-4 ring-purple-100 hover:bg-peach hover:text-black hover:ring-0" onClick={() => startEditComment(comment.comment_id, comment.content)}>수정</button>
                                                    <button className="mr-5 text-lg border-2 w-20 rounded-full text-red-500 ring-4 ring-purple-100 hover:bg-peach hover:text-red hover:ring-0" onClick={() => handleDeleteComment(comment.comment_id)}>삭제</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
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