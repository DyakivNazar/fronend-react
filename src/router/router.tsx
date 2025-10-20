import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {MovieInfoPage} from "../pages/MovieInfoPage.tsx";
import {MoviesPage} from "../pages/MoviesPage.tsx";

export const router = createBrowserRouter(
    [{
        path: '/', element: <MainLayout/>,
        children: [
            {index: true, element: <MoviesPage/>},
            {path: 'movies/:id', element: <MovieInfoPage/>},
        ]
    }]
)