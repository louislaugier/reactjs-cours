import React, { useState } from "react"
import AddItem from '../List'

function List({title, items, addToList}) {
    const [filter, setFilter] = useState("");
    return (
    <>
        <div className="header">
            <h2>{title}</h2>
            <input value={filter} onChange={(event) => setFilter(event.currentTarget.value)}/>
        </div>
        <div className="body">
            <ul>
                {
                    items
                    .filter(item => item.indexOf(filter) !== -1)
                    .map((item, index) => <li key={index}>{item}</li>)
                }
            </ul>
            {/* <button onClick={() => addToList(title, "item added")}>Add item</button> */}
            <AddItem onSubmit={(value) => addToList(title, value)}/>
        </div>
    </>
    );
}

export default List;