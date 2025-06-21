import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  DollarSign,
  Link as LinkIcon,
  Rocket,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-background text-foreground">
      <Navbar />

      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <section className="w-full max-w-5xl flex flex-col items-center text-center gap-8 py-24 px-4">
          <Badge variant="outline" className="py-1 px-3 rounded-full">
            <Sparkles className="h-4 w-4 mr-2 text-primary" />
            0% commission on all transactions
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Stop Juggling Tools.
            <br />
            Start Selling Your Expertise.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Pro-Link is built with one goal: to turn your expertise into income,
            faster. We give you a powerful, focused toolkit to manage your
            entire client acquisition process from a single dashboard.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="lg">
              <Link href="/auth/sign-up">
                Create Your Page for Free <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
              14-day free trial. No credit card required.
          </p>
        </section>

        <section className="w-full max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center border rounded-xl p-8 bg-secondary/50">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold">Before Pro-Link</h3>
              <p className="text-muted-foreground">
                Juggling DMs, email threads, payment links, and scheduling
                apps. Your process is scattered, unprofessional, and costs you
                time and clients.
              </p>
              <ul className="text-muted-foreground list-disc list-inside space-y-2">
                <li>Scattered client info</li>
                <li>Manual invoicing and follow-ups</li>
                <li>Clunky payment experience</li>
                <li>No central hub for your services</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 p-8 rounded-xl bg-background border">
              <h3 className="text-2xl font-bold text-primary">
                After Pro-Link
              </h3>
              <p>
                One link to rule them all. A beautiful page, a clear service
                menu, and instant payments. You look professional, save hours,
                and convert more clients.
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary">
                <li>Increased Conversions</li>
                <li>Enhanced Professionalism</li>
                <li>Time Saved</li>
                <li>Seamless Client Experience</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="w-full max-w-5xl flex flex-col items-center text-center gap-12 py-24 px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Your All-in-One Toolkit
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <div className="flex flex-col gap-2 p-6 border rounded-lg transition-transform hover:scale-105 hover:shadow-lg">
              <Zap className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold text-lg">
                Your Professional Home Online
              </h3>
              <p className="text-muted-foreground text-sm">
                Go live in minutes with a beautiful, mobile-first landing page
                that showcases your photo, bio, and professional title.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-6 border rounded-lg transition-transform hover:scale-105 hover:shadow-lg">
              <DollarSign className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold text-lg">
                An Instant, Shoppable Service Menu
              </h3>
              <p className="text-muted-foreground text-sm">
                Create a clean menu of your services with clear pricing. Your
                clients can browse and buy on the spot.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-6 border rounded-lg transition-transform hover:scale-105 hover:shadow-lg">
              <CreditCard className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold text-lg">
                Get Paid Instantly. Zero Hassle.
              </h3>
              <p className="text-muted-foreground text-sm">
                Connect your Stripe account. When a client books, the payment
                goes directly to you. No commission, no invoicing.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-6 border rounded-lg transition-transform hover:scale-105 hover:shadow-lg">
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold text-lg">Your Simple Client Rolodex</h3>
              <p className="text-muted-foreground text-sm">
                Every time a client pays, their information is automatically
                captured in your dashboard.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-6 border rounded-lg transition-transform hover:scale-105 hover:shadow-lg">
              <LinkIcon className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold text-lg">One Link to Rule Them All</h3>
              <p className="text-muted-foreground text-sm">
                Claim your unique yourname.pro-link.co URL and put it
                everywhere. It's the only link you'll ever need.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-6 border rounded-lg bg-primary/5 text-primary transition-transform hover:scale-105 hover:shadow-lg">
              <Sparkles className="h-8 w-8 mb-2" />
              <h3 className="font-bold text-lg">And so much more...</h3>
              <p className="text-sm">
                We're constantly adding new features to help you grow your
                business.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-5xl flex flex-col items-center gap-12 py-24 px-4 bg-secondary/50 rounded-xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Launch Today. Grow With Us Tomorrow.
            </h2>
            <p className="max-w-2xl mt-4 text-lg text-muted-foreground">
              We're focused on delivering a core set of powerful features right
              now. But we're just getting started.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 w-full">
            <div className="p-6 border rounded-lg bg-background">
              <h3 className="font-bold text-xl mb-4">
                Everything You Need to Get Paid Today
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold">
                      A Beautiful, Live Profile Page:
                    </span>{" "}
                    Go from signup to a stunning, shareable page in under 5
                    minutes.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold">
                      Your Unique ProLink URL:
                    </span>{" "}
                    Claim your yourname.pro-link.co address.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold">
                      Direct Stripe Integration:
                    </span>{" "}
                    Securely connect your own Stripe account.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold">
                      Frictionless Client Checkout:
                    </span>{" "}
                    Clients can pay in seconds from any device.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold">
                      Simple Service Management:
                    </span>{" "}
                    Easily add, edit, and price your services.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold">
                      Automated Notifications:
                    </span>{" "}
                    Receive an instant email with new client's details.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold">
                      Client Contact Logging:
                    </span>{" "}
                    Every transaction is recorded in your dashboard.
                  </span>
                </li>
              </ul>
            </div>
            <div className="p-6 border rounded-lg bg-background">
              <h3 className="font-bold text-xl mb-4">
                The Future is Bright: What's Coming Next
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Rocket className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold">Built-in Scheduling:</span>{" "}
                    Let clients book a time on your calendar immediately after
                    payment.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Rocket className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold">
                      Custom Domain Mapping:
                    </span>{" "}
                    Point your own domain to your ProLink page.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Rocket className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold">
                      Page Themes & Customization:
                    </span>{" "}
                    Choose from multiple visual styles.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Rocket className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold">Service Packages:</span>{" "}
                    Bundle multiple sessions together.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Rocket className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold">
                      Client Testimonial Blocks:
                    </span>{" "}
                    Add a dedicated section to showcase glowing reviews.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="w-full max-w-5xl flex flex-col items-center text-center gap-8 py-24 px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to Simplify Your Business?
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Join hundreds of professionals who have stopped juggling tools and
            started focusing on what they do best.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="lg">
              <Link href="/auth/sign-up">
                Start Your Free Trial <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
              0% commission. Cancel anytime.
          </p>
        </section>
      </div>      <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
        <p>
          © 2025 Pro-Link. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
