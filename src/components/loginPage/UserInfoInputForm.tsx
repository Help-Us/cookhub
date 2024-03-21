"use client";

const UserInfoInputForm = () => {
  return (
    <>
      <input
        className="input-style"
        type="text"
        placeholder="아이디"
        required
      />
      <input
        className="input-style"
        type="password"
        placeholder="비밀번호"
        required
      />
    </>
  );
};

export default UserInfoInputForm;
