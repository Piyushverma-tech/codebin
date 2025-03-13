import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <Image src="/Codebin-logo.png" alt="logo" width={45} height={45} />
      </div>

      <span className="text-xl font-bold text-violet-500">Codebin</span>
    </div>
  );
};
