import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Topbar from "./Components/Topbar";
import BrandSelect from "./Pages/BrandSelect";
import SelectItem from "./Pages/SelectItem";
import ShoppingCart from "./Pages/ShoppingCart";
import CheckPayment from "./Pages/CheckPayment";
import PaymentList from "./Pages/PaymentList";
import PaymentListDetail from "./Pages/PaymentListDetail";
import {RecoilRoot} from 'recoil';

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
        return(
            <>
        <Topbar/>
        <Routes>
            <Route path="/" element={<BrandSelect />} />
            <Route path="/brandselect" element={<BrandSelect />} />
            <Route path='/:brandId/selectitem' element={<SelectItem/>}/>
            <Route path='/shoppingcart' element={<ShoppingCart/>}/>
            <Route path='/checkpayment' element={<CheckPayment/>}/>
            <Route path='/paymentlist' element={<PaymentList/>}/>
            <Route path='/paymentlist/:id' element={<PaymentListDetail/>}/>
        </Routes>
                </>
        );
}

export default App;
