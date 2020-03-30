import React, { useState, useMemo, useEffect } from "react";
import AddItem from "../AddItem";
import Card from "../Card";

function List({id, title, onCardsCountChange}) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  
  // ComponentDidUpdate
  useEffect(
    function() {
      console.log("List updated")
      
      fetch("http://localhost:3004/lists/" + id + "/cards")
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        onCardsCountChange(id, data.length);
        setItems(data);
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  const cards = useMemo(
    function() {
      console.log('Cards computed', title);
      return <ul>
        {
          items
            .filter(item => item.title.indexOf(filter) !== -1)
            .map((item, index) => <Card key={index.id} title={item.title}/>)
        }
      </ul>;
    },
    [filter, items, title]
  );

  const onSubmit = (value) => {
    fetch("http://localhost:3004/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: value,
        listId: id
      })
    })
    .then(response => response.json())
    .then(data => {
      const cards = [...items, data];
      onCardsCountChange(id, cards.length);
      setItems(cards);
    });
  }

  return (
    <>
      <h2>{title}</h2>
      <input value={filter} onChange={(event)=> setFilter(event.currentTarget.value)}/>
      {!loading && cards}
      {loading && <p>Loading...</p>}
      <AddItem onSubmit={onSubmit}/>
    </>
  );
}

export default List;