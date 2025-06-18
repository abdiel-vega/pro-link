"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check, User, Briefcase, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Database } from "@/types/supabase";

interface FormData {
  fullName: string;
  username: string;
  title: string;
  bio: string;
}

// The Omit utility is removed because the 'id' is required on insert.
// We will provide the 'id' directly from the authenticated user.

const steps = [
  {
    id: 1,
    title: "Personal Info",
    description: "Tell us about yourself",
    icon: User,
  },
  {
    id: 2,
    title: "Professional Details", 
    description: "What do you do?",
    icon: Briefcase,
  },
  {
    id: 3,
    title: "Your ProLink",
    description: "Claim your unique URL",
    icon: Globe,
  },
];

export function ProfileSetupForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    username: "",
    title: "",
    bio: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) {
          newErrors.fullName = "Full name is required";
        }
        break;
      case 2:
        if (!formData.title.trim()) {
          newErrors.title = "Professional title is required";
        }
        if (!formData.bio.trim()) {
          newErrors.bio = "Bio is required";
        } else if (formData.bio.length < 20) {
          newErrors.bio = "Bio should be at least 20 characters";
        }
        break;
      case 3:
        if (!formData.username.trim()) {
          newErrors.username = "Username is required";
        } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
          newErrors.username = "Username can only contain letters, numbers, hyphens, and underscores";
        } else if (isUsernameAvailable === false) {
          newErrors.username = "This username is already taken";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkUsernameAvailability = async (username: string) => {
    if (!username || username.length < 3) {
      setIsUsernameAvailable(null);
      return;
    }

    setCheckingUsername(true);
    const supabase = createClient();
    
    try {
      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username.toLowerCase())
        .single();
      
      setIsUsernameAvailable(!data);
    } catch (error) {
      setIsUsernameAvailable(true);
    } finally {
      setCheckingUsername(false);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase.from("profiles").insert({
        id: user.id,
        full_name: formData.fullName,
        username: formData.username.toLowerCase(),
        title: formData.title,
        bio: formData.bio,
      });

      if (error) throw error;

      router.push("/dashboard/profile");
    } catch (error) {
      console.error("Error creating profile:", error);
      setErrors({ submit: "Failed to create profile. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <Card className="w-full shadow-lg border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Setup Your Profile</CardTitle>
          <Badge variant="secondary" className="text-xs">
            Step {currentStep} of {steps.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex items-center justify-between text-sm">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center space-x-2 transition-all duration-300",
                  isActive && "text-primary",
                  isCompleted && "text-green-600"
                )}
              >
                <div
                  className={cn(
                    "rounded-full p-1.5 transition-all duration-300",
                    isActive && "bg-primary text-primary-foreground",
                    isCompleted && "bg-green-600 text-white",
                    !isActive && !isCompleted && "bg-muted"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <StepIcon className="h-3 w-3" />
                  )}
                </div>
                <span className="hidden sm:block font-medium">{step.title}</span>
              </div>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="min-h-[300px]">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5 duration-300">
              <div className="text-center space-y-2 mb-6">
                <h3 className="text-lg font-semibold">Let's start with the basics</h3>
                <p className="text-muted-foreground text-sm">
                  This information will be displayed on your public profile
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className={cn(errors.fullName && "border-destructive")}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Professional Details */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5 duration-300">
              <div className="text-center space-y-2 mb-6">
                <h3 className="text-lg font-semibold">What do you do?</h3>
                <p className="text-muted-foreground text-sm">
                  Help potential clients understand your expertise
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Professional Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateFormData("title", e.target.value)}
                  placeholder="e.g., Business Coach, Fitness Trainer, Marketing Consultant"
                  className={cn(errors.title && "border-destructive")}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">About You *</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => updateFormData("bio", e.target.value)}
                  placeholder="Tell potential clients about your experience, expertise, and what makes you unique..."
                  className={cn("min-h-[120px] resize-none", errors.bio && "border-destructive")}
                  maxLength={500}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{errors.bio || "Minimum 20 characters"}</span>
                  <span>{formData.bio.length}/500</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Username */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5 duration-300">
              <div className="text-center space-y-2 mb-6">
                <h3 className="text-lg font-semibold">Claim your ProLink URL</h3>
                <p className="text-muted-foreground text-sm">
                  Choose a unique username for your professional profile
                </p>
                <div className="bg-muted rounded-lg p-3 text-sm">
                  <span className="text-muted-foreground">Your profile will be available at: </span>
                  <br />
                  <code className="font-mono text-primary">
                    pro-link.co/{formData.username || "your-username"}
                  </code>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <div className="relative">
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => {
                      const value = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
                      updateFormData("username", value);
                      if (value.length >= 3) {
                        checkUsernameAvailability(value);
                      }
                    }}
                    placeholder="your-username"
                    className={cn(
                      "pr-10",
                      errors.username && "border-destructive",
                      isUsernameAvailable === true && "border-green-500",
                      isUsernameAvailable === false && "border-destructive"
                    )}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {checkingUsername && (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-primary" />
                    )}
                    {!checkingUsername && isUsernameAvailable === true && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
                {errors.username && (
                  <p className="text-sm text-destructive">{errors.username}</p>
                )}
                {!errors.username && isUsernameAvailable === true && (
                  <p className="text-sm text-green-600">✓ Username is available!</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Only letters, numbers, hyphens, and underscores allowed
                </p>
              </div>
            </div>
          )}
        </div>

        {errors.submit && (
          <p className="text-sm text-destructive text-center">{errors.submit}</p>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={nextStep} className="flex items-center space-x-2">
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isLoading || isUsernameAvailable !== true}
              className="flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  <span>Creating Profile...</span>
                </>
              ) : (
                <>
                  <span>Complete Setup</span>
                  <Check className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}