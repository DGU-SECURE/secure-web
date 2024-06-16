import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Topbar from "./Components/Topbar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import BrandSelect from "./Pages/BrandSelect";
import SelectItem from "./Pages/SelectItem";
import ShoppingCart from "./Pages/ShoppingCart";
import CheckPayment from "./Pages/CheckPayment";
import PaymentList from "./Pages/PaymentList";
import PaymentListDetail from "./Pages/PaymentListDetail";
import { RecoilRoot, useRecoilValue } from 'recoil';
import { isLoggedInState } from './state.js';

function App() {
        return (
            <RecoilRoot>
                <Router>
                    <AppContent />
                </Router>
            </RecoilRoot>
        );
    }
    function AppContent() {
        const isLoggedIn = useRecoilValue(isLoggedInState);
        return(
            <>
                {isLoggedIn && <Topbar />}
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/brandselect" element={<BrandSelect />} />
            <Route path='/:brandId/selectitem' element={<SelectItem/>}/>
            <Route path='/shoppingcart' element={<ShoppingCart/>}/>
            <Route path='/checkpayment' element={<CheckPayment/>}/>
            <Route path='/paymentlist' element={<PaymentList/>}/>
            <Route path='/paymentlist/:order_id' element={<PaymentListDetail/>}/>
        </Routes>
                </>
        );
}

export default App;
