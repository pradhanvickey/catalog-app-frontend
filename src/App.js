import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import MenuScreen from './screens/MenuScreen';
import ProductScreen from './screens/ProductScreen';
import CreateStoreScreen from './screens/CreateStoreScreen';
import EditStoreScreen from './screens/EditStoreScreen';
import ListMenuScreen from './screens/ListMenuScreen';
import CreateMenuScreen from './screens/CreateMenuScreen';
import EditMenuScreen from './screens/EditMenuScreen';
import ListProductScreen from './screens/ListProductScreen';
import CreateProductScreen from './screens/CreateProductScreen';
import EditProductScreen from './screens/EditProductScreen';
import UpdateProfileScreen from './screens/UpdateProfileScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<LoginScreen />} exact />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/profile/edit" element={<UpdateProfileScreen />} />
            <Route path="/stores/add" element={<CreateStoreScreen />} />
            <Route path="/stores/:storeId/edit" element={<EditStoreScreen />} />
            <Route path="/stores/:storeId/menu" element={<ListMenuScreen />} />
            <Route path="stores/:storeId/menus/add" element={<CreateMenuScreen />} />
            <Route path="/stores/:storeId/menus/:menuId/edit" element={<EditMenuScreen />} />
            <Route path="/stores/:storeId/menus/:menuId/items" element={<ListProductScreen />} />
            <Route path="/stores/:storeId/menus/:menuId/items/add" element={<CreateProductScreen />} />
            <Route path="/stores/:storeId/menus/:menuId/items/:productId/edit" element={<EditProductScreen />} />
            <Route path="/stores/:storeUniqueKey" element={<MenuScreen />} />
            <Route path="/stores/:storeUniqueKey/menus/:menuId" element={<ProductScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}


export default App;
