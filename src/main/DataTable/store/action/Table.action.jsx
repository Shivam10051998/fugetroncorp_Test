import DataTableServices from 'services/DataTableServices';
export const GET_TABLE_DATA = 'GET_TABLE_DATA';
export const DELETE_TABLE_DATA = 'DELETE_TABLE_DATA';
export const LOADING="LOADING"

export function getTableList() {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });
    DataTableServices.getTableData()
      .then((getTableData) => {
        dispatch({
          type: GET_TABLE_DATA,
          getTableData,
        });
        return getTableData;
      })
      .catch((error) => {
        dispatch({
          type: LOADING,
        });
        throw error;
      });
  };
}


export function deleteTableList(data) {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });
    DataTableServices.deleteTableData(data)
      .then((deleteData) => {
        dispatch({
          type: DELETE_TABLE_DATA,
          deleteData,
        });
        return deleteData;
      })
      .catch((error) => {
        dispatch({
          type: LOADING,
        });
        throw error;
      });
  };
}



