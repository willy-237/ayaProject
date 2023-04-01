import React from "react";
import { createBrowserRouter,createRoutesFromElements, Route } from "react-router-dom"
import Login from "./Routes/Login/Login.js"
import Loader from "./Routes/Loader/Loader.js";
import Tours from "./Components/Tours/Tours.js";
import FormTour from "./Routes/Form/createTour/FormTour.js";
import Profile from "./Routes/Profile/Profile.js";

const Test = () => {
    return(
        <div>Hello World</div>
    )
}
const MainRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
           <Route path="/" Component={Login} />
           <Route path="/loader" Component={Loader}/>
           <Route path="/div" Component={Test}/>
           <Route path="/tours" Component={Tours} />
           <Route path="/createtour" Component={FormTour} />
           <Route path="/profile" Component={Profile} />
        </>
    )
)

export default MainRouter