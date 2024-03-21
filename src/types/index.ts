export type UserProfile = {
  uid: string;
  nickname: string;
  email: string;
  avatar_img: string;
};

export type Recipe = {
  id: number;
  image: string;
  name: string;
  type: string;
  how: string;
  tip?: string;
};

export interface UserDatabaseType {
  uid: string;
  nickname: string;
  email: string;
  avatar_img: string;
  id: string;
}

export interface UserImageUrlType {
  uploadedFileUrl: string[];
  setUploadedFileUrl: React.Dispatch<React.SetStateAction<string[]>>;
}
