import Router from "express";

const router = Router();

import Enrolment from "../Model/Enrolment.js";
import Student from "../Model/Student.js";
import Activity from "../Model/Activity.js";

// Get all enrolments
router.get("/api/enrolments", async (req, res) => {
  try {
    const enrolments = await Enrolment.find();
    res.status(200).json(enrolments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get all enrolments from the last 2 days
router.get("/api/enrolments/last2days", async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Calculate the date two days ago
    const twoDaysAgo = new Date(currentDate);
    twoDaysAgo.setDate(currentDate.getDate() - 2);

    // MongoDB Query Operators
    //$gte (Greater Than or Equal To)
    //$lte (Less Than or Equal To)
    const enrolments = await Enrolment.find({
      dateEnrolled: { $gte: twoDaysAgo, $lte: currentDate },
    });

    res.status(200).json(enrolments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get all enrolments from the last N days
router.get("/api/enrolments/last-n-days/:days", async (req, res) => {
  // :days is the route parameter. The : indicates that this part of the path is a variable that can change.
  try {
    // Get the number of days from the request parameters
    const days = parseInt(req.params.days, 10); // Convert the parameter to an integer

    if (isNaN(days) || days < 0) {
      return res.status(400).json({ error: "Invalid number of days" });
    }

    // Get the current date
    const currentDate = new Date();

    // Calculate the date N days ago
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() - days);

    // Find enrolments created in the last N days
    const enrolments = await Enrolment.find({
      dateEnrolled: { $gte: targetDate, $lte: currentDate },
    });

    res.status(200).json(enrolments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get the most popular activities
router.get("/api/enrolments/popular-activities", async (req, res) => {
  try {
    // Find all activities
    const activities = await Activity.find();

    // Create an array to hold activity popularity
    const activityPopularity = [];

    // Loop through each activity and count the number of enrolments
    for (const activity of activities) {
      const enrolmentCount = await Enrolment.countDocuments({
        activityId: activity._id,
      });
      activityPopularity.push({
        activityId: activity._id,
        activityTitle: activity.activityTitle,
        count: enrolmentCount,
      });
    }

    // Sort activities by enrolment count in descending order
    activityPopularity.sort((a, b) => b.count - a.count);

    // Limit to top 5 activities
    const topActivities = activityPopularity.slice(0, 5);

    res.status(200).json(topActivities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new enrolment
router.post("/api/enrolments", async (req, res) => {
  try {
    const { studentId, activityId } = req.body;

    const enrolment = new Enrolment({
      studentId,
      activityId,
    });

    const savedEnrolment = await enrolment.save();

    res.status(201).json(savedEnrolment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an enrolment by ID
router.delete("/api/enrolments/:id", async (req, res) => {
  try {
    await Enrolment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
