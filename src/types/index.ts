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

export type RecipeType = {
  HASH_TAG?: string | null;
  INFO_CAR?: number | null;
  INFO_FAT?: number;
  INFO_NA?: number;
  INFO_PRO?: number;
  INFO_TAN?: number;
  INFO_WEIGHT?: number | null;
  MANUAL01?: string | null;
  MANUAL02?: string | null;
  MANUAL03?: string | null;
  MANUAL04?: string | null;
  MANUAL05?: string | null;
  MANUAL06?: string | null;
  MANUAL_IMG01?: string | null;
  MANUAL_IMG02?: string | null;
  MANUAL_IMG03?: string | null;
  MANUAL_IMG04?: string | null;
  MANUAL_IMG05?: string | null;
  MANUAL_IMG06?: string | null;
  RCP_ID: number;
  RCP_IMG_BIG?: string | null;
  RCP_IMG_SMALL?: string | null;
  RCP_INGREDIENT?: string | null;
  RCP_NAME: string;
  RCP_TIP?: string | null;
  RCP_TYPE?: string | null;
  RCP_WAY?: string | null;
};
