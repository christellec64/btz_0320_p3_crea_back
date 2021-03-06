const express = require("express");
const router = express.Router();
const Reply = require("../../../models/Reply");
const User = require("../../../models/User");
const Post = require("../../../models/Post");
const authRole = require("../../../middleware/authRole");

router.get("/", authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const replies = await Reply.findAll();
    res.status(200).json(replies);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const { id } = req.params;
    const reply = await Reply.findAll({
      where: { id },
      include: [
        {
          model: User,
        },
        {
          model: Post,
        },
      ],
    });
    res.status(200).json(reply);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post("/", async (req, res) => {
//   const {
//     comment,
//     title,
//     resume,
//     UserId,
//     PostId,
//     userPostId,
//     titlePost,
//   } = req.body;
//   try {
//     const user = await Reply.create({
//       comment,
//       title,
//       resume,
//       UserId,
//       PostId,
//       userPostId,
//       titlePost,
//     });
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(422).json(err);
//   }
// });

// router.put("/:id", async (req, res) => {
//   const {
//     title,
//     resume,
//     comment,
//     UserId,
//     PostId,
//     userPostId,
//     titlePost,
//   } = req.body;
//   const { id } = req.params;
//   try {
//     const user = await User.update(
//       {
//         title,
//         resume,
//         comment,
//         UserId,
//         PostId,
//         userPostId,
//         titlePost,
//       },
//       { where: { id } }
//     );
//     res.status(202).json(user);
//   } catch (err) {
//     res.status(422).json(err);
//   }
// });

router.delete("/:id", authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const { id } = req.params;
    await Reply.destroy({
      where: { id },
    });
    res.status(205).json({ message: "Reply is deleted" });
  } catch (err) {
    res.status(422).json(err);
  }
});

router.post("/apply", authRole(["ADMIN", "USER"]), async (req, res) => {
  const {
    title,
    comment,
    resume,
    UserId,
    PostId,
    userPostId,
    titlePost,
  } = req.body;
  try {
    // const user = User.findByPk(UserId);
    const reply = await Reply.create({
      title,
      comment,
      resume,
      UserId,
      PostId,
      userPostId,
      titlePost,
    });
    res.status(201).json(reply);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

module.exports = router;
