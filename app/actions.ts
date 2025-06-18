"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update your profile." };
  }

  const profileData = {
    full_name: formData.get("full_name") as string,
    title: formData.get("title") as string,
    bio: formData.get("bio") as string,
    phone_number: formData.get("phone_number") as string,
  };

  const { error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/profile");
  return { error: null };
}
