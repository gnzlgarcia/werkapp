import mongoose from "mongoose";
import 'mongoose-type-email';


const EmployeeSchema = mongoose.Schema({

    employeeId: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    contactNumber: { type: String, required: true },
    department: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

},
    {
        timestamps: true,
    }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;