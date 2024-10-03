import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="loader flex items-center justify-center space-x-2 text-blue-500">
      <Loader2 className="animate-spin w-6 h-6" />
      <span className="text-lg font-semibold">Loading...</span>
    </div>
  );
};

export default Loader;
