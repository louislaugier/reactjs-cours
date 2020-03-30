import React from 'react';
import Board from "./components/Board";
import BoardContext from './context/board';

function App() {
  return (
    <div>
      <BoardContext.Consumer>
        {(boards, loading) => 
          <>
            {!loading && boards.map(board => <Board {...board}/>)}
            {loading && <p>Loading...</p>}
          </>
        }
      </BoardContext.Consumer>
    </div>
  );
}

export default App;