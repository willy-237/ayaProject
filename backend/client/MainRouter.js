import React from "react";
import { createBrowserRouter,createRoutesFromElements, Route } from "react-router-dom"
import Login from "./Routes/Login/Login.js"

const MainRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
           <Route path="/" Component={Login} />
        </>
    )
)

export default MainRouter