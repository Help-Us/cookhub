import { addScrap } from "@/api/supabase/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

export const useAddScrapMutation = () => {
  const addScrapMutation = useMutation({
    mutationFn: addScrap,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.scrap]
      });
    }
  });
};
