import { useGlobalContext } from '@/ContextApi';
import { Menu, X } from 'lucide-react';

function SidebarMenuIcon() {
  const {
    openSideBarObject: { openSideBar, setOpenSideBar },
  } = useGlobalContext();
  return (
    <>
      {!openSideBar ? (
        <Menu
          size={24}
          onClick={() => setOpenSideBar(!openSideBar)}
          className="text-slate-500 cursor-pointer hidden max-sm:block"
        />
      ) : (
        <X
          size={24}
          onClick={() => setOpenSideBar(!openSideBar)}
          className="text-slate-500 cursor-pointer hidden max-sm:block"
        />
      )}
    </>
  );
}

export default SidebarMenuIcon;
