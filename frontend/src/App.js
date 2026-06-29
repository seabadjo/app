import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Actions from "./pages/Actions";
import Cohort from "./pages/Cohort";
import News from "./pages/News";
import Media from "./pages/Media";
import Opportunities from "./pages/Opportunities";
import Contact from "./pages/Contact";
import Donation from "./pages/Donation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/nos-actions" element={<Actions />} />
          <Route path="/cohorte" element={<Cohort />} />
          <Route path="/actualites" element={<News />} />
          <Route path="/medias" element={<Media />} />
          <Route path="/opportunites" element={<Opportunities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/don" element={<Donation />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
