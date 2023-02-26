import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { lazy } from 'react';
import Form from "../Form/Forms";
import WeatherPage from "../Weather/WeatherPage/WeatherPage";
import { ColContainer } from '../Containers/Containers';

export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Form />,
        },
        {
            path: '/weatherData',
            element: <WeatherPage />
        }
    ]);
    return <ColContainer>
        <RouterProvider router={router} />
    </ColContainer>;

}
