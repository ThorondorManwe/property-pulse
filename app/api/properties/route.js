import connectDB from "../../../config/database.js";
import Property from "../../../models/Property.js";

// GET /api/properties
export const GET = async (request) => {
    try {
        await connectDB();

        const properties = await Property.find({});
        return new Response(JSON.stringify(properties), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Something went Wrong', { status: 500 });
    }
};