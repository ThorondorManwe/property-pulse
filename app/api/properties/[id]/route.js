import connectDB from "../../../../config/database.js";
import Property from "../../../../models/Property.js";

// GET /api/properties/:id
export const GET = async (request, { params }) => {
    try {
        await connectDB();

        const property = await Property.findById(params.id);

        if (!property) {
            return new Response('Property Not Found', { status: 404 });
        }

        return new Response(JSON.stringify(property), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Something went Wrong', { status: 500 });
    }
};