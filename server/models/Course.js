const { Schema, model } = require('mongoose');


const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
        trim: true
    },
    startDate: {
        type: Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
    subjectId: { // Add this line
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
});

const Course = model('Course', courseSchema);

module.exports = Course;