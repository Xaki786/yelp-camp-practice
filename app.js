const express = require("express");
const mongoose = require("mongoose");
const Campground = require("./models/Campground.js");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const path = require("path");
const uuid = require("uuid");

const mongoUri = "mongodb://localhost/yelp-camp-practice";
mongoose
  .connect(
    mongoUri,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Mongo DB Connected");
  })
  .catch(err => {
    console.log("CAN'T CONNECT TO THE DATABASE");
    process.exit(-1);
  });

const seedDB = require("./seedDB");
seedDB();
const campgrounds = [
  {
    id: uuid(),
    name: "Virginia State Parks",
    url: "https://c1.staticflickr.com/3/2924/14465824873_71a21a6027_k.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: uuid(),
    name: "Random",
    url: "https://c1.staticflickr.com/4/3741/9586943706_b22f00e403_b.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: uuid(),
    name: "Random 2",
    url: "https://c1.staticflickr.com/8/7457/9586944536_9c61259490_c.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: uuid(),
    name: "Diamond Moutain",
    url: "https://c1.staticflickr.com/1/76/216334882_067eb5f270_z.jpg?zz=1",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: uuid(),
    name: "Joshua Tree National Park",
    url: "https://c1.staticflickr.com/6/5025/5620577903_24e2654dd8_b.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: uuid(),
    name: "Mono Lake",
    url: "https://c1.staticflickr.com/7/6062/6065444573_9670dddaec_b.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: uuid(),
    name: "Blue Tent Under Milkyway",
    url: "/images/blue-tent-under-milkyway.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: uuid(),
    name: "Bonfire Surrounded With Green Grass Field",
    url: "/images/bonfire-surrounded-with-green-grass-field-1061640.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: uuid(),
    name: "Green and White Tents Near Trees",
    url: "/images/green-and-white-tents-near-trees-939723.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: uuid(),
    name: "Man and Woman Sitting beside Bonfire during Night time",
    url:
      "/images/man-and-woman-sitting-beside-bonfire-during-nigh-time-776117.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: uuid(),
    name: "Photosix Camping tents in Forest",
    url: "/images/photosix-camping-tents-in-forest-699558.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: uuid(),
    name: "Tent at the Field near Trees during Night",
    url: "/images/tent-at-the-field-near-trees-during-night.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: uuid(),
    name: "Adventure Alps Camping",
    url: "/images/adventure-alps-camp-camping-618848.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//  LANDING PAGE
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//  SHOW ALL CAMPGROUNDS
app.get("/campgrounds", (req, res) => {
  Campground.find()
    .then(dbCampgrounds => {
      res.render("./campgrounds/campgrounds.ejs", {
        ejsCampgrounds: dbCampgrounds
      });
    })
    .catch(err => console.log("Database error while finding campgrounds"));
});

//  ADD NEW CAMPGROUND THROUGH MODAL FORMS
app.post("/campgrounds", (req, res) => {
  const newCampground = { ...req.body.campground };
  if (newCampground.name === "") {
    return res.status(400).json({ msg: "Campground can not be empty" });
  }
  Campground.create(newCampground)
    .then(dbCampground => {
      res.redirect("/campgrounds");
    })
    .catch(err =>
      res.status(400).json({ msg: "Can not create a new campground" })
    );
});

//  SHOW SPECIFIC CAMPGROUND
app.get("/campgrounds/:campgroundId", (req, res) => {
  Campground.findById(req.params.campgroundId)
    .then(dbCampground => {
      res.render("campgrounds/campground.ejs", { ejsCampground: dbCampground });
    })
    .catch(err => res.status(404).json({ msg: "Campground Not Found" }));
});

//  UPDATE CAMPGROUND THROUGH FORM MODAL
app.put("/campgrounds/:campgroundId", (req, res) => {
  const newCampground = { ...req.body.campground };
  Campground.findByIdAndUpdate(req.params.campgroundId, newCampground)
    .then(() => {
      res.redirect("/campgrounds/" + req.params.campgroundId);
    })
    .catch(err => res.status(400).json({ msg: "Can not update a campground" }));
});

//  DELETE CAMPGROUND
app.delete("/campgrounds/:campgroundId", (req, res) => {
  Campground.findByIdAndRemove(req.params.campgroundId)
    .then(() => {
      res.redirect("/campgrounds");
    })
    .catch(err =>
      res.status(400).json({ msg: "Campground can not be deleted" })
    );
});

//  SERVER STARTUP
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT ${PORT}`);
});
