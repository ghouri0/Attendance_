import mongoose from 'mongoose';

const attendSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    details: [{
        email: {
            type: String,
            required: true
        },
        status: String
    }]
})

export default mongoose.model('Attendance', attendSchema);