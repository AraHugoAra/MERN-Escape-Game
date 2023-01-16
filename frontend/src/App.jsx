import Header from "./components/Header";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RoomDetails from "./components/RoomDetails";
import { Routes, Route } from "react-router-dom";
import History from "./components/History";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6059bd",
    },
    secondary: {
      main: "#fff",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<RoomDetails />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
