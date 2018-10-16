const Comment = require("./models/Comment.js");
const mongoose = require("mongoose");
const Campground = require("./models/Campground.js");
const campgrounds = [
  {
    name: "Virginia State Parks",
    url: "https://c1.staticflickr.com/3/2924/14465824873_71a21a6027_k.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Random",
    url: "https://c1.staticflickr.com/4/3741/9586943706_b22f00e403_b.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Random 2",
    url: "https://c1.staticflickr.com/8/7457/9586944536_9c61259490_c.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

module.exports = function() {
  Campground.remove()
    .then(() => {
      console.log("Deleted all campgrounds");
      campgrounds.forEach(campground => {
        Campground.create(campground)
          .then(dbCampground => {
            Comment.create({
              text: "Rarey rarey rarey"
            })
              .then(dbComment => {
                dbCampground.comments.push(dbComment);
                dbCampground
                  .save()
                  .then(dbCampground => console.log("Success"))
                  .catch(err =>
                    console.log("Can not add comments to campgrounds")
                  );
              })
              .catch(err => console.log("Can not crete comment"));
          })
          .catch(err => console.console.log("Can not create campground"));
      });
    })
    .catch(err => console.log("Can not remove all camgrounds"));
};
