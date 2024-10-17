import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home";
import { MenuPage } from "./pages/menu";
import { OrderPage } from "./pages/order";
import { BlogPage } from "./pages/blog";
import { ResultProvider } from "./context/ResultContext";


const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/blog/:blogId",
		element: <BlogPage />,
	},
	{
		path: "/menu/:menuId",
		element: <MenuPage />,
	},
	{
		path: "/order/:orderId",
		element: <OrderPage />,
	},
]);

// Envolvendo o RouterProvider com ResultProvider
export function App() {
  return (
    <ResultProvider> {/* ResultProvider para disponibilizar o contexto em todo o app */}
      <RouterProvider router={router} /> {/* RouterProvider para as rotas definidas */}
    </ResultProvider>
  );
}