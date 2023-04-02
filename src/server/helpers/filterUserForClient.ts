import { type User } from "@clerk/nextjs/dist/api";

// Define the filterUserForclient function that takes a user object as input
// Purpose is to filter out sensitive information from the user object
// before sending it to the client.
export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};
