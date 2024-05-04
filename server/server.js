require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db/index.js");
const cors  = require('cors');




const app  = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

//Get all restaurants

app.get("/api/v1/restaurants", async (req, res) => {
    try {

        const results = await db.query("SELECT * FROM restaurants");
        res.status(200).json({
            status: "success",
            data: {
                restaurants: results.rows,
            }
        });
    } catch (error) {
        console.log(error);
    }
});

//Get a restaurant

app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id]);
        console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        });
    } catch (error) {
        console.log(error)
    }
});

//Create restaurant

app.post("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
        [req.body.name, req.body.location, req.body.price_range])
        console.log(results.rows[0]);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
                
            },
            
        });
    } catch (error) {
        console.log(error);
    }
});

// Update restaurants

app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4  RETURNING *", 
        [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        });
    } catch (error) {
        console.log(error);
    }
});

//Delete

app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
        
    } catch (error) {
        console.log(error);
    }
});

const port = process.env.PORT || 3008;
app.listen(port, ()=> {
    console.log(`Server is up and listening on port  ${port}`);
});

