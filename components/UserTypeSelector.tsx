/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Edit2 } from "lucide-react";

const UserTypeSelector = ({
  userType,
  setUserType,
  onClickHandler,
}: UserTypeSelectorParams) => {
  const accessChangeHandler = (type: UserType) => {
    setUserType(type);
    onClickHandler && onClickHandler(type);
  };

  return (
    <Select
      value={userType}
      onValueChange={(type: UserType) => accessChangeHandler(type)}
    >
      <SelectTrigger className="bg-transparent border-none text-white min-w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-none bg-gray-800 text-white">
        <SelectItem value="viewer" className="flex items-center space-x-2 hover:bg-gray-700 transition-colors">
          <Eye className="w-4 h-4 text-blue-400" />
          <span>Can view</span>
        </SelectItem>
        <SelectItem value="editor" className="flex items-center space-x-2 hover:bg-gray-700 transition-colors">
          <Edit2 className="w-4 h-4 text-green-400" />
          <span>Can edit</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserTypeSelector;