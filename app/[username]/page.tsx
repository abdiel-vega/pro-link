import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, User } from "lucide-react";

interface Props {
  params: {
    username: string;
  };
}

export default async function UserProfilePage({ params }: Props) {
  const supabase = await createClient();
  
  // Fetch the user profile by username
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username.toLowerCase())
    .single();

  if (error || !profile) {
    notFound();
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <Card className="mb-8">
            <CardContent className="pt-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="" alt={profile.full_name || ""} />
                  <AvatarFallback className="text-2xl">
                    {profile.full_name ? getInitials(profile.full_name) : <User className="h-12 w-12" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-3xl font-bold mb-2">{profile.full_name}</h1>
                  {profile.title && (
                    <Badge variant="secondary" className="mb-4 text-sm">
                      {profile.title}
                    </Badge>
                  )}
                  {profile.bio && (
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {profile.bio}
                    </p>
                  )}
                  
                  {/* Contact Information */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    {profile.email && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${profile.email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </a>
                      </Button>
                    )}
                    {profile.phone_number && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`tel:${profile.phone_number}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services Section - Placeholder for future implementation */}
          <Card>
            <CardContent className="pt-8">
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">Services Coming Soon</h2>
                <p className="text-muted-foreground">
                  This professional is setting up their services. Check back soon!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}