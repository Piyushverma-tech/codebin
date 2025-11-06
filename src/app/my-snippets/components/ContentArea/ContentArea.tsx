'use client';
import { useGlobalContext } from '@/ContextApi';
import DarkMode from './TopBar/DarkMode';
import ProfileUser from './TopBar/ProfileUser';
import SearchBar from './TopBar/SearchBar';
import SidebarMenuIcon from './TopBar/SideBarMenuIcon';
import SwiperSelection from './NotesArea/SwiperSelection';
import AllNotesSection from './NotesArea/AllNotesSection';
import TagsWindow from '../TagsWindow/TagsWindow';
import AddTagWindow from '../TagsWindow/AddTagWindow';
import ContentNote from '../NotePad/NotePad';

function ContentArea() {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();
  return (
    <div
      className={`sm:w-[80%] w-full h-screen flex flex-col overflow-hidden ${
        darkMode[1].isSelected ? ' bg-black/95 ' : 'bg-white/40'
      }`}
    >
      <div className="sticky top-0 z-30 px-4 mt-4">
        <TopBar />
      </div>
      <div className="flex-1 overflow-hidden">
        <NotesArea />
      </div>
      <TagsWindow />
      <AddTagWindow />
    </div>
  );
}

export default ContentArea;

function TopBar() {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();
  return (
    <div
      className={`rounded-xl flex justify-between items-center  p-3 ${
        darkMode[1].isSelected
          ? 'sm:bg-zinc-900/50 border-2 border-zinc-900 '
          : 'bg-gray-50 shadow-md'
      }`}
    >
      <ProfileUser />
      <SearchBar />
      <div className="flex gap-4 items-center">
        <div className="max-md:hidden">
          <DarkMode />
        </div>
        <SidebarMenuIcon />
      </div>
    </div>
  );
}

function NotesArea() {
  const {
    openContentNoteObject: { openContentNote },
    isMobileObject: { isMobile },
  } = useGlobalContext();
  return (
    <div className="mt-4 flex gap-4 h-full">
      <div
        className={`${
          openContentNote ? `${isMobile ? 'w-full' : 'w-[540px]'}` : 'w-full'
        } h-full flex flex-col overflow-hidden`}
      >
        <div className={`sticky top-0 z-20 px-4`}>
          <SwiperSelection />
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          <AllNotesSection />
        </div>
      </div>
      <ContentNote />
    </div>
  );
}
