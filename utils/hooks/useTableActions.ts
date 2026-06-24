import { useCallback } from "react";
import { useToast } from "@/components/molecules/Toast";
import { updateCandidaturaStatus, deleteCandidatura } from "@/app/actions";

export type ActionType = "approve" | "reject" | "delete";

export interface UseTableActionsResult {
  handleAction: (action: ActionType, id: number) => Promise<void>;
}

export function useTableActions(onSuccess: () => void): UseTableActionsResult {
  const { toast } = useToast();

  const handleAction = useCallback(
    async (action: ActionType, id: number) => {
      let result;

      if (action === "approve") {
        result = await updateCandidaturaStatus(id, "Approvato");
      } else if (action === "reject") {
        result = await updateCandidaturaStatus(id, "Rifiutato");
      } else {
        if (!window.confirm("Sei sicuro di voler cancellare questa prenotazione?")) {
          return;
        }
        result = await deleteCandidatura(id);
      }

      if (result.success) {
        toast.success(result.message);
        onSuccess();
      } else {
        toast.error(result.message);
      }
    },
    [toast, onSuccess]
  );

  return { handleAction };
}