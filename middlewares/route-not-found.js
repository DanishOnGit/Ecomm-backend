function routeHandler(req, res) {
  res
    .status(404)
    .json({ success: false, message: "Page Not Found. Check URL again!" });
}

module.exports = routeHandler;
