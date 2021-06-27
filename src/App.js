import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import SavedItem from "./components/Saved";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/myCart">
          <Cart />
        </Route>
        <Route path="/savedItem">
          <SavedItem />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
