import {Link} from "react-router-dom";
import './menu.css'
import {MovieSearch} from "../movieSearch/MovieSearch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {Genre} from "../genre/Genre.tsx";
import {UserInfo} from "../userInfo/UserInfo.tsx";

export const Menu = () => {

    const {genres} = useAppSelector(({movieSlice}) => movieSlice);

    return (
        <header>
            <nav>
                <ul>
                    <li className={"menu-link"}><Link to={'/'}>Movies</Link></li>
                    <li className={"menu-item dropdown"}>
                        <span className={"menu-link"}>Genre</span>
                        <ul className={"dropdown-menu"}>
                            {genres.map((genre) => <Genre key={genre.id} genre={genre}/>)}
                        </ul>
                    </li>
                </ul>

                <MovieSearch/>
                <UserInfo/>
            </nav>
        </header>
    );
};