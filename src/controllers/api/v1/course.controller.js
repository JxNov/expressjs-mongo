const Course = require("../../../models/Course");
const { errorResponse } = require("../../../utils/response");

module.exports = {
  index: async (req, res) => {
    try {
      const courses = await Course.find();

      if (!courses) {
        const err = new Error("Courses not found");
        err.status = 404;
        throw err;
      }

      res.json({
        status: 200,
        data: courses,
      });
    } catch (error) {
      errorResponse({
        res,
        message: "Internal server error",
        status: 500,
        errors: error,
      });
    }
  },

  show: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);

      if (!course) {
        const err = new Error("Course not found");
        err.status = 404;
        throw err;
      }

      res.json({
        status: 200,
        data: course,
      });
    } catch (error) {
      errorResponse({
        res,
        message: "Internal server error",
        status: 500,
        errors: error,
      });
    }
  },

  store: async (req, res) => {
    try {
      const course = await Course.create(req.body);

      res.json({
        status: 201,
        data: course,
      });
    } catch (error) {
      errorResponse({
        res,
        message: "Internal server error",
        status: 500,
        errors: error,
      });
    }
  },

  update: async (req, res) => {
    try {
      const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!course) {
        const err = new Error("Course not found");
        err.status = 404;
        throw err;
      }

      res.json({
        status: 200,
        data: course,
      });
    } catch (error) {
      errorResponse({
        res,
        message: "Internal server error",
        status: 500,
        errors: error,
      });
    }
  },

  destroy: async (req, res) => {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);

      if (!course) {
        const err = new Error("Course not found");
        err.status = 404;
        throw err;
      }

      res.json({
        status: 200,
        message: "Course deleted successfully",
      });
    } catch (error) {
      errorResponse({
        res,
        message: "Internal server error",
        status: 500,
        errors: error,
      });
    }
  },
};
