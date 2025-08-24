'use-client';

import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  const TechGrid = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main grid lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgb(59 130 246 / 0.3)"
              strokeWidth="1"
            />
          </pattern>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(59 130 246 / 0)" />
            <stop offset="50%" stopColor="rgb(59 130 246 / 0.6)" />
            <stop offset="100%" stopColor="rgb(59 130 246 / 0)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );

  const DemoCredentialsBox = () => (
    <div className="absolute top-6 left-6 z-10 p-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-md">
      <div className="text-base text-gray-600 mb-2">Demo credentials:</div>
      <div className="text-sm text-gray-800 space-y-1">
        <div>
          <span className="font-medium">Email:</span> project.demo.acc@gmail.com
        </div>
        <div>
          <span className="font-medium">Password:</span> codebin.demo
        </div>
      </div>
    </div>
  );
  return (
    <div className={`w-full h-screen flex justify-center items-center`}>
      <TechGrid />
      <DemoCredentialsBox />
      <SignIn />
    </div>
  );
};

export default SignInPage;
