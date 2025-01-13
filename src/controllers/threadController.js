import {Thread} from "../models/threadModel.js"
import { User } from '../models/userModel.js';

export const getSingleThread = async (req, res, next)=>{
    try {
        const thread = await Thread.findById(req.params.ThreadId)
        if(!thread){
            const error = new Error("User not found.");
            error.status = 404;
            next(error);
        }
        res.json(thread)
    } catch(error){
        next(error)
    }
}

export const getAllThreads = async (req, res, next)=>{
    try {
        const allThreads = await Thread.find().populate("author");
        res.send(allThreads)

    } catch (error) {
        next(error)
    }
}

export const createThread = async (req, res, next)=>{
    try{
    const thread = new Thread({title: req.body.title, content: req.body.content, author: req.userId, })
    const savedThread = await thread.save();
    const user = await User.findById(req.userId); //params?
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
    user.threads.push({
        threadId: savedThread._id,
        title: savedThread.title,
        content: savedThread.content,
        author: savedThread,
        
      });

} catch (error){
next(error)
}
}


// changeThisThread,
// deleteThread