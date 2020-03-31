import React from 'react';
import Board from "./components/Board";
import BoardContext from "./context/board";

function App() {
  return (
    <div>
      <BoardContext.Consumer>
        {({selectors}) => {
          return <>
            {!selectors.isLoading() && selectors.getBoards().map(board => <Board key={board.id} {...board}/>)}
            {selectors.isLoading() && <p>Loading...</p>}
          </>
        }}
      </BoardContext.Consumer>  
    </div>
  );
}

export default App;