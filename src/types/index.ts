export type UserProfile = {
  uid: string;
  nickname: string;
  email: string;
  avatar_img: string;
};

export interface UserDatabaseType {
  uid: string;
  nickname: string;
  email: string;
  avatar_img: string;
  id: string;

  // public: {
  //   Tables: {
  //     userData: {
  //       Row: {
  //         uid: string;
  //         nickname: string;
  //         email: string;
  //         avatar_img: string;
  //         id: string;
  //       };
  //       Insert: {
  //         // the data to be passed to .insert()
  //       };
  //       Update: {
  //         // the data to be passed to .update()
  //       };
  //     };
  //   };
  // };
}
