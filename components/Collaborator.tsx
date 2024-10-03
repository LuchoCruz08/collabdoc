import React, { useState } from "react";
import UserTypeSelector from "./UserTypeSelector";
import { Button } from "./ui/button";
import { removeCollaborator, updateDocumentAccess } from "@/lib/actions/room.actions";
import { User, UserMinus } from 'lucide-react';

const Collaborator = ({
  roomId,
  creatorId,
  collaborator,
  email,
  user,
}: CollaboratorProps) => {
  const [userType, setUserType] = useState(collaborator.userType || "viewer");
  const [loading, setLoading] = useState(false);

  const shareDocumentHandler = async (type: string) => {
    setLoading(true);
    await updateDocumentAccess({
      roomId,
      email,
      userType: type as UserType,
      updatedBy: user,
    });
    setLoading(false);
  };

  const removeCollaboratorHandler = async (email: string) => {
    setLoading(true);
    await removeCollaborator({ roomId, email });
    setLoading(false);
  };

  return (
    <li className="flex items-center justify-between gap-2 py-3 px-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
      <div className="flex gap-3 items-center">
        <div className="bg-blue-600 rounded-full p-2">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
            {collaborator.name}
            {loading && <span className="text-xs pl-2 text-blue-300">updating...</span>}
          </p>
          <p className="text-sm font-light text-blue-200">{collaborator.email}</p>
        </div>
      </div>

      {creatorId === collaborator.id ? (
        <p className="text-sm text-blue-300 font-medium">Owner</p>
      ) : (
        <div className="flex items-center gap-2">
          <UserTypeSelector
            userType={userType as UserType}
            setUserType={setUserType || "viewer"}
            onClickHandler={shareDocumentHandler}
          />
          <Button
            type="button"
            onClick={() => removeCollaboratorHandler(collaborator.email)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
          >
            <UserMinus className="w-4 h-4" />
          </Button>
        </div>
      )}
    </li>
  );
};

export default Collaborator;