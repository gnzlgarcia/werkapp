import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import 'mongoose-type-email';
import generateId from '../helpers/generateId.js';

const UserSchema = mongoose.Schema({
    type: { type: String },
    email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date},
    contactNumber: { type: String },
    token: { type: String, default: generateId() },
    confirmed: { type: Boolean, default: false },
    department: String,
    Skills: [String],
    designation: String,
    dateAdded: { type: Date },
});

// UserSchema.methods.encryptPassword = function (password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
// };

// Hashear password
UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next;
    }
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
});

// Contrastar password
UserSchema.methods.checkPassword = async function (formPassword) {
    return await bcrypt.compare(formPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User; 
