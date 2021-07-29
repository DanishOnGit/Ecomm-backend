const express = require("express");
const { getUsersAddresses, createNewAddress } = require("../controllers/address.controller");
const router = express.Router();

router.route("/").get(getUsersAddresses).post(createNewAddress)

module.exports = router