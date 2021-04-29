const express = require('express');
const cors=require("cors");
const {initializeDBConnection} = require("./db/db.connect");
const productsRouter = require("./router/products.router");
const cartRouter = require("./router/cart.router");
const wishlistRouter= require("./router/wishlist.router");
const bodyParser=require("body-parser");
const errorHandler=require("./middlewares/error-handler");
const routeNotFound=require("./middlewares/route-not-found");

const app = express();
app.use(bodyParser.json());
app.use(cors());
initializeDBConnection();


app.use("/productsListingPage",productsRouter)
app.use("/cart",cartRouter)
app.use("/wishlist",wishlistRouter)

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});



//404 handler: DO NOT move this. This should be last route!!

app.use(errorHandler);
app.use(routeNotFound)


app.listen(3000, () => {
  console.log('server started');
}); 