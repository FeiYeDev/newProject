const actions = {
    DataRequest: (connection) => {
        return ({
            type: 'ADD',
            payload: { connection },
          })
    },
    DeleteData: (connection) => {
        return ({
            type: 'Delete',
            payload: { connection },
          })
    },
    Show: (connection) => {
        return ({
            type: 'shows',
            payload: { connection },
          })
    },
    ShowMsg: (connection) => {
        return ({
            type: 'showMsg',
            payload: { connection },
          })
    },
    CoordinateMsg: (connection) => {
        return ({
            type: 'coordinateMsg',
            payload: { connection },
          })
    },
    ShowModal: (connection) => {
        return ({
            type: 'showModal',
            payload: { connection },
          })
    },
    ResetData: (connection) => {
        return ({
            type: 'resetData',
            payload: { connection },
          })
    },
  };
  
  export default actions;
  