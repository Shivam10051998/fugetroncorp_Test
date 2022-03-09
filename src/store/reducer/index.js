import { combineReducers } from 'redux';
import dataTableList from '../../main/DataTable/store/reducer';


export default combineReducers({
    dataTableList: dataTableList,
})