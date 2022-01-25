import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import NewProject from "./components/pages/NewProject";
import Contact from "./components/pages/Contact";
import Company from "./components/pages/Company";
import Home from "./components/pages/Home";
import NavBar from "./components/layout/NavBar";
import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import Projects from "./components/pages/Projects";
import MotionPage from "./animations/MotionPage";
import EditionProject from "./components/pages/EditionProject";
import EditionService from "./components/pages/EditionService";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Container customClass="min-height">
          <Route exact path="/">
          <MotionPage>
            <Home />
           </MotionPage>
          </Route>
          <Route exact path="/company">
          <MotionPage>
            <Company />
            </MotionPage>
          </Route>
          <Route exact path="/contact">
            <MotionPage>
            <Contact />
            </MotionPage>
          </Route>
          <Route exact path="/newproject">
            <MotionPage>
            <NewProject />
            </MotionPage>
          </Route>
          <Route exact path="/projects">
            <MotionPage>
            <Projects />
            </MotionPage>
          </Route>
          <Route exact path="/projects/:id">
            <MotionPage>
            <EditionProject />
            </MotionPage>
          </Route>
          <Route  path="/projects/:id/editionservice">
            <MotionPage>
            <EditionService />
            </MotionPage>
          </Route>
          
          </Container>
          
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
