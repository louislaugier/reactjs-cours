import React, { useState, useMemo, useEffect, useContext } from "react";
import AddItem from "../AddItem";
import Card from "../Card";
import BoardContext from "../../context/board";

function List({list}) {
  const [filter, setFilter] = useState("");
  const {actions, selectors} = useContext(BoardContext);
  
  const items = selectors.getCards(list);

  // ComponentDidUpdate
  useEffect(
    function() {
      actions.fetchCards(list);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [list.id]
  );

  const cards = useMemo(
    function() {
      return <ul>
        {
          items
            .filter(item => item.title.indexOf(filter) !== -1)
            .map((item) => <Card key={item.id} title={item.title}/>)
        }
      </ul>;
    },
    [filter, items]
  );

  const onSubmit = (value) => {
    actions.addCard({
      title: value,
      listId: list.id
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