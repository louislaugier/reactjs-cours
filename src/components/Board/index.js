import React, { useState, useEffect } from "react";
import List from "../List";
import { useMemo } from "react";

function Board({id, title}) {
  const [sLists, setSLists] = useState([]);
  const [loading, setLoading] = useState(true);

  // ComponentDidUpdate
  useEffect(
    function() {
      console.log("Board mounted")

      fetch("http://localhost:3004/boards/" + id + "/lists")
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setSLists(data);
      })
    },
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
        sLists.map(item => <>
            <p>Items: {item.count === undefined ? '...' : item.count}</p>
            <List /*addToList={addToList}*/ onCardsCountChange={onCardsCountChange} key={item.title} id={item.id} title={item.title}/>
          </>
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
        {!loading && mlists}
        {loading && <p>Loading...</p>}
      </div>
    </>
  );
}

export default Board;