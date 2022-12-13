import { Add } from "@mui/icons-material";
import {
  Box,
  ListItem,
  List,
  ListItemAvatar,
  Typography,
  ListItemText,
  Divider,
  Button,
  Paper,
} from "@mui/material";

import React, { memo, useEffect, useState } from "react";
import ToppingsList from "./Toppings/ToppingsList";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  setCartValue,
  setCurrentSelectedMenuId,
  setSelectedMenuItemsID,
} from "../store/dataslice";

import { getAllMenuItems } from "../store/Menu.actions";
function MenuList() {
  const [Fooddata, setFooddata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toppings, setToppings] = useState([]);
  const [currentMenu, SetCurrentMenu] = useState({});
  const dispatch = useDispatch();
  const toppings_price = useSelector((state) => state.menuItems.topping_price);
  const cart_count = useSelector((state) => state.menuItems.cart_count);
  const currentSelectedMenuId = useSelector(
    (state) => state.menuItems.currentSelectedMenuId
  );
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  useEffect(() => {
    dispatch(getAllMenuItems()).then((res) => {
      setFooddata(res.payload);
      const data = res.payload;
      data?.map((o) => {
        if (o.Menu_id == currentSelectedMenuId) {
          SetCurrentMenu(o);
        }
      });
    });
  }, [currentSelectedMenuId]);
  useEffect(() => {
    dispatch(setSelectedMenuItemsID(selectedMenuItems));
  }, [selectedMenuItems]);
  useEffect(() => {
    if (toppings_price && currentMenu) {
      let totalOftoppings = toppings_price?.reduce((res, item) => {
        return res + item;
      }, 0);

      let total_price =
        parseFloat(currentMenu.Menu_price) + parseFloat(totalOftoppings);

      SetCurrentMenu({
        ...currentMenu,
        Menu_price: total_price.toFixed(2),
      });
    }
  }, [toppings_price]);

  const handleModal = (menu_id) => {
    Fooddata.map((data) => {
      if (data.Menu_id == menu_id) {
        setToppings(data.Menu_toppings);
      }
    });
  };
  const handleClose = () => {
    setShowModal(!showModal);
  };
  const handleCartCounter = (currentMenu) => {
    if (selectedMenuItems.findIndex((e) => e.id === currentMenu) > -1) {
      console.debug("not logging");
    } else {
      dispatch(setCartValue(cart_count + 1));
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "15px",
          opacity: 0.8,
        }}
      >
        <Box
          sx={{
            width: "70%",
            backgroundColor: "white",
            m: 3,
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h5"
            sx={{ m: "auto", p: 1, fontWeight: "bold", color: "#285430" }}
          >
            Good Food, Great Time
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{ color: "#285430", p: 1, fontWeight: "bold" }}
          >
            Our Chefs at WiWi make delicious food selections every week- you
            pick, we cook and deliver
          </Typography>
        </Box>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          opacity: "0.8",
          flexDirection: "row",
        }}
      >
        <br></br>
        <Paper
          style={{
            maxHeight: 400,
            overflow: "auto",
            width: "70%",
            borderRadius: "20px",
          }}
        >
          <List
            sx={{
              width: "100%",
              bgcolor: "white",
              borderRadius: "5px",
            }}
          >
            {Fooddata ? (
              Fooddata.map((element, index) => {
                return (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        sx={{ maxWidth: "80%" }}
                        secondary={
                          <>
                            <Typography
                              sx={{
                                display: "inline",
                                fontWeight: "bold",
                              }}
                              component="span"
                              variant="subtitle1"
                              color="text.primary"
                            >
                              {element.Menu_name}
                            </Typography>
                            <br></br>
                            <Typography
                              sx={{
                                display: "inline",
                              }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {element.Menu_Description}
                            </Typography>
                            <br></br>
                            <Typography
                              sx={{
                                display: "inline",
                                fontWeight: "bold",
                              }}
                              component="span"
                              variant="h6"
                              color="brown"
                            >
                              {"$" + element.Menu_price}
                            </Typography>
                            <Button
                              variant="contained"
                              endIcon={<Add />}
                              sx={{
                                ml: 5,
                                mt: 1,
                                borderRadius: "20px",
                                backgroundColor: "#285430",
                                color: "white",
                                ":hover": {
                                  backgroundColor: "black",
                                  opacity: 0.8,
                                },
                              }}
                              onClick={() => {
                                handleModal(element.Menu_id);
                                handleClose();
                                dispatch(
                                  setCurrentSelectedMenuId(element.Menu_id)
                                );
                              }}
                            >
                              Toppings
                            </Button>
                          </>
                        }
                      />
                      <ListItemText
                        justifyContent="end"
                        sx={{ maxWidth: "20%" }}
                      >
                        <Typography
                          sx={{
                            display: "inline",
                            fontWeight: "bold",
                          }}
                          component="span"
                          variant="subtitle1"
                          color="text.primary"
                        >
                          Amount
                        </Typography>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "2px",
                            margin: "10px",
                            border: "1px solid grey",
                          }}
                        >
                          {currentMenu.Menu_id === element.Menu_id
                            ? currentMenu.Menu_price
                            : element.Menu_price}
                        </span>
                        <br></br>
                        <Button
                          variant="contained"
                          endIcon={<Add />}
                          sx={{
                            backgroundColor: "#285430",
                            mt: 1,
                            borderRadius: "20px",
                            color:'white',
                            ":hover": {
                              backgroundColor: "black",
                              opacity: 0.8,
                            },
                          }}
                          onClick={() => {
                            const menuIndex = selectedMenuItems.findIndex(
                              (e) => e.id === element.Menu_id
                            );
                            if (menuIndex > -1) {
                              let copySelectedMenuItems = [
                                ...selectedMenuItems,
                              ];
                              copySelectedMenuItems[menuIndex] = {
                                ...copySelectedMenuItems[menuIndex],
                                quantity:
                                  copySelectedMenuItems[menuIndex]["quantity"] +
                                  1,
                              };
                              setSelectedMenuItems(copySelectedMenuItems);
                            } else {
                              let price1 =
                                currentMenu.Menu_id === element.Menu_id
                                  ? currentMenu.Menu_price
                                  : element.Menu_price;
                              setSelectedMenuItems([
                                ...selectedMenuItems,
                                {
                                  id: element.Menu_id,
                                  name: element.Menu_name,
                                  price: price1,
                                  quantity: 1,
                                },
                              ]);
                            }

                            handleCartCounter(element.Menu_id);
                          }}
                        >
                          Add
                        </Button>
                      </ListItemText>
                    </ListItem>
                    <Divider />
                  </>
                );
              })
            ) : (
              <h2>No data found</h2>
            )}
            {showModal ? (
              <ToppingsList
                open={() => {
                  setShowModal(true);
                }}
                handleClose={() => setShowModal(false)}
                toppings_list={toppings}
              />
            ) : (
              ""
            )}
          </List>
        </Paper>
      </div>
    </>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     toppings_price: state.topping_price,
//   };
// };
// export default connect(mapStateToProps)(MenuList);
export default MenuList;
