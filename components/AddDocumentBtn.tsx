"use client";

import { createDocument } from "@/lib/actions/room.actions";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();

  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });
      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      type="submit"
      onClick={addDocumentHandler}
      className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white flex items-center gap-2 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      <PlusCircle className="w-5 h-5" />
      <p className="hidden sm:block">Start a blank document</p>
    </Button>
  );
};

export default AddDocumentBtn;
