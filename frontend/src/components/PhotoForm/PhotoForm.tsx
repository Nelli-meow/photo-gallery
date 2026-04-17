import React, { useCallback, useState } from 'react';
import { IPhotoMutation } from '../../types';
import { useNavigate } from 'react-router-dom';
import FileInput from '../FileInput/FileInput.tsx';


export interface Props {
  onSubmit: (photo: IPhotoMutation) => void;
}

const initialState = {
  title: '',
  image: null,
};

const PhotoForm: React.FC<Props> = ({onSubmit}) => {
  const [photo, setPhoto] = useState<IPhotoMutation>(initialState);
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);


  const onSubmitPhoto = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo.title.trim() || !photo?.image) {
      alert('Please fill in all fields: title, image');
      return;
    }

    onSubmit({...photo});
    setPhoto(initialState);
    navigate('/');
  };

  const inputChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setPhoto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files && files[0]) {
      const file = files[0];

      setPhoto(prevState => ({
        ...prevState,
        [name]: file,
      }));

      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mx-auto mt-3 max-w-lg rounded-2xl border border-white/70 bg-white/95 p-6 shadow-xl shadow-slate-200/80">
      <h2 className="mb-5 text-center text-2xl font-semibold text-slate-800">Add New Photo</h2>
      <form onSubmit={onSubmitPhoto} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block font-medium text-slate-700">
            Photo`s title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={photo.title}
            onChange={inputChangeHandler}
            required
            placeholder="Enter title"
            className="w-full rounded-lg border border-slate-200 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
        </div>
        <div>
          <label htmlFor="photo" className="mb-1 block font-medium text-slate-700">
            Photo
          </label>

          <FileInput name="image" label="Image" onGetFile={getImage}/>
          {preview && (
            <div className="mt-4 flex justify-center">
              <img
                src={preview}
                alt="preview"
                className="h-20 object-contain rounded-lg border"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-rose-500 px-4 py-2 font-bold text-white transition hover:bg-rose-600"
        >
          Add Photo
        </button>
      </form>
    </div>

  );
};

export default PhotoForm;