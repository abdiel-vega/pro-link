// filepath: c:\Users\abdie\pro-link\app\setup\page.tsx
import { ProfileSetupForm } from "@/components/forms/profile-setup-form"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Welcome to ProLink
          </h1>
          <p className="text-muted-foreground">
            Let's set up your professional profile to get started
          </p>
        </div>
        <ProfileSetupForm />
      </div>
    </div>
  )
}