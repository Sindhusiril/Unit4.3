var express = require('express');
var tennisModel = require('./models/tennis.model');

var router = express.Router();
var age_sort = -1
var title_sort = -1
var ranking_sort = -1

// 1. List and Filter
router.get('/list', async (req, res) => {
    try {
        const filters = {};
        if (req.query.name) {
            filters.name = req.query.name;
        }
        if (req.query.country) {
            filters.country = req.query.country;
        }
        if (req.query.hand) {
            filters.handedness = req.query.hand;
        }
        const players = await tennisModel.find(filters);
        res.json(players);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Add plant
router.post('/addPlayer', async (req, res) => {
    const player = new tennisModel({
        name: req.body.name,
        country: req.body.country,
        ranking: req.body.ranking,
        age: req.body.age,
        height: req.body.height,
        handedness: req.body.hand,
        titles: req.body.titles
    })

    try {
        const data = await player.save();
        res.status(200).json(data)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// 3. Delete plant
router.delete('/deletePlayer/:name', async (req, res) => {
    try {
        var player = await tennisModel.find({ "name": req.params.name })
        player = await tennisModel.findByIdAndDelete(player[0]._id)
        res.json({ "message": `Player "${req.params.name}" deleted` })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// 4. Update plant
router.patch('/updatePlayer/:name', async (req, res) => {
    var update_player = new tennisModel({
        name: req.body.name,
        country: req.body.country,
        ranking: req.body.ranking,
        age: req.body.age,
        height: req.body.height,
        handedness: req.body.hand,
        titles: req.body.titles
    })
    try {
        var player = await tennisModel.find({ "name": req.params.name })
        player = await tennisModel.findByIdAndDelete(player[0]._id)
        const data = await update_player.save();
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// 5. Sort
router.get("/sortByAge", async (_, res) => {
    try {
        const players = await tennisModel.find().sort({ age: age_sort });
        age_sort = age_sort == 0 ? -1 : 0
        res.json(players)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get("/sortByTitles", async (_, res) => {
    try {
        const players = await tennisModel.find().sort({ titles: title_sort });
        title_sort = title_sort == 0 ? -1 : 0
        res.json(players)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get("/sortByRanking", async (_, res) => {
    try {
        const players = await tennisModel.find().sort({ ranking: ranking_sort });
        ranking_sort = ranking_sort == 0 ? -1 : 0
        res.json(players)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;