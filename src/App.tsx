import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <div>Hello world!</div>,
	},
	{
		path: "/teste",
		element: <div>Hello teste!</div>,
	},
]);

export function App() {
	return <RouterProvider router={router} />;
}