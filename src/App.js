import React from 'react';
import Board from "./components/Board";
import BoardList from "./components/Boards";
import BoardContext from "./context/board";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import BreadCrumb from './components/BreadCrumb';
import { useTranslation } from 'react-i18next';

function App() {
  const {t, i18n} = useTranslation();
  return (
    <Router>
    <button onClick={() => {i18n.changeLanguage("en")}}>EN</button>
    <button onClick={() => {i18n.changeLanguage("fr")}}>FR</button>
      <Link to="/">{t('home')}</Link>&nbsp;
      <Link to="/boards">{t('board.list')}</Link>

      <Route path="/" component={BreadCrumb}/>

      <div>
        <Switch>
          <Route path="/boards/:id" component={Board}/>

          <Route path="/boards">
            <BoardContext.Consumer>
              {({selectors}) => {
                return <>
                  {!selectors.isLoading() && selectors.getBoards().map(board => 
                    <Link to={"/boards/" + board.id}>{board.title}</Link>
                  )}
                  {selectors.isLoading() && <p>{t('loading')}...</p>}
                </>
              }}
            </BoardContext.Consumer>  
          </Route>

          <Route path="/">
            {t('landingpage')}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;