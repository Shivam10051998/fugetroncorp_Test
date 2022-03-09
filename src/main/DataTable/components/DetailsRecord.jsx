import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./DetailsRecord.css";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "common/Header";
import SimpleBackdrop from "common/Backdrop/Backdrop";
import DataTableServices from 'services/DataTableServices';

function DetailsRecord() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loading, setLoading] =useState(false)
  const navigate = useNavigate();
  const { state } = useLocation();

  const onSubmit = (data) => {
    const obj = {
      ...data,
      email: state === null ? data.email : state.email,
    };
    if (state === null) {
      setLoading(true)
      DataTableServices.addTableData(obj)
      .then((res)=>{
        setLoading(false)
        navigate('/')
      })
      .catch((err)=>{
        setLoading(false)
      })
    } else {
      setLoading(true)
      DataTableServices.updateTableData(obj)
      .then((res)=>{
        setLoading(false)
        navigate('/')
      })
      .catch((err)=>{
        setLoading(false)
      })
    }
  };
  const { city, email, first_name, last_name, pincode, states } = state || {};

  return (
    <div>
      <h2 className="tiitle">
        {state === null ? "Add Record Page :" : "Edit Record Page :"}
      </h2>
      <SimpleBackdrop loading={loading} />
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="inputTittle">First Name</span>
            <input
              defaultValue={state === null ? "" : first_name}
              className="input"
              {...register("firstName", { required: true, maxLength: 20 })}
            />
            <span className="error">
              {errors.firstName?.type === "required" &&
                "First name is required"}
            </span>
          </div>
          <div style={{ width: "50px" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="inputTittle">Last Name</span>
            <input
              defaultValue={state === null ? "" : last_name}
              className="input"
              {...register("lastName", {
                required: true,
                maxLength: 20,
              })}
            />
            <span className="error">
              {errors.lastName?.type === "required" && "Last name is required"}
            </span>
          </div>
          <div style={{ width: "50px" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="inputTittle">Email</span>
            <input
              disabled={state === null ? false : true}
              defaultValue={state === null ? "" : email}
              className="input"
              {...register("email", {
                required: state === null ? true : false,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            <span className="error">
              {/* {errors.email?.type === "required" && "Not Valid Email Id"} */}
              {errors.email?.type === "pattern" ? "Not Valid Email Id" : ""}
              {errors.email?.type === "required"
                ? "Please Enter Your Email Id"
                : ""}
            </span>
          </div>
        </div>

        <div style={{ height: "25px" }} />

        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="inputTittle">State</span>
            <select
              defaultValue={state === null ? "" : states}
              style={{ width: "170px" }}
              className="input"
              {...register("state", { required: true })}
            >
              <option value="Maharashtra">Maharashtra</option>
              <option value="Goa">Goa</option>
              <option value="Gujrat">Gujrat</option>
              <option value="Delhi">Delhi</option>
            </select>
            <span className="error">
              {errors.state?.type === "required" && "Please Select Your State"}
            </span>
          </div>
          <div style={{ width: "50px" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="inputTittle">City</span>
            <input
              defaultValue={state === null ? "" : city}
              className="input"
              {...register("city", { required: true, maxLength: 20 })}
            />
            <span className="error">
              {errors.city?.type === "required" && "City is required"}
            </span>
          </div>
          <div style={{ width: "50px" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="inputTittle">Pincode</span>
            <input
              defaultValue={state === null ? "" : pincode}
              className="input"
              {...register("pincode", {
                required: true,
                pattern: /^\d{4}$|^\d{6}$/,
              })}
            />
            <span className="error">
              {errors.pincode?.type === "pattern" ? "Not Valid Pincode" : ""}
              {errors.pincode?.type === "required"
                ? "Please Enter Your Pincode"
                : ""}
            </span>
          </div>
        </div>
        <div className="bottom-div">
          <Button onClick={handleSubmit(onSubmit)} className="addButton">
            {state === null ? "Add" : "Update"}
          </Button>
          <div style={{ width: "30px" }} />
          <Button onClick={() => navigate("/")} className="CancelButton">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}



export default DetailsRecord;
