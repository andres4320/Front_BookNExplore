import Customers from "../pages/Customers"
import Welcome from "../pages/Welcome"
import Login from "../pages/Login"
import Register from "../pages/Register"
import BaseDashBoard from "../pages/layout/BaseDashBoard"

type TypeRoute = {
    path: string;
    element: any;
    isProtected?: boolean;
    children?: TypeRoute[];
}

export const routes: TypeRoute[] = [
    {
        path: '/',
        element: Welcome,
    },
    {
        path: '/login',
        element: Login,
    },
    {
        path: '/register',
        element: Register,
    },
    {
        path: '/dashboard',
        element: BaseDashBoard,
        isProtected: true,

        children:[
            {
                path:'',
                element: Customers,
            },
        ],
    },
]