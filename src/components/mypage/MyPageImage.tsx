import { downloadImage } from "@/api/supabase/supabase";
import { UserImageUrlType } from "@/types";
import React, { useState } from "react";

export default function MyPageImage() {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  // useEffect(() => {
  //   async function fetchImage() {
  //     const image = await downloadImage(imagePath);
  //     console.log(image);
  //     if (image) {
  //       setImgUrl(URL.createObjectURL(new Blob([image])));
  //     }
  //   }
  //   fetchImage();
  // }, [imagePath]);

  return (
    <div>
      {imgUrl ? (
        <img src={imgUrl} alt="이미지" />
      ) : (
        <p>이미지를 불러오는 중...</p>
      )}
    </div>
  );
}
