import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { Typography, Chip, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartItems from "../CartItems/CartItems";

function Navbar() {
  const cart_count = useSelector((state) => state.menuItems.cart_count);
  const [showCart, setShowCart] = useState(false);

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#285430" }}>
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="white" component="div">
            WiWi Food Ordering
          </Typography>
          <Button
            sx={{
              background: "white",
              color: "black",
              p: "1.3,2,1.3,2",
              border: "none",
              borderRadius: "50px",
              marginLeft: "60%",
              ":hover": {
                backgroundColor: "black",
                color: "white",
                opacity: 0.8,
              },
            }}
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            endIcon={
              <Chip
                label={cart_count}
                variant="outlined"
                sx={{
                  color: "black",
                  ":hover": {
                    color: "white",
                    opacity: 0.8,
                  },
                }}
              />
            }
            onClick={() => setShowCart(!showCart)}
          >
            Your Cart
          </Button>
          <CartItems open={showCart} close={()=>setShowCart(!showCart)} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
