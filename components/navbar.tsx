import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { hasEnvVars } from "@/lib/utils";
import { Home, Tag } from "lucide-react";
import Link from "next/link";
import { EnvVarWarning } from "./env-var-warning";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full justify-center border-b border-b-foreground/10 bg-background/95 backdrop-blur-sm">
      <div className="flex w-full max-w-7xl items-center justify-between p-3 px-5 text-sm">
        <div className="flex items-center gap-5 font-semibold">
          <Link href={"/"} className="flex items-center gap-2">
            <span className="text-lg">Pro-Link</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/pricing" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Pricing
            </Link>
          </Button>
          <div className="h-6 border-l" />
          {hasEnvVars ? <AuthButton /> : <EnvVarWarning />}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
