import Link from "next/link";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div
      className={cn(
        "header bg-gray-900 p-4 flex items-center justify-between",
        className
      )}
    >
      <Link href="/" className="md:flex-1 flex items-center">
        <FileText className="hidden md:block text-blue-500 w-8 h-8 mr-2" />
        <span className="text-white font-bold text-xl">CollabDoc</span>
        <FileText className="md:hidden text-blue-500 w-6 h-6 mr-2" />
      </Link>
      {children}
    </div>
  );
};

export default Header;
