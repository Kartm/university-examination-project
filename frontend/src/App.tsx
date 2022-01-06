import React from "react";
import { Provider } from "react-redux";

import PagesNavigation from "./pages/pages.navigation";
import store from "./store/configure.store";
import "./App.css";

function App() {
  // const me = async () => {
  //   const res = await refreshToken();
  //   console.log("refresh token", res);
  //   if (res.statusCode === 200) {
  //     localStorage.setItem("token", res.data.token);
  //     store.dispatch(MeSlice.actions.setMe(res.data.me));
  //   } else localStorage.removeItem("token");
  // };

  React.useEffect(() => {
    document.title = "Starter web";
    // me();
  }, []);

  return (
    <Provider store={store}>
      <PagesNavigation />
    </Provider>
  );
}

export default App;
