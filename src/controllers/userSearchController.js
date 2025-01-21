import { Thread } from "../models/threadModel.js";
import { User } from "../models/userModel.js";

export const filterThreadsbyUser = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "A user ID is required." });
  }
  try {
    const foundUser = await User.findOne({ _id: userId });

    if (!foundUser) {
      return res.status(404).json({ error: "User not found." });
    }
    //Debug
    //console.log("Found User ID:", foundUser._id);

    const username = foundUser.username;

    // Find threads authored by the user
    const threads = await Thread.find({ author: foundUser._id });

    // Return the threads and username in the response
    res.status(200).json({
      message: `Threads by user ${username}`,
      threads: threads,
    });
  } catch (error) {
    console.error("Error while filtering threads of a user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
