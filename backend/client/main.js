import React, {StrictMode} from "react";
import  ReactDOM  from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import MainRouter from "./MainRouter.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <RouterProvider router={MainRouter} />
    </StrictMode>
)