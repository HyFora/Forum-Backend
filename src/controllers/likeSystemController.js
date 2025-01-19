import { Thread } from "../models/threadModel.js";
import { User } from "../models/userModel.js";

export const likeSystem = async (req, res, next) => {
  try {
    const threadId = req.params.threadId;
    const userId = req.params.userId;

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    //Validate UserId
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");

    const thread = await Thread.findById(id);

    const index = thread.likes.findIndex((id) => id === String(req.userId));
    console.log(index);
    if (index === -1) {
      thread.likes.push(req.userId);
    } else {
      thread.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    return res.json(updatedPost);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
