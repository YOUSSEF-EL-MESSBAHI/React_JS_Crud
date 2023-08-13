import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import AddProd from './components/AddProd';
import { ProductsContext } from './Context/AppContext';
import { useAppState } from './Controller';
import UpdateProduct from './components/UpdateProduct';
import Stats from './components/Stats';

function App() {
  const actions = ["Home", "Products", "AddProd"];
  const [currentAction, setCurrentAction] = useState("Home");
  // useEffect(() => {
  //   console.log("currentAction: ", currentAction);
  // }, [currentAction]);
  useEffect(() => {
    let currentAction = window.location.pathname;
    currentAction = currentAction.slice(1, currentAction.length);
    setCurrentAction(currentAction);
  });
  // const [currentAction, setCurrentAction] = useState("Home");
  return (
    <ProductsContext.Provider value={useAppState()}>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <ul className="nav nav-pills">
              {actions.map((action) => (
                <li key={action}>
                  <Link
                    onClick={() => setCurrentAction(action)}
                    className={
                      currentAction === action
                        ? "btn btn-info ms-1"
                        : "btn btn-outline-info ms-1"
                    }
                    to={"/" + action}
                  >
                    {action}
                  </Link>
                </li>
              ))}
            </ul>
            <Stats></Stats>
          </div>
        </nav>
        <Routes>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Products" element={<Products />}></Route>
          <Route path="/AddProd" element={<AddProd />}></Route>
          <Route path="/UpdateProduct/:id" element={<UpdateProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </ProductsContext.Provider>

  );
}

export default App;
