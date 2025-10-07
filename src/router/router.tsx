import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {MoviesPage} from "../pages/MoviesPage.tsx";

export const router = createBrowserRouter(
    [{
        path: '/',element:<MainLayout/>,
        children:[
            {path: 'movies', element:<MoviesPage/>},
        ]
    }]
)