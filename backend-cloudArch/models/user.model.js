const {Schema, model}= require("mongoose");

const UserSchema= Schema({
    name: { type: String, required: true },

    username: {
    type: String,
    required: true,
    unique: [true, "El nombre de usuario ya esta en uso"],
    },
    password: { type: String, required: true },
    admin: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    raiz: {type: String}
})



module.exports= model("User",UserSchema,"users");