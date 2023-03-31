import React, {StrictMode} from "react";
import  ReactDOM  from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import MainRouter from "./MainRouter.js";
import "./main.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; 


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <StrictMode> 
        <RouterProvider router={MainRouter} />
    </StrictMode> 
    
)