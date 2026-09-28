import { useRoutes } from 'react-router-dom';
import Layout from './components/Layout';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import AddProducts from './components/AddProducts';
import About from './components/About';
import NotFound from './components/NotFound';

function App() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Products /> },
        { path: 'product-details/:id', element: <ProductDetails /> },
        { path: 'about', element: <About /> },
        // ✅ Nested route exactly like the course:
        // Parent '/products' with child 'add' → full URL: /products/add
        {
          path: 'products',
          children: [
            { path: 'add', element: <AddProducts /> },
          ],
        },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]);

  return routeElements;
}

export default App;