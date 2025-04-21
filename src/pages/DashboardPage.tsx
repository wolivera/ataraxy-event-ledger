
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { FileText, Link, Shield, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const navigate = useNavigate();
  
  const stats = [
    { 
      title: "Total Events", 
      value: "156", 
      description: "Events recorded", 
      icon: <FileText className="h-5 w-5 text-muted-foreground" /> 
    },
    { 
      title: "Ethereum Anchors", 
      value: "134", 
      description: "On Polygon", 
      icon: <Link className="h-5 w-5 text-muted-foreground" /> 
    },
    { 
      title: "Bitcoin Anchors", 
      value: "89", 
      description: "On Bitcoin", 
      icon: <Link className="h-5 w-5 text-muted-foreground" /> 
    },
    { 
      title: "Verifications", 
      value: "42", 
      description: "Last 30 days", 
      icon: <Shield className="h-5 w-5 text-muted-foreground" /> 
    },
  ];
  
  const recentEvents = [
    {
      patientId: "P-2023-0542",
      patientName: "John Doe",
      eventType: "Consultation",
      date: "2025-04-20",
      status: "ethereum" as const,
    },
    {
      patientId: "P-2023-0618",
      patientName: "Alice Smith",
      eventType: "Treatment",
      date: "2025-04-19",
      status: "bitcoin" as const,
    },
    {
      patientId: "P-2023-0125",
      patientName: "Robert Johnson",
      eventType: "Lab Results",
      date: "2025-04-18",
      status: "pending" as const,
    },
    {
      patientId: "P-2023-0389",
      patientName: "Emma Wilson",
      eventType: "Prescription",
      date: "2025-04-17",
      status: "ethereum" as const,
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button 
          onClick={() => navigate("/new-event")}
          className="bg-ataraxy-purple hover:bg-ataraxy-purple-secondary"
        >
          <Plus className="mr-2 h-4 w-4" /> New Event
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Patient Events</CardTitle>
            <CardDescription>
              Last recorded clinical events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-md border bg-white"
                >
                  <div>
                    <p className="text-sm font-medium">{event.patientName}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">{event.patientId}</p>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                      <p className="text-xs text-muted-foreground">{event.eventType}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  <StatusBadge status={event.status} />
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/events")}
              >
                View All Events
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Blockchain Summary</CardTitle>
            <CardDescription>
              Recent blockchain anchoring activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-md border bg-white">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-sm">Ethereum (Polygon)</h4>
                  <StatusBadge status="ethereum" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Last Anchored:</span>
                    <span>2025-04-20 14:32 UTC</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Transaction:</span>
                    <span className="font-mono">0x71c...9e3f</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-green-600">Confirmed (24 blocks)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-md border bg-white">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-sm">Bitcoin</h4>
                  <StatusBadge status="bitcoin" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Last Anchored:</span>
                    <span>2025-04-19 09:15 UTC</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Transaction:</span>
                    <span className="font-mono">bc13...8a2e</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-green-600">Confirmed (6 blocks)</span>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/anchors")}
              >
                View All Anchors
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
