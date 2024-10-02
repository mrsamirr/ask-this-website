import s from './Navbar.module.css';
import Navlinks from './Navlinks';

export default async function Navbar() {

    return (
        <nav className={s.root}>
            <div className="max-w-6xl px-6 mx-auto">
                <Navlinks />
            </div>
        </nav>
    );
}