import React, {createContext, useEffect, useState} from "react"

const BoardContext =  createContext({
    boards: [],
    loading: true
})

export const BoardProvider = function({children}) {
    const [boards, setBoards] = useState([]);
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
    return <BoardContext.Provider value={{boards, loading}}>
        {children}
    </BoardContext.Provider>
}

export default BoardContext