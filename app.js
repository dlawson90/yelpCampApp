var express     = require('express'),
    app         = express(),
    bodyparser  = require('body-parser'),
    flash       = require('connect-flash'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    methodOver  = require('method-override'),
    localStrat  = require('passport-local'),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

// Route Files
var commentRoutes       = require('./routes/comments'),
    campgroundRoutes    = require('./routes/campgrounds'),
    indexRoutes         = require('./routes/index');
    
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"; 

mongoose.connect(url, {useMongoClient: true});
//mongoose.connect("mongodb://admin:qwerty123@ds153413.mlab.com:53413/yelpcamp-dl", {useMongoClient: true});

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOver("_method"));
app.use(flash());
app.set("view engine", "ejs");

// seedDB(); // seed the database

// Passport Configuration

app.use(require('express-session')({
    secret: "Finney is awesome!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrat(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

// Listen for server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp App started successfully.")
});