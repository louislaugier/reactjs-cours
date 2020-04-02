export const fetchLists = async (_board) => {
  return JSON.parse(
    localStorage.getItem("list-board"+_board.id)
  );
}

export const fetchCards = async (_list) => {
  return JSON.parse(
    localStorage.getItem("card-list"+_list.id)
  );
}

export const addCard = async (_card) => {
  let cards = JSON.parse(
    localStorage.getItem("card-list" + _card.listId)
  );
  cards = [...cards, _card];
  localStorage.saveItem(
    "card-list"+_card.listId, 
    JSON.stringify(
      cards
    )
  );
  return _card;
}