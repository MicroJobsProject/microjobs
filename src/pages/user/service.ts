//DEPENDENCIES
import { client } from "../../api/client";

//NATIVE
import type {
  User,
  UpdateProfileData,
  ProfileResponse,
  ChangePasswordData,
} from "./types";

export async function getProfile(): Promise<User> {
  const { data } = await client.get<ProfileResponse>("/api/user/profile");
  return data.user;
}

export async function updateProfile(
  profileData: UpdateProfileData,
): Promise<User> {
  const { data } = await client.put<ProfileResponse>(
    "/api/user/profile",
    profileData,
  );
  return data.user;
}

export async function changePassword(
  passwordData: ChangePasswordData,
): Promise<void> {
  await client.put("/api/user/password", {
    currentPassword: passwordData.currentPassword,
    newPassword: passwordData.newPassword,
  });
}

export async function deleteAccount(password: string): Promise<void> {
  await client.delete("/api/user/account", {
    data: { password },
  });
}
