
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './component/Home';
import View from './component/View';
import Header from './component/Header';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/view' element={<View />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
