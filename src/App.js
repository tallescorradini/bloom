import { Switch, Route } from "react-router-dom";

import "./App.css";
import { Gallery } from "./pages";

// TODO: feat list galleries
// TODO: feat manage galleries

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/:galleryId">
          <Gallery />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
