import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deletePhoto, fetchPhotosThunk, getUsersPhotos } from '../../features/photos/photosThunk.ts';
import { selectUser } from '../../features/users/UsersSlice.ts';
import { selectIsLoading, selectUsersPhotos } from '../../features/photos/photosSlice.ts';
import PhotosCardItem from '../../components/PhotosCardItem/PhotosCardItem.tsx';
import DialogWindow from '../../components/DIalogWindow/DialogWindow.tsx';
import PreLoader from '../../components/UI/PreLoader.tsx';


const UsersPhotos = () => {
  const {id} = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const userPhotos = useAppSelector(selectUsersPhotos);
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);
  const navigate = useNavigate();

  const [selectedPhoto, setSelectedPhoto] = useState<{ image: string, title: string } | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(getUsersPhotos(id));
    }
  }, [dispatch, id]);

  const onDelete = async (photoId: string) => {
    await dispatch(deletePhoto(photoId));
    if (id) {
      dispatch(getUsersPhotos(id));
    }
    dispatch(fetchPhotosThunk());
  };

  const onCloseWindow = () => {
    setSelectedPhoto(null);
  };

  const onOpenWindow = (_id: string, image: string, title: string) => {
    setSelectedPhoto({image, title});
  };

  const handlePhoto = () => {
    navigate('/photoCards/new');
  };

  const isOwner = user?._id === id;
  const galleryName = userPhotos[0]?.username.displayName || (isOwner ? user?.displayName : '');

  return (
    <div className="mx-auto max-w-6xl rounded-2xl border border-white/80 bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-6">
      {isLoading ? (
        <PreLoader/>
      ) : (
        <div className="mb-5 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          {galleryName && (
            <h3 className="my-1 text-3xl font-bold tracking-tight text-slate-800">{galleryName} gallery</h3>
          )}
          {isOwner && (
            <button
              onClick={handlePhoto}
              className="relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-rose-500 to-pink-500 p-0.5 text-sm font-medium text-white transition hover:shadow-md focus:outline-none focus:ring-4 focus:ring-rose-200">
              <span
                className="cursor-pointer relative rounded-md bg-white px-5 py-2.5 text-rose-600 transition-all ease-in duration-75 hover:bg-transparent hover:text-white">Add new Photo</span>
            </button>
          )}
        </div>
      )}

      {!isLoading && userPhotos.length === 0 ? (
        <>
          <p className="rounded-xl bg-slate-50 p-6 text-center text-slate-500">No photos here yet :(</p>
        </>
      ) : (
        <>
          {!isLoading && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {userPhotos.map((photo) => (
              <div key={photo._id}>
                <PhotosCardItem
                  _id={photo._id}
                  image={photo.image}
                  onDelete={onDelete}
                  title={photo.title}
                  username={photo.username}
                  displayName={photo.username.displayName}
                  onOpen={onOpenWindow}
                />
              </div>

            ))}
            </div>
          )}
        </>
      )}

      {selectedPhoto && (
        <DialogWindow
          image={selectedPhoto.image}
          title={selectedPhoto.title}
          onClose={onCloseWindow}
        />
      )}
    </div>
  );
};

export default UsersPhotos;