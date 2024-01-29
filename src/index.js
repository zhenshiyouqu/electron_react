import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./MainBoard/main";
import WordBoard from "./WordBoard/WordBoard";
import MainBoard from "./MainBoard/main";
import index from "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainBoard/>,
        },
        {
            path: '/wordboard',
            element: <WordBoard/>
        }
    ]
);

root.render(<RouterProvider router={router} />);



