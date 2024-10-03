"use client";

import { useState } from "react";
import { deleteDocument } from "@/lib/actions/room.actions";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Trash2, AlertTriangle } from "lucide-react";

export const DeleteModal = ({ roomId }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteDocumentHandler = async () => {
    setLoading(true);
    try {
      await deleteDocument(roomId);
      setOpen(false);
    } catch (error) {
      console.log("Error notif:", error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="min-w-9 rounded-xl bg-transparent p-2 transition-all hover:bg-red-500 hover:bg-opacity-20">
          <Trash2 className="w-5 h-5 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-white border border-gray-700">
        <DialogHeader>
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <DialogTitle className="text-2xl font-bold text-center">
            Delete Document
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Are you sure you want to delete this document? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-8 flex justify-end space-x-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="bg-gray-700 text-white hover:bg-gray-600"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={deleteDocumentHandler}
            className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
