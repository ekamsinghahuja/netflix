const router = require("express").Router();
const Movie = require("../models/movie");
const verify = require("../verify")


//create->working
router.post("/",verify,async(req,res)=>{
    console.log(req.body);
    if(req.user.isAdmin){
        
        const newMovie = new Movie(req.body);
        try{
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } 
        catch(err){
            res.status(500).json(err); 
        }

    }
    else{
        res.status(403).json("you are not allowed");
    }
})

//update->working
router.put("/find/:id",verify,async(req,res)=>{
    if(req.user.isAdmin){
        try{
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            res.status(201).json(updatedMovie);
        } 
        catch(err){
            res.status(500).json(err); 
        }

    }
    else{
        res.status(403).json("you are not allowed");
    }
})
//get all->working
router.delete("/find/:id",verify,async(req,res)=>{
    if(req.user.isAdmin){
        try{
            await Movie.findByIdAndDelete(req.params.id);
            res.status(201).json("deleted");
        } 
        catch(err){
            res.status(500).json(err); 
        }
    }
    else{
        res.status(403).json("you are not allowed");
    }
})

//get->working
router.get("/find/:id",verify,async(req,res)=>{
    
    try{
        const movie = await Movie.findById(req.params.id);
        res.status(201).json(movie);
    } 
    catch(err){
        res.status(500).json(err); 
    }
    
});
//GET RANDOM
router.get("/random", verify, async (req, res) => {
  try {
      const type = req.query.type;
      
      // Get count of movies based on type
      const count = await Movie.countDocuments({ isSeries: type === "series" });

      // Generate a random index within the range of movie count
      const randomIndex = Math.floor(Math.random() * count);

      // Fetch a random movie based on the type and the generated index
      const randomMovie = await Movie.findOne({ isSeries: type === "series" }).skip(randomIndex);

      // Return the random movie
      res.status(200).json(randomMovie);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ message: "Internal server error" });
  }
});


//get all->working
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const movies = await Movie.find();
        res.status(200).json(movies.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
});


module.exports = router;