'use client';
import { useGlobalContext } from '@/ContextApi';

function DarkMode() {
  const {
    darkModeObject: { darkMode, setDarkMode },
  } = useGlobalContext();

  function handleClickedDarkMode(index: number) {
    const updateDarkModeObject = darkMode.map((item, i) => ({
      ...item,
      isSelected: i === index,
    }));
    setDarkMode(updateDarkModeObject);
  }

  return (
    <div
      className={`rounded-full  h-[16px] w-[38px] sm:h-[20px] sm:w-[65px] md:h-[36px] md:w-[74px] 
      flex items-center gap-1 sm:gap-2 pl-[1px] sm:pl-[2px] md:pl-[5px] 
      ${darkMode[1].isSelected ? 'bg-neutral-800' : 'bg-neutral-200'}`}
    >
      {darkMode.map((item, index) => (
        <div
          key={index}
          onClick={() => handleClickedDarkMode(index)}
          className={`
            ${
              item.isSelected
                ? 'bg-violet-500 text-white'
                : 'bg-slate-100 text-violet-600'
            }
            w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 
            flex items-center justify-center 
            rounded-full p-1 cursor-pointer select-none
          `}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}

export default DarkMode;
