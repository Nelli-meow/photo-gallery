import React from 'react';
import { apiURL } from '../../globalConstants.ts';
import NoPic from '../../assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

interface props {
  image?: string | null;
  title: string;
  onClose: () => void;
}
const DialogWindow: React.FC<props> = ({image, title, onClose}) => {
  const imageSrc = image ? `${apiURL}/${image}` : NoPic;

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div onClick={(e) => e.stopPropagation()} className="relative mx-4 w-full max-w-4xl rounded-2xl bg-white p-5 shadow-2xl">
        <img
          className="h-auto max-h-[70vh] w-full rounded-xl object-contain"
          src={imageSrc}
          alt={title}
        />
        <div className="flex flex-grow flex-col items-center p-3">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-full px-4 py-1 text-3xl font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogWindow;