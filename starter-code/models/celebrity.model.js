const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const celebritySchema = new Schema ({
    name: String,
    occupation: String,
    catchphrase: String,
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie' //Relates to the Author model
    },
});

module.exports = model('Celebrity', celebritySchema)