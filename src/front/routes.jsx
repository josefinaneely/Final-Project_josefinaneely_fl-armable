// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Landingpage } from "./pages/Landingpage";
import { Login } from "./pages/Login";
import { Userpage } from "./pages/Userpage";
import { Signup } from "./pages/Signup";
import Chathistoria from "./pages/Chathistoria";
import Chatciencia from "./pages/Chatciencia";
import Historial from "./pages/Historial";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Landingpage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/userpage" element={<Userpage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chatciencia" element={<Chatciencia />} />
      <Route path="/chathistoria" element={<Chathistoria />} />
      <Route path="/historial" element={<Historial />} />

      {/* Outlet component renders the matched child route */}
    </Route>
  )
);