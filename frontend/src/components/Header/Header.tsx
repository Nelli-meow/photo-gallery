import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../features/users/UsersSlice.ts';
import AnonymousMenu from '../UI/AnonymousMenu.tsx';
import UserMenu from '../UI/UserMenu.tsx';

const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-white/80 text-slate-800 shadow-sm backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold tracking-tight text-rose-500 transition hover:text-rose-600 md:text-2xl">
          Photo Gallery :3
        </Link>
        <div>
          {user ? <UserMenu user={user}/> : <AnonymousMenu/>}
        </div>
      </div>
    </header>
  );
};

export default Header;