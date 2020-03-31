import React, { useState, useMemo, useEffect, useContext } from "react";
import AddItem from "../AddItem";
import Card from "../Card";
import BoardContext from "../../context/board";

function List({list, onCardsCountChange}) {
  const [filter, setFilter] = useState("");
  const {actions, selectors} = useContext(BoardContext);
  const items = selectors.getCards(list);
  // ComponentDidUpdate
  useEffect(
    function() {
      console.log("List updated")
      
      actions.fetchCards(list)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [list.id]
  );

  const cards = useMemo(
    function() {
      console.log('Cards computed', list.id, list.cards, items);
      return <ul>
        {
          items
            .filter(item => item.title.indexOf(filter) !== -1)
            .map((item) => <Card key={item.id} title={item.title}/>)
        }
      </ul>;
    },
    [filter, items, list.cards, list.id]
  );

  const onSubmit = (value) => {
    fetch("http://localhost:3004/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: value,
        listId: list.id
      })
    })
    .then(response => response.json())
    .then(data => {
      const cards = [...items, data];
      onCardsCountChange(list.id, cards.length);
      //setItems(cards);
    });
  }

  return (
    <>
      <h2>{list.title}</h2>
      <input value={filter} onChange={(event)=> setFilter(event.currentTarget.value)}/>
      {cards}
      <AddItem onSubmit={onSubmit}/>
    </>
  );
}

export default List;