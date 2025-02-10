'use client';

import { useGlobalContext } from '@/ContextApi';
import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';

const UserButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.UserButton),
  { ssr: false }
);

function ProfileUser() {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const { user } = useUser();

  const loadingImage = (
    <div className="w-9 h-9 rounded-full mb-[5px] bg-slate-200"></div>
  );

  const loadinguserName = (
    <span className=" font-semibold bg-slate-200 rounded-md h-4 w-[100px]"></span>
  );

  const loadingUserEmail = (
    <span className="text-slate-500 text-[11px] bg-slate-200 h-2 rounded-md w-[130px]"></span>
  );

  return (
    <div className="flex gap-3 items-center">
      {!user ? (
        loadingImage
      ) : (
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: 'w-9 h-9',
            },
          }}
        />
      )}

      <div
        className={`flex flex-col text-sm ${
          !user ? 'gap-1' : ''
        } max-md:hidden`}
      >
        {!user ? (
          loadinguserName
        ) : (
          <span
            className={`font-semibold ${
              darkMode[1].isSelected ? 'text-slate-200' : 'text-zinc-600'
            }`}
          >
            {user?.firstName} {user?.lastName}
          </span>
        )}

        {!user ? (
          loadingUserEmail
        ) : (
          <span
            className={` text-[11px] ${
              darkMode[1].isSelected ? 'text-slate-300' : 'text-zinc-600'
            }`}
          >
            {user?.emailAddresses[0].emailAddress}
          </span>
        )}
      </div>
    </div>
  );
}

export default ProfileUser;
