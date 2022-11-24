import mongoose from "mongoose";

const AttendanceSchema = mongoose.Schema({

    employeeID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    year: {type: Number, required: true},
    month: {type: Number, required: true},
    date: {type: Number, required: true},
    present: {type: Boolean, required: true},

});

const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;