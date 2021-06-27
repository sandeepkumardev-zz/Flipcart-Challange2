import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useData } from "../../context/context";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#2874F0",
    },
    "& .MuiToolbar-gutters": {
      [theme.breakpoints.up("md")]: {
        padding: "0px 200px",
      },
    },
    "& .MuiToolbar-regular": {
      minHeight: "54px",
    },
  },
  logo: {
    width: "auto",
    height: "20px",
  },
  link: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    fontSize: "12px",
    fontStyle: "italic",
  },
  yellow: {
    color: "yellow",
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    color: "#fff",
  },
  nav: {
    textDecoration: "none",
    color: "#fff",
  },
  badge: {
    "& .MuiBadge-badge": {
      color: "#fff",
      backgroundColor: "#000",
    },
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const { cartItem, savedItem } = useData();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.nav}>
            <div className={classes.link}>
              <img
                src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png"
                alt=""
                className={classes.logo}
              />
              <span className={classes.text}>
                Explore
                <span className={classes.yellow}>
                  Plus
                  <img
                    src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png"
                    alt=""
                    height="12px"
                  />
                </span>
              </span>
            </div>
          </Link>
          <div className={classes.grow} />

          <Link to="/myCart" className={classes.nav}>
            <Button
              className={classes.button}
              startIcon={
                <Badge
                  badgeContent={cartItem?.length}
                  className={classes.badge}
                >
                  <ShoppingCartIcon />
                </Badge>
              }
            >
              Cart
            </Button>
          </Link>
          <Link to="/savedItem" className={classes.nav}>
            <Button
              className={classes.button}
              startIcon={
                <Badge
                  badgeContent={savedItem.length}
                  className={classes.badge}
                >
                  <FavoriteIcon style={{ color: "red" }} />
                </Badge>
              }
            >
              Saved
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
