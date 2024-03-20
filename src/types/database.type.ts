export interface Database {
    public: {
      Tables: {
        cookrcp: {
          Row: {
            // the data expected from .select()
            id: number;
            name: string;
            type: string;
            image: string;
            way: string;
            tip?: string;
          };
          Insert: {
            // the data to be passed to .insert()
          };
          Update: {
            // the data to be passed to .update()
          };
        };
      };
    };
  }