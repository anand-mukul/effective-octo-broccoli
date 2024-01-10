"use client";

import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Upload } from "lucide-react";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "sonner";
function DropZone() {
  const { user } = useUser();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file readind was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;
    setLoading(true);

    const toastId = toast.loading("Uploading...");

    try {
      const docRef = await addDoc(collection(db, "users", user.id, "files"), {
        userId: user.id,
        filename: selectedFile.name,
        fullName: user.fullName,
        profileImg: user.imageUrl,
        timestamp: serverTimestamp(),
        type: selectedFile.type,
        size: selectedFile.size,
      });

      const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

      await uploadBytes(imageRef, selectedFile);

      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadURL: downloadURL,
      });
      setUploadSuccess(true);
    } catch (error) {
            toast.error("Error uploading file", {
        id: toastId,
      });
    } finally {
      setLoading(false);
      toast.success("Uploaded Successfully!", {
        id: toastId,
      });
    }
  };

  const maxSize = 1073741824; // 1GB in bytes

  return (
    <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section>
            <div
              {...getRootProps()}
              className={cn(
                  "m-10 sm:m-10 h-52 flex justify-center items-center p-5 rounded-lg text-center relative outline-dashed outline-yellow-400",
                  isDragActive ? "bg-gradient-to-br from-yellow-400 to-red-500 text-white animate-pulse"
                      : "bg-yellow-100 dark:bg-yellow-800/80 text-yellow-400",
                                )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center">
                <div className="flex border border-dashed border-yellow-400 rounded-lg p-4 mb-4">
                  <Upload size={48} strokeWidth={2} color="#F59E0B" />
                </div>
                {!isDragActive && "Click here or Drop a file to upload!"}
                {isDragActive && !isDragReject && "Drop to upload this image!"}
                {isDragReject && "File type not accepted, Sorry!"}
                {isFileTooLarge && (
                  <div className="text-red-500">File is too large!</div>
                )}
              </div>
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}

export default DropZone;
