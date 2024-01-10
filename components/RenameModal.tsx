import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useAppStore } from "@/store";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "sonner";

function RenameModal() {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.filename,
    ]);

  const renameFile = async () => {
    if (!user || !fileId || !input.trim()) return;

    const toastId = toast.loading("Renaming...");

    try {
      await updateDoc(doc(db, "users", user.id, "files", fileId), {
        filename: input,
      });

      toast.success("Renamed Successfully", {
        id: toastId,
      });
      setInput("");
      setIsRenameModalOpen(false);
    } catch (error) {
      console.error("Error renaming file:", error);
      toast.error("Error renaming file", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md sm:m-3 p-6 bg-yellow-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-yellow-100">
        <DialogHeader>
          <DialogTitle className="flex justify-start pb-2 text-lg font-semibold text-White">
            Rename File
          </DialogTitle>
        </DialogHeader>
        <Input
          id="filename"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter new filename"
          className="mt-3 p-2 rounded border bg-gray-300 border-gray-300 focus:outline-none focus:border-blue-600 text-black font-bold font-inter text-md placeholder-gray-800"
        />
        <div className="flex justify-end space-x-3 mt-5">
          <Button
            size="sm"
            className="px-3 text-gray-600 hover:text-gray-800"
            variant={"secondary"}
            onClick={() => setIsRenameModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            className={`px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md ${
              !input.trim() && "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => renameFile()}
            disabled={!input.trim()}
          >
            Rename
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );  
}

export default RenameModal;
