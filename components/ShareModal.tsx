"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSelf } from "@liveblocks/react/suspense";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import UserTypeSelector from "./UserTypeSelector";
import Collaborator from "./Collaborator";
import { updateDocumentAccess } from "@/lib/actions/room.actions";
import { Share2 } from "lucide-react";

const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const user = useSelf();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");

  const shareDocumentHandler = async () => {
    setLoading(true);

    await updateDocumentAccess({
      roomId,
      email,
      userType: userType as UserType,
      updatedBy: user.info,
    });

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white flex h-9 gap-1 px-4 items-center rounded-lg transition-all duration-300"
          disabled={currentUserType !== "editor"}
        >
          <Share2 className="w-5 h-5" />
          <p className="mr-1 hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-white border border-gray-700 p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2">Manage Collaborators</DialogTitle>
          <DialogDescription className="text-gray-400">
            Invite users to view or edit this document
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="email" className="mt-6 text-blue-300 block mb-2">
          Email address
        </Label>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 rounded-md bg-gray-800 overflow-hidden">
            <Input
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-none text-white placeholder-gray-500 flex-grow"
            />
            <UserTypeSelector userType={userType} setUserType={setUserType} />
          </div>
          <Button
            type="submit"
            onClick={shareDocumentHandler}
            className="bg-blue-600 hover:bg-blue-700 text-white flex h-full gap-1 px-5 rounded-md transition-colors"
            disabled={loading}
          >
            {loading ? "Sending..." : "Invite"}
          </Button>
        </div>

        <div className="my-6 space-y-2 max-h-60 overflow-y-auto">
          <ul className="flex flex-col space-y-2">
            {collaborators.map((collaborator) => (
              <Collaborator
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={collaborator.email}
                collaborator={collaborator}
                user={user.info}
              />
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;