import {
  Box,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import {
  setSelectedToppingsList,
  setToppingsPrice,
} from "../../store/dataslice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ToppingsList(props) {
  const [checked, setChecked] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const currentSelectedMenuId = useSelector(
    (state) => state.menuItems.currentSelectedMenuId
  );
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    setChecked([]);
  }, [props.toppings_list]);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={() => {
          const prices = [];
          const listOfToppings = [];
          props.toppings_list.map((eachtopping, index) => {
            if (checked.includes(index)) {
              prices.push(eachtopping.price);
              listOfToppings.push({
                name: eachtopping.name,
                price: eachtopping.price,
                menuId: currentSelectedMenuId,
              });
            }
          });
          dispatch(setToppingsPrice(prices));
          dispatch(setSelectedToppingsList(listOfToppings));
          props.handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "500px",
            transform: "translate(-50%,-50%)",
            backgroundColor: "#285430",
            opacity: 0.8,
          }}
        >
          <List
            sx={{
              width: "100%",
              borderRadius: "5px",
            }}
          >
            {props.toppings_list &&
              props.toppings_list.map((eachtopping, index) => {
                const labelId = `checkbox-list-label-${index}`
                let source = "./" + eachtopping.name + ".png";
                console.log(eachtopping.name)
                return (
                  <>
                    <ListItem sx={{ textAlign: "left" }}>
                      <Box
                        component="img"
                        sx={{
                          height: 80,
                          width: 80,
                          borderRadius: "10px",
                        }}
                        src={source}
                      />
                      <ListItemButton onClick={handleToggle(index)}>
                        <ListItemText id={index} />
                      </ListItemButton>
                      <ListItemText
                        secondary={
                          <>
                            <Typography
                              sx={{
                                display: "inline",
                                fontWeight: "bold",
                                color: "white",
                              }}
                              component="span"
                              variant="subtitle1"
                              color="text.primary"
                            >
                              {eachtopping.name}
                            </Typography>
                            <br></br>
                            <Typography
                              sx={{
                                display: "inline",
                              }}
                              component="span"
                              variant="body2"
                              color="white"
                            >
                              {"$" + eachtopping.price}
                            </Typography>
                          </>
                        }
                      />
                      <ListItemIcon onClick={handleToggle(index)}>
                        <Checkbox
                          edge="end"
                          checked={checked.indexOf(index) !== -1}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          style={{color:'white'}}
                        />
                      </ListItemIcon>
                    </ListItem>

                    <Divider />
                  </>
                );
              })}
          </List>
        </Paper>
      </Modal>
    </div>
  );
}

export default ToppingsList;
