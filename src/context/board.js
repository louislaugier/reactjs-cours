import React, {createContext, useState, useEffect} from "react";

const BoardContext = createContext({
  boards: [],
  lists: [],
  loading: true
});

export const BoardProvider = function({children}) {
  const [boards, setBoards] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ComponentDidMount
  useEffect(
    function() {
      console.log("App mounted");

      fetch("http://localhost:3004/boards")
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setBoards(data)
      });
    },
    []
  );

  const fetchLists = (_board) => {
    console.log("fetchLists");
    fetch("http://localhost:3004/boards/" + _board.id + "/lists")
      .then(response => response.json())
      .then(data => {
        Promise.all(data.map(list => fetchCards(list)))
        .then(lists => setLists(lists));
      });
  }

  const fetchCards = (_list) => {
    console.log("fetchCards", _list.id);
    return fetch("http://localhost:3004/lists/" + _list.id + "/cards")
      .then(response => response.json())
      .then(data => {
        _list.cards = data

        return _list;
      });
  }

  const actions = {
    fetchLists, fetchCards
  };

  const selectors = {
    getLists: (_board) => lists.filter(list => list.boardId === _board.id) || [],
    getCards: (_list) => lists.find(list => list.id === _list.id).cards || []
  }

  return <BoardContext.Provider value={{boards, loading, actions, selectors}}>
    {children}
  </BoardContext.Provider>;
}

export default BoardContext;