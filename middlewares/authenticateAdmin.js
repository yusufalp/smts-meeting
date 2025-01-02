import CustomError from "../utils/CustomError.js";
import { decodeJwtToken } from "../utils/token.js";

const PROFILES_SERVICE_URL = process.env.PROFILES_SERVICE_URL;

async function authenticateAdmin(req, res, next) {
  const token = req.get("Authorization")?.split(" ")[1];

  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    const decoded = decodeJwtToken(token);

    const response = await fetch(
      `${PROFILES_SERVICE_URL}/api/profiles/profile`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new CustomError("Failed to fetch user profile", 400);
    }

    const profileResult = await response.json();

    const { profile } = profileResult.data;

    if (profile.role !== "admin") {
      throw new CustomError("Forbidden: Admins only", 401);
    }

    next();
  } catch (error) {
    next(error);
  }
}

export default authenticateAdmin;
