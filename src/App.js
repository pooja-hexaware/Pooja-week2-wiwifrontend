import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import MenuList from "./components/MenuList/MenuList";
import { Box, Typography } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store/store";
function App() {
  const myStyle = {
    backgroundImage: "url('/bg5.jpg')",
    height: "140vh",
    width: "80%",
    marginLeft: "10%",

    fontSize: "50px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
  };
  return (
    <div className="App" style={myStyle}>
      <Provider store={store}>
        <Navbar />
        <MenuList />
      </Provider>
    </div>
  );
}

export default App;
