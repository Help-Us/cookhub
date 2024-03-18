export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#F5EEE6]">
        <div className="w-full max-w-4xl h-[500px] flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">레시피 검색</h1>
          <input type="text" placeholder="레시피를 입력해주세요" 
            className="form-input px-4 py-2 w-full max-w-md border rounded shadow" />
        </div>
      </div>
    </>
  )
}
