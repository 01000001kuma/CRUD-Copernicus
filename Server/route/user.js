const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
  country: { type: String, required: true }
});

const userModel = mongoose.model("users", userSchema);

router.use(express.json());

// Add a new user

router.post("/adding", (req, res) => {
  const newUser = new userModel({
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    company: req.body.company,
    country: req.body.country
  });

  newUser.save()
    .then(() => {
      res.send("User added successfully");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Get all users

router.get("/list", async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const currentPage = parseInt(req.query.page) || 1;
    const totalUsers = await userModel.countDocuments({});
    const totalPages = Math.ceil(totalUsers / pageSize);
    const users = await userModel
      .find({})
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    res.send({
      users,
      currentPage,
      totalPages,
      totalUsers,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get user data

router.get("/obtaindatauser/:userId", async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.userId });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update user

router.put('/updateuser/:userId', async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: req.params.userId },
      {
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        company: req.body.company,
        country: req.body.country,
      }
    );

    if (user) {
      res.send('User updated successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete user

router.post("/deleteuser", async (req, res) => {
  try {
    const result = await userModel.findOneAndDelete({iduser:req.body.iduser});
    if (result) {
      res.send('User deleted successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;