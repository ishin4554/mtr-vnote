const { CourseModel } = require('../models');
const STATE = require('../constants/state');

const courseController = {
  addCourse: async (req, res) => {
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
        ...query
      })
      res.json(courses);
    } catch(err) {
      console.log(err)
      res.status(500).json(STATE.FAIL);
    }    
  },
  getCourse: async (req, res) => {
    try{
      const course = await CourseModel.findOne({id: req.params.id})
      res.json(course);
    } catch(err) {
      console.log(err)
      res.status(500).json(STATE.FAIL);
    }    
  },
}

module.exports = courseController;
