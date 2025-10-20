import type {FC} from "react";
import "./starsrating.css"

type StarsRatingType = {
    value: number;
};

export const StarsRating: FC<StarsRatingType> = ({value}) => {
    const stars = [];
    const max = 5;

    for (let i = 1; i <= max; i++) {
        if (i <= value) {
            stars.push(<span key={i} className={"stars_gold"}>★</span>);
        } else {
            stars.push(<span key={i} className={"stars_withe"}>★</span>);
        }
    }

    return (
        <div>
            {stars}
            <span className={"stars_value"}>{value.toFixed(1)}</span>
        </div>
    );
};
