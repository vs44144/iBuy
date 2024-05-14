import { Container} from 'react-bootstrap'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer";
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import ExampleListScreen from './screens/ExampleListScreen';
import ExampleEditScreen from './screens/ExampleEditScreen';
import ShembulliPareListScreen from './screens/ShembulliPareListScreen';
import ShembulliPareEditScreen from './screens/ShembulliPareEditScreen';
import ShembulliDyteListScreen from './screens/ShembulliDyteListScreen';
import ShembulliDyteEditScreen from './screens/ShembulliDyteEditScreen';
import PlanetListScreen from './screens/PlanetListScreen';
import PlanetEditScreen from './screens/PlanetEditScreen'
import SatelliteListScreen from './screens/SatelliteListScreen';
import SatelliteEditScreen from './screens/SatelliteEditScreen';
import PuntoriListScreen from './screens/PuntoriListScreen';
import PuntoriEditScreen from './screens/PuntoriEditScreen';
import KontrataListScreen from './screens/KontrataListScreen';
import KontrataEditScreen from './screens/KontrataEditScreen';


function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Routes>
          <Route path='/' element={<HomeScreen />} exact  />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/order/:id' element={<OrderScreen />} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path='/cart/:id?' element={<CartScreen />} />
          
          <Route path='/admin/userlist' element={<UserListScreen />} />
          <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />

          <Route path='/admin/productlist' element={<ProductListScreen />} />
          <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />

          <Route path='/admin/orderlist' element={<OrderListScreen />} />

          <Route path='/admin/examplelist' element={<ExampleListScreen />} />
          <Route path='/admin/example/:id/edit' element={<ExampleEditScreen />} />

          <Route path='/admin/shembulliparelist' element={<ShembulliPareListScreen />} />
          <Route path='/admin/shembullipare/:id/edit' element={<ShembulliPareEditScreen />} />

          <Route path='/admin/shembullidytelist' element={<ShembulliDyteListScreen />} />
          <Route path='/admin/shembullidyte/:id/edit' element={<ShembulliDyteEditScreen />} />

          <Route path='/admin/planetlist' element={<PlanetListScreen />} />
          <Route path='/admin/planet/:id/edit' element={<PlanetEditScreen />} />

          <Route path='/admin/satellitelist' element={<SatelliteListScreen />} />
          <Route path='/admin/satellite/:id/edit' element={<SatelliteEditScreen />} />
          
          <Route path='/admin/puntorilist' element={<PuntoriListScreen />} />
          <Route path='/admin/puntori/:id/edit' element={<PuntoriEditScreen />} />

          <Route path='/admin/kontratalist' element={<KontrataListScreen />} />
          <Route path='/admin/kontrata/:id/edit' element={<KontrataEditScreen />} />

          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}



export default App;
