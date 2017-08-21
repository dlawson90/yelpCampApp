var mongoose = require('mongoose'),
    Campground  = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
        {
            name: "Riverwood Camp",
            image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            name: "Cheydinhal Village",
            image: "https://farm4.staticflickr.com/3189/3062178880_4edc3b60d5.jpg",
            description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            name: "Castle Black",
            image: "https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
        
    ]; 
 
function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        }
        console.log("Campgrounds removed!")
        // add a few campgrounds
        for(var i = 0; i < data.length; i++){
            Campground.create(data[i], function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added a campground!");
                    // create a comment
                    Comment.create(
                        {
                            text: "More wi-fi needed!",
                            author: "Bob Smith"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a mew comment!");
                            }
                        });
                }
            });
        }
    });
} 

module.exports = seedDB;
