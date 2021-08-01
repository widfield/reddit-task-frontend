import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import CreateThread from "./components/CreateThread/CreateThread";
import Header from "./components/Header/Header";
import Homepage from "./components/Homepage/Homepage";
import ThreadDetails from "./components/ThreadDetails/ThreadDetails";

const ContentWrapper = styled.div`
  background: #ccc;
  height: 100vh;
  padding: 5px;
`;

function App() {
  return (
    <Router>
      <Header />
      <ContentWrapper>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/submit">
            <CreateThread />
          </Route>
          <Route path="/threads/:id">
            <ThreadDetails />
          </Route>
        </Switch>
      </ContentWrapper>
    </Router>
  );
}

export default App;
