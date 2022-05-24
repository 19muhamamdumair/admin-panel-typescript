// pages
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Permissions from "./pages/Permissions";

// types
import IRoute from "./types/route.type";



export const routes: Array<IRoute> = [
    {
        key: 'home-route',
        title: 'Users',
        path: '/',
        enabled: true,
        component: Users
    },
    {
        key: 'Roles-route',
        title: 'Roles',
        path: '/Role',
        enabled: true,
        component: Roles
    },
    {
        key: 'products-route',
        title: 'Permissions',
        path: '/permissions',
        enabled: true,
        component: Permissions
    }
]