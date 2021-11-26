const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express() 
const mysql = require("mysql")

const db = mysql.createPool({ 
    host: "localhost",
    user: "root",
    password: "H@ndb@ll20",
    database: "KarimsKino_DB"
})

app.use(cors())

app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}))

//GET ALL
 
app.get("/api/get", (req, res) => { 

    const sqlSelect = "SELECT * from KarimsKino_DB.karims_kino"
    db.query(sqlSelect, (err, result) => { 
       res.send(result)
    })

})

//GET FILM BY FILM_ID

app.get("/api/get/:film_id", (req, res) => { 

    const film_id = req.params.film_id; 

    const sqlSelect = "SELECT * from KarimsKino_DB.karims_kino WHERE film_id = ?"
    db.query(sqlSelect, [film_id], (err, result) => { 
       res.send(result)
    })

})

//POST REQUEST

app.post("/api/insert", (req, res) => { 

    const movieName = req.body.movieName; 
    const duration = req.body.duration; 
    const img_src = req.body.img_src; 
    const description = req.body.description; 
    const rating = req.body.rating; 

    const sqlInsert = "INSERT INTO KarimsKino_DB.karims_kino (movieName, duration, img_src, description, rating) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [movieName, duration, img_src, description, rating], (err, result) => { 
        console.log(result);
        console.log(err)
    })
})

app.listen(3001, () => { 
    console.log("running on port 3001")
}); 