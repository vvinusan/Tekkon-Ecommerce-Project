import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import ItemDetails from "./ItemDetails";
import { GlobalStyle } from "../styles/GlobalStyles";
import ShoppingCart from "./shoppingCart";
import Fitness from "./Fitness";
import Medical from "./Medical";
import Lifestyle from "./Lifestyle";
import Gaming from "./Gaming";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:itemId" element={<ItemDetails />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/items/fitness" element={<Fitness />} />
        <Route path="/items/medical" element={<Medical />} />
        <Route path="/items/lifestyle" element={<Lifestyle />} />
        <Route path="/items/gaming" element={<Gaming />} />
      </Routes>
    </Router>
  );
}

export default App;
