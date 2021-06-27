import React from "react";
import NavBar from "./NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
    height: "160px",
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

function SavedItem() {
  const classes = useStyles();
  const { savedItem, removeSavedItem, addCartItem } = useData();

  return (
    <>
      <NavBar />
      <Container maxWidth="md" className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <LeftContainer
              savedItem={savedItem}
              removeSavedItem={removeSavedItem}
              addCartItem={addCartItem}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

function LeftContainer({ savedItem, removeSavedItem, addCartItem }) {
  return (
    <Paper>
      <div style={{ padding: "10px", borderBottom: "1px solid #B8B8B8" }}>
        <Typography variant="h6">My Cart ({savedItem.length})</Typography>
      </div>
      {savedItem?.map((item) => (
        <CartItem
          key={item.id}
          data={item}
          removeSavedItem={removeSavedItem}
          addCartItem={addCartItem}
        />
      ))}
    </Paper>
  );
}

function CartItem({ data, removeSavedItem, addCartItem }) {
  const classes = useStyles();

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
          <div style={{ padding: "3px" }}>
            <Button
              variant="contained"
              style={{ color: "#fff", backgroundColor: "#2874F0" }}
              size="small"
              className={classes.button}
              onClick={() => addCartItem(data)}
            >
              Move to Cart
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              onClick={() => removeSavedItem(data)}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SavedItem;
