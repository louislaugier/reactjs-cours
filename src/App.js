import React, { useEffect, useState } from 'react';
import Board from "./components/Board";
import BoardContext from "./context/board";

function App() {
  return (
    <div>
    <BoardContext.Consumer>
      {({boards, loading}) => {
        return <>
        {!loading && boards.map(board => <Board key={board.id} {...board}/>)}
        {loading && <p>Loading...</p>}
        </>
      }}
    </BoardContext.Consumer>  
    </div>
  );
}

export default App;
