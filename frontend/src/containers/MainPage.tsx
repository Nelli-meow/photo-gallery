import Photos from '../features/photos/photos.tsx';


const MainPage = () => {
  return (
    <div>
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/80 bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-6">
        <Photos/>
      </div>
    </div>
  );
};

export default MainPage;
