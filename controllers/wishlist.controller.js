

const getWishlistItems = async (req, res) => {
    try {
      const { wishlist } = req;
      await wishlist.populate("wishlistItems.productId").execPopulate();

      res
        .status(200)
        .json({ success: true, wishlistItems: wishlist.wishlistItems });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Could not fetch your wishlist",
        errMessage: err.message,
      });
    }
  }

  const updateWishlist = async (req, res) => {
    try {
      const passedProduct = req.body;
      const { wishlist, userId } = req;

      if (
        wishlist.wishlistItems.find(
          (item) => item.productId == passedProduct._id
        )
      ) {
        wishlist.wishlistItems = wishlist.wishlistItems.filter(
          (item) => item.productId != passedProduct._id
        );
      } else {
        wishlist.wishlistItems.push({
          userId,
          productId: passedProduct._id,
          existsInWishlist: true,
        });
      }

      const savedItem = await wishlist.save();

      const wishlistItem = await savedItem
        .populate("wishlistItems.productId")
        .execPopulate();

      res
        .status(201)
        .json({ success: true, wishlistItems: wishlist.wishlistItems });
    } catch (error) {
      console.log("erroror posting...", error);
      res.status(500).json({
        success: false,
        message: "Could not add to your wishlist",
        errorMessage: error.message,
      });
    }
  }

  module.exports={getWishlistItems,updateWishlist}