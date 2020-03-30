import React, { useState } from "react";

function AddItem({onSubmit}) {
  const [value, setValue] = useState("");

  return (
    <>
      <input value={value} onChange={(event)=> setValue(event.currentTarget.value)}/>
      <button onClick={() => onSubmit(value)}>Add Item</button>
    </>
  )
}

export default AddItem;