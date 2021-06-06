require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeDBConnection } = require("./db/db.connect");
const productsRouter = require("./router/products.router");
const cartRouter = require("./router/cart.router");
const wishlistRouter = require("./router/wishlist.router");
const videosRouter = require("./router/videos.router");
const likedVideosRouter = require("./router/likedVideos.router");
const watchLaterRouter = require("./router/watchLater.router");
const watchHistoryRouter = require("./router/watchHistory.router");
const playlistsRouter = require("./router/playlists.router");
const notesRouter = require("./router/notes.router");
const usersRouter = require("./router/users.router");
const ecommUsersRouter = require("./router/users-ecomm.router");
const SocialUsersRouter = require("./router/socialUsers.router");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/error-handler");
const routeNotFound = require("./middlewares/route-not-found");
const authenticationVerification = require("./middlewares/authentication-verification");


const app = express();
app.use(bodyParser.json());
app.use(cors());
initializeDBConnection();

//Ecomm routes
app.use("/productsListingPage", productsRouter);

//Video lib routes
app.use("/videos", videosRouter)
app.use("/users", usersRouter)
app.use("/users-ecomm",ecommUsersRouter)
app.use("/users-social",SocialUsersRouter)

app.use(authenticationVerification);

//Ecomm private routes
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);

//Video Lib private routes
app.use("/likedVideos", likedVideosRouter)
app.use("/watchLater",watchLaterRouter)
app.use("/watchHistory",watchHistoryRouter)
app.use("/playlists", playlistsRouter)
app.use("/notes",notesRouter)

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});

//404 handler: DO NOT move this. This should be last route!!

app.use(errorHandler);
app.use(routeNotFound);

app.listen(process.env.PORT||3000, () => {
  console.log("server started");
});
