import * as Actions from '../action';

const initialState = {
  getTableData: [],
  deleteData:'',
  loading:false
};

const TableData = function (state = initialState, action) {
  switch (action.type) {
    case Actions.LOADING: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case Actions.GET_TABLE_DATA: {
      return {
        ...state,
        getTableData: action.getTableData,
        loading: false,
      };
    }
    case Actions.DELETE_TABLE_DATA: {
      return {
        ...state,
        deleteData: action.deleteData,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default TableData;
