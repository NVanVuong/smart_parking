import { Link } from 'react-router-dom';
import { useAuth } from '~/hooks/auth';
import AccountBadge from './AccountBadge';
import smart_parking_rec from '../assets/images/smart_parking_rec.png';

function Header() {
    const auth = useAuth();

    return (
        <header className="flex items-center justify-between pl-4 pr-4 shadow-md md:pr-8 md:shadow-none">
            <Link to="/" className="block border-0 bg-transparent bg-contain bg-no-repeat p-0">
                <img src={smart_parking_rec} alt="Best Parking Logo" className="h-16 w-auto" />
            </Link>
            <nav role="navigation" className="flex flex-row items-center">
                {!auth.token ? (
                    <>
                        <Link
                            to="/login"
                            className="mr-2 rounded py-3.5 px-2.5 text-xs  font-bold tracking-wider text-blue-main duration-300 hover:ring-4 hover:ring-blue-main-ring md:mr-6"
                        >
                            LOG IN
                        </Link>
                        <Link
                            to="/signup"
                            className="mr-2 rounded border-2 border-solid border-blue-main py-3.5 px-2.5 text-center text-xs font-medium uppercase leading-none tracking-wider text-blue-main duration-300 hover:ring-4 hover:ring-blue-main-ring"
                        >
                            SIGN UP
                        </Link>
                    </>
                ) : (
                    <AccountBadge auth={auth} />
                )}
            </nav>
        </header>
    );
}

export default Header;
