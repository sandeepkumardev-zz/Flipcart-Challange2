import React from "react";
import NavBar from "./NavBar";
import { useData } from "../context/context";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  card: {
    width: 250,
    margin: "5px",
    "& .MuiCardContent-root": {
      padding: "8px",
    },
    "& .MuiTypography-h6": {
      color: "#3B3B3B",
      lineHeight: 1,
    },

    "& .MuiCardActions-root": {
      padding: "0px 4px",
    },
    "& .MuiTypography-root": {
      fontWeight: "bold",
    },
    "& .MuiButton-root": {
      minWidth: "0px",
    },
  },
  media: {
    height: 300,
  },
});

function Home() {
  const classes = useStyles();
  const { items } = useData();

  return (
    <>
      <NavBar />
      <div className={classes.root}>
        {items?.map((item) => (
          <Cart key={item.id} data={item} />
        ))}
      </div>
    </>
  );
}

export default Home;

function Cart({ data }) {
  const classes = useStyles();
  const { cartItem, addCartItem, removeCartItem } = useData();
  const [avl, setAvl] = React.useState(false);

  const addToCart = () => {
    addCartItem(data);
  };

  const removeToCart = () => {
    removeCartItem(data);
  };

  React.useEffect(() => {
    if (cartItem.includes(data)) {
      setAvl(true);
    } else {
      setAvl(false);
    }
  }, [cartItem, data]);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={data?.link}
        title={data?.product}
      />
      <CardContent
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h6" component="h2">
            {data?.product}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {data?.brand}
          </Typography>
        </div>

        {avl ? (
          <Button
            size="small"
            style={{
              height: "25px",
              backgroundColor: "#2874F0",
              color: "#fff",
            }}
            startIcon={<RemoveShoppingCartIcon />}
            onClick={removeToCart}
          ></Button>
        ) : (
          <Button
            size="small"
            style={{
              height: "25px",
              backgroundColor: "#2874F0",
              color: "#fff",
            }}
            startIcon={<AddShoppingCartIcon />}
            onClick={addToCart}
          ></Button>
        )}
      </CardContent>

      <CardActions>
        <Typography variant="body2">₹ {data?.price}</Typography>
        <Typography variant="body2">Size: {data?.size}</Typography>
      </CardActions>
    </Card>
  );
}
