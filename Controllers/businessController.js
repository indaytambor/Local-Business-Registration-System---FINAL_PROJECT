import Business from "../models/Business.js";
import { successResponse, errorResponse } from "../helpers/responseHelper.js";

/**
 * GET all businesses
 */
export const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find().populate(
      "owner",
      "name email"
    );
    successResponse(res, 200, "Businesses retrieved successfully", businesses);
  } catch (error) {
    errorResponse(res, 500, "Error retrieving businesses", error);
  }
};

/**
 * REGISTER business
 */
export const registerBusiness = async (req, res) => {
  try {
    const {
      business_name,
      business_type,
      address,
      contact_number,
    } = req.body;

    if (!business_name || !business_type || !address || !contact_number) {
      return errorResponse(res, 400, "All required fields must be filled");
    }

    const newBusiness = await Business.create({
      business_name,
      business_type,
      address,
      contact_number,
      owner: req.user?.id, // owner user
    });

    successResponse(
      res,
      201,
      "Business registered successfully",
      newBusiness
    );
  } catch (error) {
    errorResponse(res, 500, "Error registering business", error);
  }
};

/**
 * UPDATE business
 */
export const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBusiness = await Business.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBusiness) {
      return errorResponse(res, 404, "Business not found");
    }

    successResponse(
      res,
      200,
      "Business updated successfully",
      updatedBusiness
    );
  } catch (error) {
    errorResponse(res, 500, "Error updating business", error);
  }
};

/**
 * DELETE business
 */
export const deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBusiness = await Business.findByIdAndDelete(id);

    if (!deletedBusiness) {
      return errorResponse(res, 404, "Business not found");
    }

    successResponse(res, 200, "Business deleted successfully");
  } catch (error) {
    errorResponse(res, 500, "Error deleting business", error);
  }
};
