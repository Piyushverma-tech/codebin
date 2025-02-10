'use client';

import { useGlobalContext } from '@/ContextApi';
import ContentArea from './components/ContentArea/ContentArea';
import Sidebar from './components/sidebar/Sidebar';
import { Toaster } from 'react-hot-toast';
import ConfirmationWindow from './components/ConfirmationWindow';

export default function Page() {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();
  return (
    <div className="flex">
      <ConfirmationWindow />
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: darkMode[1].isSelected ? '#18181b' : '#fff',
            color: darkMode[1].isSelected ? '#fff' : '#18181b',
          },
        }}
      />
      <Sidebar />
      <ContentArea />
    </div>
  );
}
