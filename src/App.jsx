import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/BeforeAuth/Home.jsx";
import Navbar from "./components/BeforeAuth/Navbar.jsx";
import Banner from "./components/BeforeAuth/Banner.jsx";
import Footer from "./components/BeforeAuth/Footer.jsx";
import SignUp from "./components/BeforeAuth/SignUp.jsx";
import Login from "./components/BeforeAuth/Login.jsx";
import About from "./components/BeforeAuth/About.jsx";
import Ats from "./components/BeforeAuth/Ats.jsx";
import HowItWork from "./components/BeforeAuth/HowItWork.jsx";
import Profile from "./components/BeforeAuth/Profile.jsx";
import Interview from "./components/BeforeAuth/Interview.jsx";
import { Portfolio } from "./components/BeforeAuth/Portfolio.jsx";
import MyAccount from "./components/BeforeAuth/MyAccount.jsx";
import NoPageFound from "./components/BeforeAuth/NoPageFound.jsx"
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/ats-resume-checker" element={<Ats></Ats>}></Route> 
        <Route path="/how-it-works" element={<HowItWork></HowItWork>}></Route>
        <Route path="/contact" element={<Profile></Profile>}></Route>
        <Route path="/interview-prep" element={<Interview></Interview>}></Route>
        <Route path="/portfolio-builder" element={<Portfolio></Portfolio>}></Route>
        <Route path="/my-account" element={<MyAccount></MyAccount>}></Route>
        <Route path="*" element={<NoPageFound></NoPageFound>}></Route>


        {/* <Route path="/generate" element={<Generate></Generate>}></Route>
        <Route path="/template" element={<Template></Template>}></Route>
        
        <Route path="/preview" element={<PrivewRout/>}></Route> */}
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
