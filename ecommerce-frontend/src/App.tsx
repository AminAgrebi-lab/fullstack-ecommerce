import { useRoutes } from 'react-router-dom';
import Layout from './components/Layout';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import AddEditProducts from './components/AddEditProducts';
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
        {
          path: 'products',
          children: [
            { path: 'add', element: <AddEditProducts /> },
            { path: 'edit/:id', element: <AddEditProducts /> },
          ],
        },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]);

  return routeElements;
}

export default App;
