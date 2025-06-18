import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfileSetupForm } from "@/components/profile-setup-form";

export default async function SetupPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Check if user already has a profile
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (existingProfile) {
    redirect("/dashboard/profile");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Pro-Link!</h1>
          <p className="text-muted-foreground">Let's set up your professional profile</p>
        </div>
        <ProfileSetupForm />
      </div>
    </div>
  );
}
