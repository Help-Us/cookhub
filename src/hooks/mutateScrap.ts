import { addScrap, cancelScrap } from "@/api/supabase/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddScrapMutation = () => {
  const queryClient = useQueryClient();
  const addScrapMutation = useMutation({
    mutationFn: addScrap,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.scrap]
      });
    }
  });

  return addScrapMutation;
};

export const useCancelScrapMutation = () => {
  const queryClient = useQueryClient();

  const cancelScrapMutation = useMutation({
    mutationFn: cancelScrap,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.scrap]
      });
    }
  });

  return cancelScrapMutation;
};
