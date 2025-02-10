import { Box } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-violet-600 p-2 rounded-lg">
        <Box className="w-6 h-6 text-white" />
      </div>
      <span className="text-xl font-bold text-violet-600">Codebin</span>
    </div>
  );
};
