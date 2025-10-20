import type {FC} from "react";
import type {IGenre} from "../../models/IGenre.ts";
import {useNavigate} from "react-router-dom";
import {Badge} from "reactstrap";

type GenreType = {
    genre: IGenre
}

export const Genre: FC<GenreType> = ({genre}) => {
    const navigate = useNavigate();

    const handleGenreClick = (name: string) => {
        navigate(`/?genre=${name}`);
    };
    return (
        <li>
            <Badge onClick={() => handleGenreClick(genre.name)}>
                {genre.name}
            </Badge>
        </li>
    );
};