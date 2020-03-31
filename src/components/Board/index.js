import React, { useState, useEffect } from "react";
import List from "../List";
import { useMemo } from "react";
import { useContext } from "react";
import BoardContext from "../../context/board";

function Board({id, title}) {
  const [, setSLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const {actions, selectors} = useContext(BoardContext);
  
  const sLists = selectors.getLists({id});
  console.log("slists", sLists);
  
  // ComponentDidUpdate
  useEffect(
    function() {
      console.log("Board mounted")

      actions.fetchLists({id});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  // ComponentDidUpdate
  useEffect(
    function() {
        console.log("List updated");
    },
    [sLists]
  );

  // ComponentWillUnmount
  useEffect(
    function() {
      return () => console.log('Board will unmount')
    },
    []
  );



  //const addToList = function(id, newItem) {
  //  setSLists(
  //    sLists.map(function(list) {
  //      if (list.id === id) {
  //        //v1
  //        //list.items.push(newItem);
//
  //        //v2
  //        list = {
  //          ...list,
  //          items: [
  //            ...list.items,
  //            newItem
  //          ]
  //        }
  //      }
//
  //      return list;
  //    })
  //  );
  //}
  const onCardsCountChange = (id, count) => {
    console.log("onCardsCountChange", id, count);
    setSLists(
        sLists.map(function(list) {
          if (list.id === id) {
            list = {
              ...list,
              count
            }
          }
    
          return list;
        })
      );
  }

  const mlists = useMemo(
    function() {
      console.log("useMemo", sLists);
      return <>
      {
        sLists.map(item => <React.Fragment key={item.title}>
            <p>Items: {item.count === undefined ? '...' : item.count}</p>
            <List /*addToList={addToList}*/ onCardsCountChange={onCardsCountChange} list={item}/>
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