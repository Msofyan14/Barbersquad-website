const isProduction = process.env.NODE_ENV === "production";

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);

    if (!response.ok) {
      throw new Error("Failed to fetch token");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
