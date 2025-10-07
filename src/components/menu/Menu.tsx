import {Link} from "react-router-dom";

export const Menu = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to={'movies'}>movies</Link></li>
                </ul>
            </nav>
        </header>
    );
};