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
      className={`sm:w-[80%] w-full h-auto min-h-screen pb-6 overflow-hidden  sm:p-4 ${
        darkMode[1].isSelected ? ' bg-neutral-950 ' : 'bg-white/40'
      }`}
    >
      <TopBar />
      <NotesArea />
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
        darkMode[1].isSelected ? 'bg-zinc-900' : 'bg-gray-50 shadow-md'
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
    <div className="mt-5 flex gap-4">
      <div
        className={`${
          openContentNote ? `${isMobile ? 'w-full' : 'w-[50%]'}` : 'w-full'
        }`}
      >
        <SwiperSelection />
        <AllNotesSection />
      </div>
      <ContentNote />
    </div>
  );
}
