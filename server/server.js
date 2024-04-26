require("dotenv").config();
const express = require("express");




const app  = express();

app.get("/getRestaurants", (req, res) => {
    
})


const port = process.env.PORT || 3008;
app.listen(port, ()=> {
    console.log(`Server is up and listening on port  ${port}`);
});

