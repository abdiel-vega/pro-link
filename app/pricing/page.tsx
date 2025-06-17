import { AuthButton } from "@/components/auth-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EnvVarWarning } from "@/components/env-var-warning";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Link as LinkIcon,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/navbar";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => (
  <div className="border-b">
    <details className="group py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
        {question}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <p className="mt-2 text-muted-foreground">{answer}</p>
    </details>
  </div>
);

const FeatureItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col gap-2 rounded-lg border bg-background p-6 transition-transform hover:scale-105 hover:shadow-lg">
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default async function PricingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto space-y-4 px-4 text-center md:px-6">
            <Badge variant="outline" className="rounded-full px-3 py-1">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
              One Plan to Rule Them All
            </h1>
            <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl">
              Focus on your clients, not on complex tiers. Get every feature we
              have, and every feature we will ever build, for one simple price.
            </p>
          </div>
        </section>

        <section className="w-full pb-12 md:pb-24 lg:pb-32">
          <div className="container mx-auto grid max-w-5xl items-start gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
            <Card className="relative flex h-full flex-col transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle>Monthly</CardTitle>
                <CardDescription>
                  Pay as you go. Perfect for getting started.
                </CardDescription>
                <div className="flex items-baseline gap-2 pt-4">
                  <span className="text-5xl font-bold">$39</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>All features included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>
                      0% commission on your earnings, keep everything you make
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>
                      A beautiful, high-converting page for your services
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Secure, direct-to-you payments powered by Stripe</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Unlimited services and client transactions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Cancel anytime, no questions asked</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full">
                  <Link href={user ? "/dashboard/account" : "/auth/login"}>
                    {user ? "Go to Dashboard" : "Start 14-Day Free Trial"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="relative flex h-full flex-col border-2 border-primary shadow-lg transition-transform hover:scale-105">
              <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1">
                Best Value
              </Badge>
              <CardHeader>
                <CardTitle>Yearly</CardTitle>
                <CardDescription>
                  Get 2 months free with the annual plan.
                </CardDescription>
                <div className="flex items-baseline gap-2 pt-4">
                  <span className="text-5xl font-bold">$390</span>
                  <span className="text-muted-foreground">/year</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>All features included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="font-semibold">
                      Get 2 months free (best value)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>
                      0% commission on your earnings, keep everything you make
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Lock in your price for a full year</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Pays for itself with just a few clients</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>
                      The complete toolkit to grow your independent business
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full">
                  <Link href={user ? "/dashboard/account" : "/auth/login"}>
                    {user ? "Go to Dashboard" : "Start 14-Day Free Trial"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            All plans start with a 14-day free trial. No credit card required.
          </p>
        </section>

        <section className="w-full bg-secondary/50 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Every Feature for Your Success
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Our Pro plan is packed with everything you need to turn your
                expertise into a thriving business.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureItem
                title="Beautiful Profile Page"
                description="A stunning, shareable page live in minutes."
              />
              <FeatureItem
                title="Your Unique ProLink URL"
                description="Claim your yourname.pro-link.co address."
              />
              <FeatureItem
                title="Direct Stripe Integration"
                description="Securely connect your own Stripe account. We take 0% commission."
              />
              <FeatureItem
                title="Frictionless Client Checkout"
                description="Clients can pay in seconds from any device."
              />
              <FeatureItem
                title="Simple Service Management"
                description="Easily add, edit, and price your services."
              />
              <FeatureItem
                title="Client Contact Logging"
                description="Every transaction is recorded in your dashboard."
              />
              <FeatureItem
                title="Automated Notifications"
                description="Receive an instant email with new client's details."
              />
              <FeatureItem
                title="Built-in Scheduling (Coming Soon)"
                description="Let clients book time after payment."
              />
              <FeatureItem
                title="And much more..."
                description="We're constantly adding new features to help you grow."
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <FAQItem
                question="Is there a free trial?"
                answer="Yes! You can try Pro-Link completely free for 14 days. No credit card is required to start. You'll have access to all features."
              />
              <FAQItem
                question="Do you take a commission on my sales?"
                answer="Absolutely not. We charge a flat subscription fee. You connect your own Stripe account, and all payments from your clients go directly to you. Stripe's standard processing fees apply, but we don't take a cut."
              />
              <FAQItem
                question="What happens after my free trial ends?"
                answer="After 14 days, you'll be prompted to choose a paid plan (monthly or yearly) to continue using your Pro-Link page. If you don't subscribe, your page will be deactivated, but you can reactivate it anytime by subscribing."
              />
              <FAQItem
                question="Can I cancel my subscription?"
                answer="Yes, you can cancel your subscription at any time from your account dashboard. If you cancel, you'll retain access until the end of your current billing period."
              />
              <FAQItem
                question="Is this a replacement for my website?"
                answer="It can be! For many coaches, consultants, and freelancers, Pro-Link is all they need. It's simpler and more focused on client acquisition than a traditional website. However, you can also use it as a powerful link-in-bio tool to complement your existing site."
              />
            </div>
          </div>
        </section>

        <section className="w-full bg-primary py-12 text-primary-foreground md:py-24 lg:py-32">
          <div className="container mx-auto px-4 text-center md:px-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to Get Paid?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
              Stop juggling tools and start monetizing your expertise. Your
              professional, high-converting page is just a few clicks away.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary">
                <Link href={user ? "/dashboard/account" : "/auth/login"}>
                  {user ? "Go to Dashboard" : "Start Your Free Trial Today"}{" "}
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}