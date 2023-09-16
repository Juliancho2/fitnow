const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = require('mongoose');

const bodyTargetShema = new Schema({
    name:String,
    description:String
})

bodyTargetShema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})
bodyTargetShema.plugin(uniqueValidator)
const BodyTarget = model('bodyTarget', bodyTargetShema)

module.exports = BodyTarget
