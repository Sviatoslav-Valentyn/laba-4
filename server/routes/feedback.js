const express = require('express');
const {feedback} = require('../models');

const router = express.Router();


router.get('/', async (req,res) => {
    const feedbackList = await feedback.findAll();
    res.status(200).json(feedbackList);
});

router.post('/', async (req,res) => {
    const {Comment} = req.body;
    const Feedback = await feedback.create({ ID_User: 1, Comment });
    res.status(200).json(Feedback);
});

router.delete(`/byId/:id`, async (req,res) => {
    const id = req.params.id;
    if (!id)
    {
        res.status(404).json({message: 'There is not that comment'})
    }
    const Feedback = await feedback.destroy({
        where: {ID_Feedback: id}})
        if (!Feedback) {
            res.status(464).json({message: 'Failed to delete comment'})
        }
        else{
            res.status(200).json(Feedback);
        }
});

module.exports = router;