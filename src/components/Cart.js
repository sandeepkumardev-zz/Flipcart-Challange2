import React from "react";
import NavBar from "./NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import RemoveIcon from "@material-ui/icons/Remove";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { useData } from "../context/context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    [theme.breakpoints.up("sm")]: {
      padding: "20px",
    },
  },
  left: {
    display: "flex",
    padding: "2px 5px 2px 5px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 120,
  },
  controls: {
    display: "flex",
    alignItems: "center",
  },
  amount: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  discount: {
    display: "flex",
    justifyContent: "space-between",
    "& .MuiTypography-body1": {
      fontSize: "14px",
    },
  },
  totalamount: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    height: "25px",
    margin: "2px",
  },
}));

function Cart() {
  const classes = useStyles();
  const { cartItem, removeCartItem, addSavedItem, totalAmount } = useData();

  return (
    <>
      <NavBar />
      <Container maxWidth="md" className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <LeftContainer
              cartItem={cartItem}
              removeCartItem={removeCartItem}
              addSavedItem={addSavedItem}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <RightContainer totalAmount={totalAmount} cartItem={cartItem} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

function LeftContainer({ cartItem, removeCartItem, addSavedItem }) {
  return (
    <Paper>
      <div style={{ padding: "10px", borderBottom: "1px solid #B8B8B8" }}>
        <Typography variant="h6">My Cart ({cartItem.length})</Typography>
      </div>
      {cartItem?.map((item) => (
        <CartItem
          key={item.id}
          data={item}
          removeCartItem={removeCartItem}
          addSavedItem={addSavedItem}
        />
      ))}
    </Paper>
  );
}

function CartItem({ data, removeCartItem, addSavedItem }) {
  const classes = useStyles();
  const [count, setCount] = React.useState(1);
  const { AmountFun } = useData();

  const counter = (singh) => {
    if (singh === "sum") {
      setCount(count + 1);
      AmountFun(data.price);
    } else {
      if (count > 1) {
        setCount(count - 1);
        AmountFun(-data.price);
      }
    }
  };

  return (
    <>
      <div className={classes.left}>
        <CardMedia className={classes.cover} image={data.link} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {data.product}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              $ {data.price}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton onClick={() => counter("sub")}>
              <RemoveIcon />
            </IconButton>
            <div style={{ padding: "5px" }}>{count}</div>
            <IconButton onClick={() => counter("sum")}>
              <AddIcon />
            </IconButton>
          </div>
          <div style={{ padding: "3px" }}>
            <Button
              variant="contained"
              style={{ color: "#fff", backgroundColor: "#2874F0" }}
              size="small"
              className={classes.button}
              onClick={() => addSavedItem(data)}
            >
              Save for later
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              onClick={() => removeCartItem(data)}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function RightContainer({ totalAmount, cartItem }) {
  const classes = useStyles();

  return (
    <Card className={classes.right}>
      <CardContent>
        <div
          style={{ paddingBottom: "3px", borderBottom: "1px solid #B8B8B8" }}
        >
          <Typography variant="h6">Price details</Typography>
        </div>
        <div className={classes.amount}>
          <Typography color="textSecondary" gutterBottom>
            Price ({cartItem.length} items)
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            $ {totalAmount}
          </Typography>
        </div>
        <div className={classes.discount}>
          <Typography color="textSecondary" gutterBottom>
            Discount
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            $ 0.00
          </Typography>
        </div>
      </CardContent>
      <CardActions className={classes.totalamount}>
        <Typography>Total Amount</Typography>
        <Typography>$ {totalAmount}.00</Typography>
      </CardActions>
    </Card>
  );
}

export default Cart;
