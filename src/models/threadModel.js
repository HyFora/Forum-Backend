import {Schema, model} from 'mongoose';

const threadSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true
        },
        {
            
            content: type: String,
            trim: true,
            required: true
        }
    }
)