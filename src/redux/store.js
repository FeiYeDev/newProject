import { createStore } from 'redux';
const init = {
    data:[
        {
          key: '1',
          date: 'John Brown',
          memo: 32,
          payee: 'New York No. 1 Lake Park',
          amount: 123,
        },
        {
          key: '2',
          date: 'Jim Green',
          memo: 42,
          payee: 'London No. 1 Lake Park',
          amount: 321,
        },
        {
          key: '3',
          date: 'Joe Black',
          memo: 32,
          payee: 'Sidney No. 1 Lake Park',
          amount: 333,
        },
      ],
    newArr:[],
    showModify:false,
    showModal:false,
    showMsg:{},
    coordinateMsg:[],
};
const reducer = (state = init, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                newArr:action.payload.connection
            } 
        case 'Delete':
            return {
                ...state,
                data:action.payload.connection
            } 
        case 'shows':
            return {
                ...state,
                showModify:action.payload.connection
            } 
        case 'showMsg':
            return {
                ...state,
                showMsg:action.payload.connection,
            } 
        case 'coordinateMsg':
            return {
                ...state,
                coordinateMsg:action.payload.connection
            } 
        case 'showModal':
            return {
                ...state,
                showModal:action.payload.connection
            }  
        case 'resetData':
            // const newData = state.data;
            // console.log(action.payload.connection);
            // const index = newData.findIndex(item => {return item.key === action.payload.connection.key});
            // console.log(index);
            // newData.splice(index,1,action.payload.connection);
            // console.log(newData);
            return {
                ...state,
                data:action.payload.connection
            } 
        default:
            return state;  }};
const store = createStore(reducer);
export {store};