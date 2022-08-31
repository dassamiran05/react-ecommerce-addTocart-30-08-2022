
import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Cards from './components/Cards';
import CardDetails from './components/CardDetails';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Cards />} />
        <Route path="/cart/:id" element={<CardDetails />} />
        {/* <Route path='/cart/:productId' element={<CardDetails />} /> */}
      </Routes>
    </div>
  );
}

export default App;
