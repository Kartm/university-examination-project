import React from "react";
import { Provider } from "react-redux";

import PagesNavigation from "./pages/pages.navigation";
import store from "./store/configure.store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <PagesNavigation />
    </Provider>
  );
}

export default App;
