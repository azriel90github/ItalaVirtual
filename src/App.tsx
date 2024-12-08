import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home";
import { MenuPage } from "./pages/menu";
import { OrderPage } from "./pages/order";
import { BlogPage } from "./pages/blog";
import { AccessibilityPage } from "./pages/accessibility";
import { LibraryPage } from "./pages/library";
import { CartProvider } from "./context/CartContext"; // Importando o CartProvider
import { ImageProvider } from "./context/ImageContext"; // Importando o ImageProvider
import { InvoiceProvider } from "./context/InvoiceContext"; // Importando o InvoiceProvider
import i18n from "./i18n"; // Importação do i18n configurado
import { I18nextProvider } from "react-i18next";

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
      <CartProvider> {/* Adicionando o CartProvider */}
        <ImageProvider> {/* Adicionando o ImageProvider */}
          <InvoiceProvider> {/* Adicionando o InvoiceProvider */}
            <RouterProvider router={router} /> {/* RouterProvider para as rotas */}
          </InvoiceProvider>
        </ImageProvider>
      </CartProvider>
    </I18nextProvider>
  );
}

