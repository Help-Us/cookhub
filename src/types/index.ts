export interface UserDatabaseType {
  uid: string;
  nickname: string;
  email: string;
  avatar_img: string;
  id: string;
}

export type Recipe = {
  id: number;
  image: string;
  name: string;
  type: string;
  how: string;
  tip?: string;
};

export type ProfileDataType = {
  isEditing: boolean;
  avatarUrl: string;
  email: string;
  nickname: string;
  onChangeEditingHandler: () => void;
  onChangeNicknameHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadProfile: () => Promise<void>;
  onChangeImageHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type RecipeType = {
  HASH_TAG: string;
  INFO_CAR: number;
  INFO_FAT: number;
  INFO_NA: number;
  INFO_PRO: number;
  INFO_TAN: number;
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
  RCP_IMG_BIG: string;
  RCP_IMG_SMALL: string;
  RCP_INGREDIENT: string;
  RCP_NAME: string;
  RCP_TIP: string;
  RCP_TYPE: string;
  RCP_WAY: string;
};
