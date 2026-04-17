import { Link } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <div className="flex items-center gap-2">
      <Link
        to="/register"
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
      >
        Sign Up
      </Link>
      <Link
        to="/login"
        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Sign In
      </Link>
    </div>
  );
};

export default AnonymousMenu;