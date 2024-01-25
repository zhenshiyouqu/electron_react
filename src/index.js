import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./WordBoard/main";
import WordBoard from "./WordBoard/WordBoard";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
    [
        {

            path: '/',
            element: <Main/>
        },
        {
            path: '/wordboard',
            element: <WordBoard/>
        }
    ]
);

root.render(<RouterProvider router={router} />);



