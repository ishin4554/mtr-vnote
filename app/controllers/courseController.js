const { CourseModel } = require('../models');
const STATE = require('../constants/state');

const courseController = {
  addCourse: async (req, res) => {
    console.log(req.body)
    const course = new CourseModel({
      ...req.body
    });
    await course.save();
    res.status(200).json(STATE.SUCCESS)
  },
  getCourses: async (req, res) => {
    try{
      const query = Object.keys(req.query).reduce((acc, key) => {
        if(req.query[key]) {
          acc[key] = req.query[key];
        } 
        return acc;
      }, {})
      const courses = await CourseModel.find({
        $or: [
          {userId: query.userId},
          {shareList: query.userId}
        ]
      }).populate({ path: 'user', select: 'id nickname' })
      res.json(courses);
    } catch(err) {
      console.log(err)
      res.status(500).json(STATE.FAIL);
    }    
  },
  getCourse: async (req, res) => {
    try{
      const course = await CourseModel.findOne({id: req.params.id})
        .populate({ path: 'user', select: 'id nickname' })
      res.json(course);
    } catch(err) {
      console.log(err)
      res.status(500).json(STATE.FAIL);
    }    
  },
  deleteCourse: async (req, res) => {
    try{
      await CourseModel.deleteOne({ id: req.params.id });
      res.json(STATE.SUCCESS);
    } catch(err) {
      console.log(err)
      res.status(500).json(STATE.FAIL);
    }    
  },
  updateCourse: async (req, res) => {
    try{
      await CourseModel.update(
        {id: req.params.id}, 
        req.body);
      res.json(STATE.SUCCESS);
    } catch(err) {
      console.log(err)
      res.status(500).json(STATE.FAIL);
    }    
  },
}

module.exports = courseController;
