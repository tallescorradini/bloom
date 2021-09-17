import { Switch, Route } from "react-router-dom";

import "./App.css";
import { Gallery } from "./pages";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <Gallery />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
