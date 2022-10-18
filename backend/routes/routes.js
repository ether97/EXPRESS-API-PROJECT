const express = require('express');
const router = express.Router();



let data = [];

router.get("/", (req,res) => {
    res.status(200).json(data);
})

router.post("/", (req,res) => {
    data.push(req.body.name);
    res.status(200).json(req.body)
})

router.put("/", (req,res) => {
    data = data.map((item) => {
        if (item === req.body.name) {
            return req.body.data
        }
            return item
    })
    res.status(200).json({message: 'PUT REQUEST SUCCESSFUL'})
})

router.delete("/", (req,res) => {
    data = data.filter(item => item !== req.body.name);
    res.status(200).json(req.body)
})



module.exports = router;