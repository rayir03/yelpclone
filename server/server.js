require("dotenv").config();
const express = require("express");
const morgan = require("morgan");




const app  = express();

app.use(express.json());
app.use(morgan("tiny"));

//Get all restaurants

app.get("/api/v1/restaurants", (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            restaurant: ["Mcdonald", "KFC"],
        }
    });
});

//Get a restaurant

app.get("/api/v1/restaurants/:id", (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            restaurant: ["Mcdonald", "KFC"],
        }
    });
});

//Create restaurant

app.post("/api/v1/restaurants/:id", (req, res) => {
    res.status(201).json({
        status: "success",
        data: {
            restaurant: ["Mcdonald", "KFC"],
        }
    });
});

// Update restaurants

app.put("/api/v1/restaurants/:id", (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            restaurant: ["Mcdonald", "KFC"],
        }
    });
});

//Delete

app.delete("/api/v1/restaurants/:id", (req, res) => {
    res.status(204).json({
        status: "success",
    });
});

const port = process.env.PORT || 3008;
app.listen(port, ()=> {
    console.log(`Server is up and listening on port  ${port}`);
});

