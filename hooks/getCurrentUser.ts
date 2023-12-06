import { options } from "@/app/api/auth/[...nextauth]/options";
import { getUserByEmail } from "@/lib/actions/users.actions";
import { getServerSession } from "next-auth";

export async function getCurrentUser() {
  try {
    const session = await getServerSession(options);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await getUserByEmail(session.user.email);

    if (!currentUser) {
      return null;
    }

    return currentUser._doc;
  } catch (error) {
    console.log(error);
  }
}
