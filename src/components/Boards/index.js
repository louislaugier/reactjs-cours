import React, { useState, useEffect } from "react";
import List from "../List";
import { useMemo } from "react";
import { useContext } from "react";
import BoardContext from "../../context/board";

function Board({id, title}) {
  const {actions, selectors} = useContext(BoardContext);
  
  const sLists = selectors.getLists({id});
  
  // ComponentDidUpdate
  useEffect(
    function() {
      actions.fetchLists({id});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  // ComponentWillUnmount
  useEffect(
    function() {
      return () => console.log('Board will unmount')
    },
    []
  );

  const mlists = useMemo(
    function() {
      return <>
      {
        sLists.map(item => <React.Fragment key={item.title}>
            <p>Items: {selectors.getCardsCount(item)}</p>
            <List list={item}/>
          </React.Fragment>
        )
      }
      </>
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sLists]
  )

  return (
    <>
      <div className="header">
        <h1>{title}</h1>
      </div>
      <div className="body">
        {mlists}
      </div>
    </>
  );
}

export default Board;