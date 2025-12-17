import User from "../models/User.js";
import { successResponse, errorResponse } from "../helpers/responseHelper.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    successResponse(res, 200, "Users retrieved successfully", users);
  } catch (error) {
    errorResponse(res, 500, "Error retrieving users", error);
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, 400, "All required fields must be filled");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "Email already exists");
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role: role || "Owner",
    });

    successResponse(res, 201, "User registered successfully", newUser);
  } catch (error) {
    errorResponse(res, 500, "Error registering user", error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, 200, "User updated successfully", updatedUser);
  } catch (error) {
    errorResponse(res, 500, "Error updating user", error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, 200, "User deleted successfully");
  } catch (error) {
    errorResponse(res, 500, "Error deleting user", error);
  }
};
