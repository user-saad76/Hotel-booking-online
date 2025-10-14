import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 15,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
});

const AdminUser = mongoose.model("AdminUser", adminUserSchema);
export default AdminUser;
