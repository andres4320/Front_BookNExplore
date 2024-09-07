import Customers from "../pages/Customers"
import Welcome from "../pages/Welcome"
import Login from "../pages/Login"
import Register from "../pages/Register"
import BaseDashBoard from "../pages/layout/BaseDashBoard"
export const routes = [
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

        children:[
            {
                path:'',
                element: Customers,
            },
        ],
    },
]