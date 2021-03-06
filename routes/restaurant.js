const { query } = require("express");
var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurant");
const Review = require("../models/review");

//FIND ALL restaurants. Rendered to the homepage
router.get("/", function (req, res, next) {
  let restName = req.params.resources;
  Restaurant.find({}).then((restaurant) => {
    res.json({
      status: 200,
      message: "Success",
      restaurants: restaurant,
    });
  });
});

//ADD a new restaurant to the database
router.post("/addRes", async (req, res, next) => {
  try {
    let newRes = new Restaurant({
      name: req.body.name,
      location: req.body.location,
      hours: req.body.hours,
      availability: req.body.availability,
      rating: req.body.rating, //Average Rating from all reviews. 
      menu: req.body.menu,
      deleted: req.body.deleted,
    });
    let result = await newRes.save();
    console.log(result);
    res.status(200).send("User successfully created");
  } catch (err) {
    res.json({
      message: "Restaurant not added",
      status: 404,
    });
  }
});

//UPDATE a restaurant
router.put("/updateRes", function (req, res) {
  Restaurant.findOneAndUpdate(
    { name: "Res7" },
    { location: "Another location" },
    function (err, result) {
      console.log(err, result);
    }
  );

  res.status(200).send("Restaurant successfully updated");
});

//SEARCH
router.post("/search", function (req, res) {

Restaurant.find(
    {
      $or: [
        {
          name: { $regex: req.body.query, $options: "i" },
        },
        {

          location: { $regex: req.body.query, $options: "i" },
        },
      ],
    },
    function (err, result) {
      if (err) {
        console.log("error")
        res.send(err);
      } else {
        console.log("Success")
        console.log(result), res.json(result);
      }
    }
  );
});

//FIND a restaurant by ID
router.get("/:resources", function (req, res, next) {
  let resId = req.params.resources;
  Restaurant.findOne({
    _id: resId,
  }).then((restaurant) => {
    console.log(restaurant);
    res.json({
      status: 200,
      message: "Success",
      data: restaurant,
    });
  });
});


module.exports = router;
