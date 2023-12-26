const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        courses: new Array()
    });

    res.status(200).json({msg: "New user created successfully.", userId: newUser._id});
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find();
    res.json(this.allCourses);
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    const user = await User.findOne({username});
    console.log("user-> ", user);
    let courses = user.courses;
    console.log("before courses-> ", courses);
    if(user.courses) {
        courses.push(courseId);
    } else {
        courses = [courseId];
    }
    console.log("after courses-> ", courses);
    const result = await User.updateOne({username}, {courses: courses});
    const finalUser = await User.find({username});
    res.json({msg: "Course purchased successfully", finalUser});
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const user = await User.findOne({username}).populate("courses");
    res.json(user);
});

module.exports = router