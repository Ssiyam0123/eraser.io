import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface UpdateFileParams {
  fileId: Id<"files">;
  document: string;
}

export const useFileUpdate = () => {
  const updateFile = useMutation(api.files.updateFile);

  const update = async ({ fileId, document }: UpdateFileParams) => {
    try {
      const result = await updateFile({
        _id: fileId,
        document: document,
        edited: Date.now() // Add the required edited timestamp
      });
      return result;
    } catch (error) {
      console.error("Failed to update file:", error);
      throw error;
    }
  };

  return { update };
};