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
    <div className="max-w-sm rounded overflow-hidden shadow-lg h-full flex flex-col justify-between">
      <Button onClick={() => onOpen(_id, image || '', title)}>
        <img className="rounded-t-lg" src={imageSrc} alt={title}/>
      </Button>
      <div className="p-5 flex flex-col">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-blue-900">
          {title}
        </h5>

        <div className="flex flex-row align-items-center justify-between">
          <div className="flex flex-wrap justify-between items-center">
            <a
              href={`/photos/${username._id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-fuchsia-200 rounded-lg hover:bg-fuchsia-300 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 dark:bg-fuchsia-400 dark:hover:bg-fuchsia-300 dark:focus:ring-fuchsia-900 transition-all duration-300"
            >
              By: {displayName}
            </a>
          </div>
          {user && (user.role === 'admin' || user._id === username._id) && (
            <>
              <button onClick={() => onDelete(_id)} className="font-medium rounded text-sm px-5 py-2.5 text-center text-white bg-red-400 hover:bg-red-800 cursor-pointer transition-all duration-300">
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