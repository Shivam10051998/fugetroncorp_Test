import React from 'react';
import axios from 'axios';

class DataTableServices extends React.Component {
  getTableData = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://j5ej5u32gg.execute-api.us-east-1.amazonaws.com/v1/fetch`)
        .then((response) => {
          if (response.data) {
            resolve(response.data.data);
          } else {
            reject('Unable to fetch Table Data');
          }
        })

        .catch((error) => {
          reject('something went wrong.');
        });
    });
  };

  addTableData = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://c0ri699qs5.execute-api.us-east-1.amazonaws.com/v1/add?param1=${data.email}&&param2=${data.firstName}&&param3=${data.lastName}&&param4=${data.pincode}&&param5=${data.city}&&param6=${data.state}`)
        .then((response) => {
          if (response.data) {
            resolve('Record Added Successfully');
          } 
        })
        .catch((error) => {
          reject('something went wrong.');
        });
    });
  };

  deleteTableData = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://k6j938wg66.execute-api.us-east-1.amazonaws.com/v1/delete?param1=${data.email}`)
        .then((response) => {
          if (response.data) {
            resolve('Data Deleted');
          } 
        })
        .catch((error) => {
          reject('something went wrong.');
        });
    });
  };

  updateTableData = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://o1wm686yz2.execute-api.us-east-1.amazonaws.com/v1/edit?param1=${data.email}&&param2=${data.firstName}&&param3=${data.lastName}&&param4=${data.pincode}&&param5=${data.city}&&param6=${data.state}`)
        .then((response) => {
          if (response.data) {
            resolve('Data Updated');
          } 
        })
        .catch((error) => {
          reject('something went wrong.');
        });
    });
  };

}
const instance = new DataTableServices();
export default instance;
