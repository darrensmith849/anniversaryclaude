import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PlanPage() {
  return (
    <div className="container max-w-2xl py-16">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Plan Your Anniversary</CardTitle>
          <CardDescription>
            Tell us a little about yourselves and we&apos;ll be in touch within
            24 hours with a bespoke proposal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your Names</Label>
                <Input id="name" placeholder="Jane & John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+27 82 000 0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Anniversary Date</Label>
                <Input id="date" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">
                Tell us about your dream celebration
              </Label>
              <textarea
                id="notes"
                rows={4}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Vineyard dinner? Safari sunrise? Private chef? Tell us everything..."
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Submit Enquiry
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Form submission will be wired in Phase 3. This is a placeholder.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
