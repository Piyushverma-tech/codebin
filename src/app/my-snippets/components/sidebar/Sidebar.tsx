'use client';

import { useGlobalContext } from '@/ContextApi';
import { useUser } from '@clerk/nextjs';
import { useAuth } from '@clerk/clerk-react';
import { LogOutIcon, X } from 'lucide-react';
import DarkMode from '../ContentArea/TopBar/DarkMode';
import getLanguageIcon from '@/app/utils/languageTextToIcon';
import dynamic from 'next/dynamic';
import { Logo } from '../Logo/Logo';
const UserButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.UserButton),
  { ssr: false }
);

export default function Sidebar() {
  const {
    darkModeObject: { darkMode },
    openSideBarObject: { openSideBar, setOpenSideBar },
  } = useGlobalContext();
  const { user } = useUser();

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-0 left-0 h-screen 
        ${openSideBar ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-all duration-300 ease-in-out
        w-[280px] md:w-[300px] lg:w-[20%] p-6 flex flex-col gap-2 border-r z-40
        backdrop-blur-xl 
        ${
          darkMode[1].isSelected
            ? 'bg-neutral-950 border-zinc-800 shadow-2xl shadow-violet-500/5'
            : 'bg-white border-slate-200 shadow-lg shadow-slate-300/50'
        }`}
      >
        <div className="flex justify-between">
          <X
            onClick={() => setOpenSideBar(!openSideBar)}
            className="text-slate-500 text-3xl size-5 cursor-pointer hidden max-sm:block"
          />
          <div className="max-md:flex hidden">
            <DarkMode />
          </div>
        </div>

        {/* Logo Container */}
        <div className="flex items-center justify-center pr-2 mt-4 mb-8">
          <Logo />
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col gap-8">
          <QuickLinks />
          <Languages />
        </div>

        {/* Footer */}
        <div
          className={`mt-auto pt-6 border-t ${
            darkMode[1].isSelected ? 'border-zinc-800' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3 px-2 py-3">
            <UserButton />
            <div className="flex-1">
              <p
                className={`text-sm font-medium ${
                  darkMode[1].isSelected ? 'text-slate-200' : 'text-slate-900'
                }`}
              >
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-slate-500">Premium User</p>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {openSideBar && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpenSideBar(false)}
        />
      )}
    </>
  );
}

function QuickLinks() {
  const {
    sideBarMenuObject: { sideBarMenu, setSideBarMenu },
    openSideBarObject: { setOpenSideBar },
    tagsMenuObject: { tagsMenu },
    openTagsWindowObject: { setOpenTagsWindow },
    openContentNoteObject: { setOpenContentNote },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const { signOut } = useAuth();

  function clickedMenu(index: number) {
    const updateSideBarMenu = sideBarMenu.map((menu, i) => ({
      ...menu,
      isSelected: i === index,
    }));
    setSideBarMenu(updateSideBarMenu);
  }

  return (
    <div className="space-y-4">
      <div
        className={`text-xs font-medium uppercase tracking-wider px-3
        ${darkMode[1].isSelected ? 'text-slate-400' : 'text-slate-500'}`}
      >
        Quick Links
      </div>
      <ul className="space-y-1 px-2">
        {sideBarMenu.map((menu, index) => (
          <li
            key={index}
            onClick={() => {
              clickedMenu(index);
              setOpenSideBar(false);
            }}
            className={`flex cursor-pointer select-none gap-3 items-center px-3 py-2.5 rounded-lg
            transition-all duration-200
            ${
              menu.isSelected
                ? 'bg-violet-500 text-white  shadow-lg shadow-violet-500/30'
                : `text-slate-500 hover:bg-slate-100 
                   ${
                     darkMode[1].isSelected
                       ? 'hover:bg-zinc-800 hover:text-slate-300'
                       : 'hover:text-slate-800 '
                   }`
            }`}
          >
            {menu.icons}
            <span className="text-sm font-medium">{menu.name}</span>
          </li>
        ))}
        {tagsMenu.map((menu, index) => (
          <li
            key={index}
            onClick={() => {
              setOpenTagsWindow(true);
              setOpenContentNote(false);
              setOpenSideBar(false);
            }}
            className={`flex cursor-pointer select-none gap-3 items-center px-3 py-2.5 rounded-lg
          transition-all duration-200
          ${
            menu.isSelected
              ? 'bg-violet-500 text-white  shadow-lg shadow-violet-500/30'
              : `text-slate-500 hover:bg-slate-100 
                 ${
                   darkMode[1].isSelected
                     ? 'hover:bg-zinc-800 hover:text-slate-300'
                     : 'hover:text-slate-800 '
                 }`
          }`}
          >
            {menu.icons}
            <span className="text-sm font-medium">{menu.name}</span>
          </li>
        ))}
      </ul>
      <div
        onClick={() => signOut()}
        className={`flex cursor-pointer select-none gap-3 text-slate-500 hover:bg-slate-100  items-center px-5 py-2.5 mt-5 rounded-lg
            transition-all duration-200 ${
              darkMode[1].isSelected
                ? 'hover:bg-zinc-800 hover:text-slate-300'
                : 'hover:text-slate-800 '
            } `}
      >
        <LogOutIcon className="text-slate-500  size-5 cursor-pointer" />
        <span className="text-sm font-medium ">Logout</span>
      </div>
    </div>
  );
}

function Languages() {
  const {
    darkModeObject: { darkMode },
    codeLanguagesCounterObject: { codeLanguagesCounter },
  } = useGlobalContext();

  return (
    <div className="space-y-4">
      {codeLanguagesCounter.length > 0 && (
        <>
          <div
            className={`text-xs font-medium uppercase tracking-wider px-3
        ${darkMode[1].isSelected ? 'text-slate-400' : 'text-slate-500'}`}
          >
            Languages
          </div>
          <div className="space-y-2 px-2">
            {codeLanguagesCounter.map((language, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200
            ${
              darkMode[1].isSelected
                ? 'bg-zinc-900/50 hover:bg-zinc-800'
                : 'bg-gray-100 hover:bg-slate-100'
            }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded ${
                      darkMode[1].isSelected
                        ? 'bg-zinc-800 text-slate-300'
                        : 'bg-gray-200 text-slate-600'
                    }`}
                  >
                    {getLanguageIcon(
                      capitalizeFirstOccurrence(language.language)
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium
                ${
                  darkMode[1].isSelected ? 'text-slate-300' : 'text-slate-600'
                }`}
                  >
                    {capitalizeFirstOccurrence(language.language)}
                  </span>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full
              ${
                darkMode[1].isSelected
                  ? 'bg-zinc-800 text-slate-300'
                  : 'bg-gray-200 text-slate-600'
              }`}
                >
                  {language.count}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function capitalizeFirstOccurrence(str: string): string {
  if (!str) return str; // Return empty string if input is empty

  for (let i = 0; i < str.length; i++) {
    if (/[a-zA-Z]/.test(str[i])) {
      // Check if character is a letter
      return str.slice(0, i) + str[i].toUpperCase() + str.slice(i + 1);
    }
  }

  return str;
}
