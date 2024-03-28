import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";

export const getSessionUser = async (request) => {

    try {
        const session = await getServerSession(authOptions);

        // This code handles if the user is not logged in
        if (!session || !session.user) {
            return null;
        }

        return {
            user: session.user,
            userId: session.user.id,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};
