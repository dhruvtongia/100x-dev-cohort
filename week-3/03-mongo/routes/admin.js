const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const admin = new Admin({
            username: req.body.username,
            password: req.body.password
    });
    const newAdmin = await admin.save();
    res.status(200).json({msg: "Admin saved successfully."});
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const newCourse = await Course.create({
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        price: req.body.price
    });
    res.status(200).json({msg: "Course saved successfully.", courseId: newCourse._id});
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find();
    res.json(this.allCourses);
});

module.exports = router;