import React from "react";

function AddItem({onSubmit}){
    const [value, setValue] = useState("")
    return(
        <>
            <input value={filter} onChange={(event) => setValue(event.currentTarget.value)}/>
            <button onClick={() => onSubmit(value)}>Add item</button>
        </>
    )
}