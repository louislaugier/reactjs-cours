export const initialState = {
    boards: [],
    lists: [],
    loading: true
  };
  
export function reducer (state, action) {
    switch(action.type) {
        case "RECEIVE_BOARDS":
        return {
            ...state,
            boards: action.payload.data,
            loading: false
        }
        case "RECEIVE_LISTS":
        return {
            ...state,
            lists: action.payload.lists
        }
        case "RECEIVE_CARDS":
            return {
            ...state,
            lists: state.lists.map(list => {
                if (list.id === action.payload.list.id) {
                list = {
                    ...list,
                    cards: action.payload.cards
                };
                }
                return list;
            })
            }
        case "RECEIVE_NEW_CARD":
        return {
            ...state,
            lists: state.lists.map(list => {
                if (list.id === action.payload.card.listId) {
                list = {
                    ...list,
                    cards: [
                    ...list.cards, 
                    action.payload.card
                    ]
                };
                }
        
                return list;
            })
        }
        default:
        return state;
    }
}