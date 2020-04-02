import React, { useContext } from "react";

import {Switch, Route} from "react-router-dom";
import BoardContext from "../../context/board";

function BreadCrumb({location}) {
  const {selectors} = useContext(BoardContext);

  return <div>
        {location.pathname}&nbsp;
        <Switch>
          <Route path="/boards/:id">
            {
              ({match}) => {
                return "Board List > " + selectors.getBoard(parseInt(match.params.id)).title
              }
            }
          </Route>

          <Route path="/boards">
            Board List 
          </Route>

          <Route path="/">
            Home  
          </Route>
        </Switch>
      </div>;
}

export default BreadCrumb;