const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    passwordHash: String,
    routine: [{
        type: Schema.Types.ObjectId,
        ref: 'Routine'
    }],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v

        delete returnedObject.passwordHash
    }
})
userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User