export const fetchBoards = () => {
  return fetch("http://localhost:3004/boards")
  .then(response => response.json());
}

export const fetchLists = (_board) => {
  return fetch("http://localhost:3004/boards/" + _board.id + "/lists")
    .then(response => response.json())
    .then(data => data);
}

export const fetchCards = (_list) => {
  return fetch("http://localhost:3004/lists/" + _list.id + "/cards")
    .then(response => response.json());
}

export const addCard = (_card) => {
  return fetch("http://localhost:3004/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(_card)
  })
  .then(response => response.json());
}