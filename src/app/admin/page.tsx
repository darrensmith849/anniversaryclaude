import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Hotel, Handshake, CheckSquare } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Requests", value: "—", icon: Heart },
    { label: "Active Stays", value: "—", icon: Hotel },
    { label: "Partners", value: "—", icon: Handshake },
    { label: "Open Tasks", value: "—", icon: CheckSquare },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Anniversary Concierge overview. Data will populate once connected.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <CardDescription>Coming soon</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
