import connectDB from "../../../../config/database.js";
import Property from "../../../../models/Property.js";
import { getSessionUser } from "../../../../utils/getSessionUser.js";

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) {
      return new Response("Property Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went Wrong", { status: 500 });
  }
};

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;

    const sessionUser = await getSessionUser();

    // Check if user is logged in
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property) return new Response("Property Not Found", { status: 404 });

    // Verify ownership
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Delete property
    await property.deleteOne();

    return new Response("Property Deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;
    const { userId } = await getSessionUser();
    const formData = await request.formData();

    // Access all values for amenities
    const amenities = formData.getAll("amenities");

    // Fetch the existing property's data
    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return new Response("Property Not Found", { status: 404 });
    }

    // Check if the user is the owner of the property
    if (existingProperty.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Create the propertyData object with updated values
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly."),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    // Update the property with the propertyData object
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to edit property", { status: 500 });
  }
};
