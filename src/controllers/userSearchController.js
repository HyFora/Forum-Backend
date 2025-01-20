import { Thread } from "../models/threadModel.js";
import { User } from "../models/userModel.js";

export const filterThreadsbyUser = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "A user ID is required." });
  }
  try {
    // Find the user based on the userId
    const foundUser = await User.findOne({ _id: userId });

    // If the user is not found, return 404 error
    if (!foundUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Log the userId and the query for debugging
    console.log("Found User ID:", foundUser._id);

    // Get the username of the found user
    const username = foundUser.username;

    // Find threads authored by the user
    const threads = await Thread.find({ author: foundUser._id });

    // Log the result for debugging
    console.log("Threads found:", threads);

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
