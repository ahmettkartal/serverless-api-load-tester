import mongoose from 'mongoose'

const Schema = mongoose.Schema

const LoadTestSchema = new Schema({
    iteration: {
        type: Number,
        required: true
    },
    request_data: {
        type: Object,
        required: true
    },
    result: {
        type: String,
        required: true,
        enum: ["SUCCESS", "ERROR"]
    },
    error : {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default LoadTestSchema