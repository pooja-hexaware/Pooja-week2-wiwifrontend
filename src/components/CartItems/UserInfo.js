import {
  Button,
  Chip,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { SaveOrderDetails } from "../store/Menu.actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
function UserInfo(props) {
  const menu_items = useSelector((state) => state.menuItems.selectedMenuItems);
  const dispatch = useDispatch();
  const [msg, setMsg] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: "",
    street: "",
    postalCode: "",
    city: "",
    phone: "",
    total_amount: props.finalprice,
    status: "success",
    date: new Date(),
    orderDetails: menu_items,
  });

  useEffect(() => {
    if (
      userInfo.name.length !== 0 ||
      userInfo.street.length !== 0 ||
      userInfo.postalCode.length !== 0 ||
      userInfo.city.length !== 0 ||
      userInfo.phone.length !== 0
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [userInfo]);

  const PlaceOrder = () => {
    dispatch(SaveOrderDetails(userInfo)).then((res) => {
      setMsg(true);
    });
  };
  const handleNameInfo = (e) => {
    setUserInfo((previousState) => {
      return { ...previousState, name: e.target.value };
    });
  };
  const handleStreetInfo = (e) => {
    setUserInfo((previousState) => {
      return { ...previousState, street: e.target.value };
    });
  };
  const handlePostalInfo = (e) => {
    setUserInfo((previousState) => {
      return { ...previousState, postalCode: e.target.value };
    });
  };
  const handleCityInfo = (e) => {
    setUserInfo((previousState) => {
      return { ...previousState, city: e.target.value };
    });
  };
  const handlePhoneInfo = (e) => {
    setUserInfo((previousState) => {
      return { ...previousState, phone: e.target.value };
    });
  };
  return (
    <>
      <FormControl>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Name"
          variant="outlined"
          id="outlined-basic"
          required
          color="secondary"
          focused
          onBlur={(e) => handleNameInfo(e)}
        />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Street"
          variant="outlined"
          id="outlined-basic"
          required
          color="secondary"
          onBlur={(e) => handleStreetInfo(e)}
        />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Postal Code"
          variant="outlined"
          id="outlined-basic"
          required
          color="secondary"
          onBlur={(e) => handlePostalInfo(e)}
        />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="City"
          variant="outlined"
          id="outlined-basic"
          required
          color="secondary"
          onBlur={(e) => handleCityInfo(e)}
        />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Phone No"
          variant="outlined"
          id="outlined-basic"
          required
          color="success"
          onBlur={(e) => handlePhoneInfo(e)}
          inputProps={{
            maxLength: 10,
          }}
        />
        {msg && (
          <div>
            <Chip
              icon={<ThumbUpAltIcon />}
              label="Order Placed Successfully"
              color="success"
            />
          </div>
        )}
        <div sx={{ display: "flex", flexDirection: "column" }}>
          <Button
            variant="contained"
            disabled={disableBtn}
            sx={{
              m: 1,
              borderRadius: "20px",
              backgroundColor: "#285430",
              color: "white",
              ":hover": {
                backgroundColor: "black",
                opacity: 0.8,
              },
            }}
            onClick={() => PlaceOrder()}
          >
            Save
          </Button>
        </div>
      </FormControl>
    </>
  );
}

export default UserInfo;
