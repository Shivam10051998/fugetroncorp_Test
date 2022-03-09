import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TableAction from "./store/action";
import { useNavigate } from "react-router-dom";
import AlertDialog from "common/Modal";
import "./DataTable.css";
import Header from "common/Header";
import SimpleBackdrop from "common/Backdrop/Backdrop";

function DataTable({
  getTableList,
  getTableData,
  deleteTableList,
  deleteData,
  updateData,
  loading,
}) {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [deleteValue, setDeleteValue] = useState("");
  const childRef = React.useRef();
  const TableTittle = [
    "#",
    "First Name",
    "Last Name",
    "Email",
    "State",
    "City",
    "Pincode",
    "Action",
  ];

  useEffect(() => {
    getTableList();
  }, [getTableList]);

  useEffect(() => {
    setDataList(getTableData);
  }, [getTableData]);

  useEffect(() => {
    if (deleteData === "Data Deleted") {
      getTableList();
    } else if (deleteData === "something went wrong.") {
    }
  }, [getTableList, deleteData]);

  const onEditCall = (row) => {
    navigate("/DetailsRecord", { state: row });
  };

  const handleSearch = (event) => {
    const keyword = event.target.value;
    if (keyword !== "") {
      const results = dataList.filter((user) => {
        return user.first_name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setDataList(results);
    } else {
      setDataList(getTableData);
    }
  };

  const simplifiedFunction = () => {
    childRef.current.dialogClose();
    deleteTableList(deleteValue);
  };
  const data = {
    tittle: "Are You Sure You Want to Delete " + deleteValue.first_name + " ?",
    okText: "Yes",
    CancelText: "Cencel",
    tiitleColor: "rgb(80, 80, 255)",
    tiitleSize: "18px",
    functionName: simplifiedFunction,
  };

  const onDeleteClick = (row) => {
    setDeleteValue(row);
    childRef.current.dialogOpen();
  };
  return (
    <div>
      <SimpleBackdrop loading={loading} />
      <h2 className="homeTiitle">Home Page :</h2>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a href="DetailsRecord" className="addRecord">
          + Add record
        </a>
        <TextField
          placeholder="Search"
          id="outlined-size-small"
          size="small"
          className="searchInput"
          onChange={(event) => handleSearch(event)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="tableheader">
            <TableRow style={{ color: "red" }}>
              {TableTittle.map((row) => (
                <TableCell align="center" className="tableTittle">
                  {row}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.map((row, i) => (
              <TableRow
                key={row.first_name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{i + 1}</TableCell>
                <TableCell align="center">{row.first_name}</TableCell>
                <TableCell align="center">{row.last_name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.states}</TableCell>
                <TableCell align="center">{row.city}</TableCell>
                <TableCell align="center">{row.pincode}</TableCell>
                <TableCell align="left">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      className="editButton"
                      size="small"
                      onClick={() => onEditCall(row)}
                    >
                      EDIT
                    </Button>
                    <div style={{ width: "20px" }} />
                    <Button
                      size="small"
                      className="deleteButton"
                      onClick={() => onDeleteClick(row)}
                    >
                      DELETE
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AlertDialog
        ref={childRef}
        data={data}
        simplifiedFunction={simplifiedFunction}
      />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTableList: TableAction.getTableList,
      deleteTableList: TableAction.deleteTableList,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  const { dataTableList } = state;
  return {
    getTableData: dataTableList.getTableData,
    deleteData: dataTableList.deleteData,
    updateData:dataTableList.updateData,
    loading: dataTableList.loading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
