// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";

// types
import IRoute from "./types/route.type";



export const routes: Array<IRoute> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'about-route',
        title: 'About',
        path: '/Role',
        enabled: true,
        component: About
    },
    {
        key: 'products-route',
        title: 'Products',
        path: '/permissions',
        enabled: true,
        component: Products
    }
]