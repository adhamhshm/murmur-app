import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exist!"], //if the email exists, show email already exists
        required: [true, "Email already required!"],
    },
    username: {
        type: String,
        required: [true, "Username already required!"],
        //match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
})

//if working with a regular, always on, always running backend server we type this:
//const User = model("User", UserSchema);
//export default User;

//for next.js
//check if the user is there, if not then create a new model
const User = models.User || model("User", UserSchema);
export default User;

//the "models" object is provided by the mongoose library and stores all the registered models
//if a model named "User" already exists in the "models" object, it assigns that existing models to the new "User" variable
//this prevents redefining the model and ensures that the existing models is reused

//if a model named "User" does not exist in the "models" object, the "models" function from Mongoose is called to create a new model
//the newly created model is then assigned to the "User" variable