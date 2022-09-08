import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ReceiveTokens from './testnet/RecieveTokens.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <BrowserRouter history={history} basename="/app">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/get-tokens" element={<ReceiveTokens />} />
      {/* <Route path="invoices" element={<Invoices />} /> */}
    </Routes>
  </BrowserRouter>
);


