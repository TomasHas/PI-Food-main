import { Route, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import NavBar from "./components/navBar/NavBar";
import Landing from "./pages/landing/Landing";
import Form from "./pages/form/Form";
import Detail from "./pages/details/Detail";
import styles from "./App.module.css";

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/" render={() => <Landing />} />
      <Route path="/home" render={() => <Home />} />
      <Route path="/form" render={() => <Form />} />
      <Route path="/recipes/:id" render={() => <Detail />} />
    </div>
  );
}

export default App;
