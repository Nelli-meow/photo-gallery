import { apiURL } from '../../globalConstants.ts';
import NoPic
  from '../../assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
import React from 'react';
import { selectUser } from '../../features/users/UsersSlice.ts';
import { useAppSelector } from '../../app/hooks.ts';
import { Button } from '@mui/material';


interface PhotoProps {
  username: { _id: string },
  image?: string | null;
  title: string;
  _id: string;
  displayName?: string;
  onDelete: (id: string) => void;
  onOpen: (id: string, image: string, title: string) => void;
}

const PhotosCardItem: React.FC<PhotoProps> = ({username, image, _id, title, displayName, onDelete, onOpen}) => {
  const imageSrc = image ? `${apiURL}/${image}` : NoPic;
  const user = useAppSelector(selectUser);

  return (
    <div className="h-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition hover:-translate-y-0.5 hover:shadow-xl">
      <Button onClick={() => onOpen(_id, image || '', title)} className="!block !w-full !p-0">
        <img className="h-56 w-full rounded-t-2xl object-cover" src={imageSrc} alt={title}/>
      </Button>
      <div className="flex flex-col p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-slate-800">
          {title}
        </h5>

        <div className="mt-2 flex flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center justify-between">
            <a
              href={`/photos/${username._id}`}
              className="inline-flex items-center rounded-full bg-rose-100 px-3 py-2 text-sm font-medium text-rose-700 transition-all duration-300 hover:bg-rose-200"
            >
              By: {displayName}
            </a>
          </div>
          {user && (user.role === 'admin' || user._id === username._id) && (
            <>
              <button onClick={() => onDelete(_id)} className="cursor-pointer rounded-full bg-red-500 px-4 py-2 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-red-600">
                delete photo
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default PhotosCardItem;