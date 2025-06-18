import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { EditProfileForm } from "@/components/edit-profile-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    // This case should be handled by middleware, but as a fallback
    redirect("/dashboard/setup");
  }

  return (
    <div className="p-4 md:p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your public profile information here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditProfileForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  );
}
