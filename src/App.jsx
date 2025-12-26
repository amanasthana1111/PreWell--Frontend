import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/BeforeAuth/Home.jsx";
import Navbar from "./components/BeforeAuth/Navbar.jsx";
import Banner from "./components/BeforeAuth/Banner.jsx";
import Footer from "./components/BeforeAuth/Footer.jsx";
import SignUp from "./components/BeforeAuth/SignUp.jsx";
import Login from "./components/BeforeAuth/Login.jsx";
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        {/* <Route path="/about" element={<About></About>}></Route> */}
        {/* <Route path="/ats-resume-checker" element={<Ats></Ats>}></Route>
        <Route path="/how-it-works" element={<HowItWork></HowItWork>}></Route>
        <Route path="/contact" element={<Profile></Profile>}></Route>
        <Route path="/generate" element={<Generate></Generate>}></Route>
        <Route path="/template" element={<Template></Template>}></Route>
        <Route path="*" element={<NoPageFound></NoPageFound>}></Route>
        <Route path="/preview" element={<PrivewRout/>}></Route> */}
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
