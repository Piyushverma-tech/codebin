import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
const SignUpPage = () => {
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

  const RecruiterMessage = () => (
    <div className="absolute top-6 left-6 z-10 p-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-md">
      <div className="text-base text-gray-600 mb-2">Recruiter/Tester?</div>
      <div className="text-sm text-gray-800 mb-2">
        Skip signup - use demo account instead
      </div>
      <Link
        href="/sign-in"
        className="inline-block text-xs p-2 bg-violet-500 text-white px-3 py-1.5 rounded hover:bg-violet-600 transition-colors"
      >
        Go to Sign In →
      </Link>
    </div>
  );
  return (
    <div className={`w-full h-screen flex justify-center items-center`}>
      <RecruiterMessage />
      <TechGrid />
      <SignUp />
    </div>
  );
};

export default SignUpPage;
