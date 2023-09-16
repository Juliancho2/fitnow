const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = require('mongoose');

const routineShema = new Schema({
    day: String,
    exersiceItem: Array,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

routineShema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})
routineShema.plugin(uniqueValidator)

const Routine = model('Routine', routineShema)

module.exports = Routine
