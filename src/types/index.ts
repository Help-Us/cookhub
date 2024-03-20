export type UserProfile = {
  uid: string;
  nickname: string;
  email: string;
  avatar_img: string;
};

export type Recipe = {
  image: string;
  name: string;
  type: string;
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
