import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home";
import { MenuPage } from "./pages/menu";
import { OrderPage } from "./pages/order";

const router = createBrowserRouter([
	{
		path: "/",
		element: < HomePage />,
	},
	{
		path: "/menu/:menuId",
		element: < MenuPage />,
	},
	{
		path: "/order/:orderId",
		element: < OrderPage />,
	},

	
]);

export function App() {
	return <RouterProvider router={router} />;
}