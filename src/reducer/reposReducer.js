const GET_DATA = "GET_DATA";

const defaultState = [{
  items: [],
  count: 0
}];

export default function reposReducer(state = defaultState, action){
  switch (action.type) {
    case('GET_DATA'):
      return {
        items: action.payload,
        ...state
      }
    default:
      return state;
  }
}

export const getData = (data) => ({type:GET_DATA, payload:data.data});