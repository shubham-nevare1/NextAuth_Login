import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function SuccessPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="p-4 text-center">Not authorized</div>;
  }
  console.log("session", session);

  return (
    <>
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-start py-10 px-4">
        <h1 className="text-4xl font-bold text-green-800 mb-8">
          Welcome to Dashboard
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6">
          <h2 className="text-2xl font-semibold text-green-700">
            ✅ Login Successful
          </h2>

          {session?.user?.profilePic && (
            <img
              src={session.user.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto border-4 border-green-300 object-cover"
            />
          )}

          <div className="space-y-2 text-gray-800 text-lg">
            <p>
              Welcome, <strong>{session?.user?.firstName || "User"}</strong>
            </p>
            <p>
              <strong>{session?.user?.email || "user@example.com"}</strong>
            </p>
            <p>
              Occupation:{" "}
              <strong>
                {session?.user?.personalInfo?.occupation || "Unknown"}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
