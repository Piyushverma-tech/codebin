'use client';
import { useAuth } from '@clerk/nextjs';
import CodeIcon from '@mui/icons-material/Code';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="poppins">
      <Navbar />
      <CTASection />
    </div>
  );
}

function Navbar() {
  return (
    <div className="flex m-5 max-sm:mt-9 mx-8 items-center  justify-between max-sm:flex-col">
      <Logo />
      <Buttons />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <div className={`bg-violet-600 p-[6px] rounded-md`}>
        <CodeIcon sx={{ fontSize: 27, color: 'white' }} />
      </div>
      <div className="flex gap-1 text-[19px]">
        <span className={`font-bold text-violet-600`}>Codebin</span>
      </div>
    </div>
  );
}

function Buttons() {
  const { userId } = useAuth();
  return (
    <div className="max-sm:w-full">
      {userId ? (
        <Link href="/my-notes">
          <button
            className={`max-sm:w-full bg-violet-600 p-[8px] px-6 text-sm text-white rounded-md`}
          >
            Access The App
          </button>
        </Link>
      ) : (
        <div className="flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8">
          <Link href="/sign-in">
            <button
              className={`max-sm:w-full bg-violet-600 p-[8px] text-sm text-white rounded-md`}
            >
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button
              className={`max-sm:w-full text-sm border border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white p-[8px] px-6 rounded-md`}
            >
              Sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

function CTASection() {
  return (
    <div className="flex flex-col mx-16 items-center mt-[120px] gap-6">
      <h2 className="font-bold text-3xl text-center">
        Organize your code snippets
        <span className={`text-violet-600`}>Efficiently</span>
      </h2>
      <p className="text-center text-md w-[450px] max-sm:w-full text-slate-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quae
        repellat quaerat nam deleniti dignissimos tempore temporibus, eos,
        beatae hic voluptatum explicabo quas assumenda pariatur.
      </p>
      <button
        className={`block px-9 py-2 text-lg bg-violet-600 font-medium text-white transition focus:outline-none rounded-full`}
        type="button"
      >
        {"let's get started!"}
      </button>
    </div>
  );
}
