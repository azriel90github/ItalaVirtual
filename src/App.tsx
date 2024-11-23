import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home";
import { MenuPage } from "./pages/menu";
import { OrderPage } from "./pages/order";
import { BlogPage } from "./pages/blog";
import { ResultProvider } from "./context/ResultContext";
import i18n from './i18n'; //Importação do i18n configurado
import { I18nextProvider } from 'react-i18next';
import { AccessibilityPage } from "./pages/accessibility";
import { LibraryPage } from "./pages/library";

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
  {
    path: "/accessibility/:accessibilityId",
    element: <AccessibilityPage />,
  },
  {
    path: "/library/:libraryId",
    element: <LibraryPage />,
  },
]);

export function App() {
  return (
    <I18nextProvider i18n={i18n}> {/* Provedor do i18next */}
      <ResultProvider> {/* ResultProvider para o contexto global */}
        <RouterProvider router={router} /> {/* RouterProvider para as rotas */}
      </ResultProvider>
    </I18nextProvider>
  );
}
