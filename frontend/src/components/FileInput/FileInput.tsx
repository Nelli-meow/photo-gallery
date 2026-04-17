import * as React from 'react';
import { useRef, useState } from 'react';

interface FileInputProps {
  name: string;
  label: string;
  onGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({name, label, onGetFile}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const activateInput = () => {
    if(inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }

    onGetFile(e);
  };

  return (
    <div className="mb-4">
      <input
        className="hidden"
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />

      <div className="flex items-center space-x-2">
        <input
          className="w-full cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
          value={fileName}
          placeholder={label}
          onClick={activateInput}
          disabled
        />
        <button
          type="button"
          onClick={activateInput}
          className="rounded-lg bg-slate-800 px-4 py-2 font-bold whitespace-nowrap text-white transition hover:bg-slate-700"
        >
          Add Photo
        </button>
      </div>
    </div>

  );
};

export default FileInput;