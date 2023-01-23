import React, {useMemo} from 'react';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {themeSettings} from "./theme";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Layout from "./scenes/layout";
import Products from "./scenes/products";
import Customers from "./scenes/customers";
import Transactions from "./scenes/transactions";
import Overview from "./scenes/sales";
import Daily from "./scenes/daily";
import Monthly from "./scenes/monthly";
import Breakdown from "./scenes/breakdown";

function App() {
    const mode = useSelector((state: any) => state.global.mode)
    const theme = useMemo(()=> createTheme(themeSettings(mode)),[mode]);

    return (
        <div className="">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Routes>
                        <Route element={<Layout/>}>
                            <Route path='/' element={<Navigate to='/dashboard' replace/>} />
                            <Route path='/dashboard' element={<Dashboard/>} />
                            <Route path='/products' element={<Products/>} />
                            <Route path='/customers' element={<Customers/>} />
                            <Route path='/transactions' element={<Transactions/>} />
                            <Route path='/overview' element={<Overview/>} />
                            <Route path='/daily' element={<Daily/>} />
                            <Route path='/monthly' element={<Monthly/>} />
                            <Route path='/breakdown' element={<Breakdown/>} />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
