const { CommentModel } = require('../models');
const STATE = require('../constants/state');

const commentController = {
  addComment: async (req, res) => {
    const comment = new CommentModel({
      ...req.body
    });
    await comment.save();
    res.status(200).json(STATE.SUCCESS)
  },
  getComments: async (req, res) => {
    try{
      const query = Object.keys(req.query).reduce((acc, key) => {
        if(req.query[key]) {
          acc[key] = req.query[key];
        } 
        return acc;
      }, {})
      const comments = await CommentModel.find({
        ...query
      })
      res.json(comments);
    } catch(err) {
      console.log(err)
      res.status(500).json(STATE.FAIL);
    }    
  },
  updateComment: async (req, res) => {
    try{
      const updateComment = await CommentModel.update(
        {id: req.params.id}, 
        res.body);
      res.json(STATE.SUCCESS);
    } catch(err) {
      console.log(err)
      res.status(500).json(STATE.FAIL);
    }    
  },
  deleteComment: async (req, res) => {
    try{
      await CommentModel.deleteOne({ id: req.params.id });
      res.json(STATE.SUCCESS);
    } catch(err) {
      console.log(err)
      res.status(500).json(STATE.FAIL);
    }    
  }
};

module.exports = commentController;
