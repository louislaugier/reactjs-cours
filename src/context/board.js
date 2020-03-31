import React, {createContext, useEffect, useReducer} from "react";
import {reducer, initialState} from "./reducers/board";
import {fetchBoards, fetchCards, fetchLists, addCard} from "./actionCreators/board";

const BoardContext = createContext({
  boards: [],
  lists: [],
  loading: true
});

export const BoardProvider = function({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // ComponentDidMount
  useEffect(
    function() {
      console.log("App mounted");

      fetchBoards()
      .then(data => {
        dispatch({
          type: "RECEIVE_BOARDS",
          payload: {
            data
          }
        });
      });
    },
    []
  );

  const actions = {
    fetchLists: (_board) => fetchLists(_board)
      .then(data => {
        dispatch({
          type: "RECEIVE_LISTS",
          payload: {
            lists: data
          }
        });
      })
    , fetchCards: (_list) => fetchCards(_list)
      .then(data => {
        dispatch({
          type: "RECEIVE_CARDS",
          payload: {
            cards: data,
            list: _list
          }
        });
      })
    , addCard: (_card) => addCard(_card)
      .then(data => {
        dispatch({
          type: "RECEIVE_NEW_CARD",
          payload: {
            card: data
          }
        });
      })
  };

  const selectors = {
    getBoards: () => state.boards,
    isLoading: () => state.loading,
    getLists: (_board) => state.lists.filter(list => list.boardId === _board.id) || [],
    getCards: (_list) => state.lists.find(list => list.id === _list.id).cards || [],
    getCardsCount: function (_list) {
      return this.getCards(_list).length;
    } 
  }

  return <BoardContext.Provider value={{actions, selectors}}>
    {children}
  </BoardContext.Provider>;
}

export default BoardContext;