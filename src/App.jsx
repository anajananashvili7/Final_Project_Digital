import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from "../src/context/AuthContext";
import { CartProvider } from './context/CartContext';
import Header from "./components/header/Header";
import SectionOne from "./components/sectionOne/SectionOne";
import SectionTwo from "./components/sectionTwo/SectionTwo";
import SectionThree from './components/sectionThree/SectionThree';
import SectionFour from './components/sectionFour/SectionFour';
import Refrigerators from "./components/refrigerators/Refrigerators";
import WashingMachines from './components/washingmachines/WashingMachines';
import Furniture from './components/furniture/Furniture';
import BabyFeeding from './components/babyfeeding/BabyFeeding';
import JoinCommunity from './components/login/LogIn'
import SignUp from "./components/signup/SignUp";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import AdminPanel from './components/adminPanel/AdminPanel'
import Cart from './components/cart/Carts'
import SectionFour1 from './components/sectionFour1/SectionFour1';
import SectionFour2 from './components/sectionFour2/SectionFour2';
import SectionFour3 from './components/sectionFour3/SectionFour3';
import SectionFour4 from './components/sectionFour4/SectionFour4';
import SectionFive from './components/sectionFive/SectionFive';
import SectionSix from './components/sectionSix/SectionSix';
import SectionSeven from './components/sectionSeven/SectionSeven'
import SectionEight from './components/sectionEight/SectionEight';
import SectionNine from './components/sectionNine/SectionNine';
import Timer from './components/timer/Timer';
import Footer from './components/footer/Footer';




const App = () => {
  const location = useLocation();

  return (
    <>
    <AuthProvider>
      <CartProvider>
    <Header />
      <Routes>
        <Route path="/" element={<SectionOne />} />
        <Route path="/refrigerators" element={<Refrigerators />} />
        <Route path="/washing-machine" element={<WashingMachines />} />
        <Route path="/furniture" element={<Furniture />} />
        <Route path="/baby-feeding" element={<BabyFeeding />} />
        <Route path="/leibebi" element={<SectionFour1 />} />
        <Route path="/satsmendi" element={<SectionFour2 />} />
        <Route path="/auzebi" element={<SectionFour3 />} />
        <Route path="/accessories" element={<SectionFour4 />} />
        <Route path="/join-community" element={<JoinCommunity />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      
      {location.pathname === '/' && <SectionTwo />}
      {location.pathname === '/' && <SectionThree />}
      {location.pathname === '/' && <SectionFour />}
      {location.pathname === '/' && <SectionFive />}
      {location.pathname === '/' && <SectionSix />}
      {location.pathname === '/' && <SectionSeven />}
      {location.pathname === '/' && <SectionEight />}
      {location.pathname === '/' && <SectionNine />}
      {location.pathname === '/' && <Timer />}
      {location.pathname === '/' && <Footer />}
      </CartProvider>
    </AuthProvider>
      

    </>
  );
};

const Wrapper = () => (
  <Router>
    <App />
  </Router>
);

export default Wrapper;

