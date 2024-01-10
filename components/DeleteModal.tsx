"use Client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "sonner";

export function DeleteModal() {
  const { user } = useUser();
  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    fileId,
    setFileId,
  ] = useAppStore((state) => [
    state.isDeleteModalOpen,
    state.setIsDeleteModalOpen,
    state.fileId,
    state.setFileId,
  ]);

  async function deleteFile() {
    if (!user || !fileId) {
      // Handle missing user or fileId
      return toast.error("User or file not found!");
    }

    const toastId = toast.loading("Deleting...");

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      await deleteObject(fileRef);
      await deleteDoc(doc(db, "users", user.id, "files", fileId));

      toast.success("Deleted Successfully", { id: toastId });
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Error deleting document", { id: toastId });
    } finally {
      setIsDeleteModalOpen(false);
    }
  }

  return (
    <Dialog
  modal
  open={isDeleteModalOpen}
  onOpenChange={(isOpen) => {
    setIsDeleteModalOpen(isOpen);
  }}
>
  <DialogContent className="sm:max-w-md sm:m-3 p-6 bg-yellow-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-yellow-100">
    <DialogHeader>
      <DialogTitle className="flex justify-start text-lg font-semibold pb-2 text-white">
        Confirm Deletion
      </DialogTitle>
      <DialogDescription className="text-sm text-gray-200 flex justify-start">
        This will permanently delete your file!
      </DialogDescription>
    </DialogHeader>

    <div className="flex justify-end mt-5 gap-4">
      <Button
        size="sm"
        className="px-4 mr-2"
        variant={'secondary'}
        onClick={() => setIsDeleteModalOpen(false)}
      >
        Cancel
      </Button>
      <Button
        type="button"
        variant={'destructive'}
        size="sm"
        className="px-4"
        onClick={() => deleteFile()}
      >
        Delete
      </Button>
    </div>
  </DialogContent>
</Dialog>

  );
}
