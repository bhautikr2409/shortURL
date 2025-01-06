const express = require('express');
const path = require('path')
const {connectDB} = require('./connect')
const urlRoute = require('./routes/url')
const staicRoute = require('./routes/staticRouter')
const app = express();
const URL = require('./models/url')
const port = 6001

connectDB('mongodb://localhost:27017/short-url')
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Failed to connect to MongoDB:', error.message));


app.set("view engine" , "ejs")
app.set('views' , path.resolve("./views"))


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/url" , urlRoute)
app.use('/',staicRoute)



app.get("/:shortId",async (req , res) => {  
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            {shortId : shortId},
            {$push : {visitHistory : {timestamp : Date.now()}}}
        )

        if (entry) {
            res.redirect(entry.redirectURL);
        } else {
            res.status(404).send('URL not found');
        }
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
}); 