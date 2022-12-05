import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';

import Home from './pages/Home';
import FormCreate from './pages/FormCreate';
import MyTable from "./pages/MyTable";
import MyStat from './pages/MyStat';
import FormUpdate from "./pages/FormUpdate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormCreate />} />
        <Route path="/edit/:id" element={<FormUpdate />} />
        <Route path="/table" element={<MyTable />} />
        <Route path="/stat" element={<MyStat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
