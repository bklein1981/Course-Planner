const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
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
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },

});

const Project = model('Project', projectSchema);

module.exports = Project;