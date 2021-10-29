const GET_DATA = "GET_DATA";
const GET_DETAIL_DATA = "GET_DETAIL_DATA";
// const ADD_ACTIVE = "ADD_ACTIVE";
// const DEL_ACTIVE = "DEL_ACTIVE";

const defaultState = [{
  items: [],
  detailItems: [],
  // active: false,
  count: 0
}];

export default function reposReducer(state = defaultState, action){
  switch (action.type) {
    case('GET_DATA'):
      return {
        items: action.payload,
        ...state
      }
    case('GET_DETAIL_DATA'):
      return {
        ...state,
        detailItems: action.payload,
      }
    case('ADD_ACTIVE'):
      return {
        ...state,
        active: true,
      }
    case('DEL_ACTIVE'):
      return {
        ...state,
        active: false,
      }
    default:
      return state;
  }
}

export const getData = (data) => ({type:GET_DATA, payload:data.data});
export const getDetailData = (data) => ({type:GET_DETAIL_DATA, payload:data.data});
// export const addActive = () => ({type:ADD_ACTIVE});
// export const delActive = () => ({type:DEL_ACTIVE});