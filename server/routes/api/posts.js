const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get
router.get("/", async (req,res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

//add
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
});

//delete
router.delete('/:id', async (req,res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});


async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://yashan:123@cluster0-owwih.gcp.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        //useUnifiedTopology: true 
    });
    return client.db('vue_express').collection('posts');
}

module.exports = router;
