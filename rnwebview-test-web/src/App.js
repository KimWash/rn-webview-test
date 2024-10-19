import './App.css';

import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Find from './Find';
import List from './List';
import Detail from './Detail';

function Router () {
 return  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login/>} /> {/* 👈 Renders at /app/ */}
    <Route path="/find" element={<Find/>}/>
    <Route path="/list" element={<List/>}/>
    <Route path="/detail" element={<Detail/>}/>
  </Routes>
</BrowserRouter>

}
function App() {
  return <>
  <Router/>
  </>
}

export default App;
