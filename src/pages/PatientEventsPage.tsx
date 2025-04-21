
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { Calendar, FileText, Search, Plus, Shield } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function PatientEventsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  interface Event {
    id: string;
    patientId: string;
    patientName: string;
    eventType: string;
    date: string;
    status: "pending" | "ethereum" | "bitcoin" | "verified" | "failed";
    description: string;
    ipfsCid: string;
    sha256Hash: string;
    ethereumTxHash?: string;
    bitcoinTxId?: string;
  }

  // Mock data
  const events: Event[] = [
    {
      id: "EVT-2025-001",
      patientId: "P-2023-0542",
      patientName: "John Doe",
      eventType: "Consultation",
      date: "2025-04-20",
      status: "ethereum",
      description: "Initial consultation for chronic back pain",
      ipfsCid: "QmV9tSDx9UiPeWExXEeL6wfz7Dpb5G7sp5297RTq2YdW1B",
      sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      ethereumTxHash: "0x71c9010be98e121740f4855ff7f98c49c5563991af129b4e4423e5877bf09e3f",
    },
    {
      id: "EVT-2025-002",
      patientId: "P-2023-0618",
      patientName: "Alice Smith",
      eventType: "Treatment",
      date: "2025-04-19",
      status: "bitcoin",
      description: "Physical therapy session",
      ipfsCid: "QmYCvbfNbCwFR45HiNP45rwJBGa8gifQT2LeZ2tuYXu9a3",
      sha256Hash: "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
      bitcoinTxId: "bc134f8caa051e98377d7c6582618817e4279fc6be512f0a478f367531e18a2e",
    },
    {
      id: "EVT-2025-003",
      patientId: "P-2023-0125",
      patientName: "Robert Johnson",
      eventType: "Lab Results",
      date: "2025-04-18",
      status: "pending",
      description: "Blood work analysis",
      ipfsCid: "QmT7fwfPL8HmPQ9Z7Vdcq9uCYgDbX7bEeUiJyP9kdT4VqG",
      sha256Hash: "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35",
    },
    {
      id: "EVT-2025-004",
      patientId: "P-2023-0389",
      patientName: "Emma Wilson",
      eventType: "Prescription",
      date: "2025-04-17",
      status: "ethereum",
      description: "Prescription for antibiotics",
      ipfsCid: "QmXEqPGmfvfkHz91n8VQRGJbf5YSMG13Jo4Y7zQSHLbP5M",
      sha256Hash: "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce",
      ethereumTxHash: "0x8a2b59578f9f29c85ee67ef5fc2b72cdc75c9647af25c0d85143a642401f69df",
    },
    {
      id: "EVT-2025-005",
      patientId: "P-2023-0701",
      patientName: "Michael Brown",
      eventType: "Consultation",
      date: "2025-04-16",
      status: "verified",
      description: "Follow-up appointment",
      ipfsCid: "QmSY3mzDGFx4Z9HK1M8MYZy9QdX4XC2YKPmJjZTQzrEsVz",
      sha256Hash: "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d",
      ethereumTxHash: "0x583e5ca567c21e32b4f7d280cb9c464885c898fede6ce42cf3e770cbb33dab45",
      bitcoinTxId: "9d5a44c55a4872834344d8ed59e3a49873e0dbb6b48143538679323811232234",
    },
    {
      id: "EVT-2025-006",
      patientId: "P-2023-0498",
      patientName: "Sarah Davis",
      eventType: "Surgery",
      date: "2025-04-15",
      status: "bitcoin",
      description: "Appendectomy procedure",
      ipfsCid: "QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx",
      sha256Hash: "7de1555df0c2700329e815b93b32c571c2e28712d988970d6307e3adcb6c0945",
      bitcoinTxId: "24cc67893c2da1b98d94c29ced63a6d111bc35448712b3af1d191714635ebd7a",
    },
  ];

  const filteredEvents = events.filter(
    (event) =>
      event.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.eventType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const viewEventDetails = (event: Event) => {
    setSelectedEvent(event);
  };

  const verifyIntegrity = () => {
    // This would be a real blockchain verification in production
    setTimeout(() => {
      if (selectedEvent) {
        setSelectedEvent({
          ...selectedEvent,
          status: "verified",
        });
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Patient Events</h2>
        <Button 
          onClick={() => navigate("/new-event")}
          className="bg-ataraxy-purple hover:bg-ataraxy-purple-secondary"
        >
          <Plus className="mr-2 h-4 w-4" /> New Event
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <FileText className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="treatment">Treatment</SelectItem>
                <SelectItem value="prescription">Prescription</SelectItem>
                <SelectItem value="lab">Lab Results</SelectItem>
                <SelectItem value="surgery">Surgery</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <StatusBadge status="ethereum" className="mr-2" />
                <SelectValue placeholder="Blockchain Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="bitcoin">Bitcoin</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No events found
                </TableCell>
              </TableRow>
            ) : (
              filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.id}</TableCell>
                  <TableCell>
                    <div>
                      <p>{event.patientName}</p>
                      <p className="text-xs text-muted-foreground">{event.patientId}</p>
                    </div>
                  </TableCell>
                  <TableCell>{event.eventType}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>
                    <StatusBadge status={event.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          onClick={() => viewEventDetails(event)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Event Details</DialogTitle>
                          <DialogDescription>
                            Complete information about this healthcare event
                          </DialogDescription>
                        </DialogHeader>
                        
                        {selectedEvent && (
                          <div className="space-y-6">
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="col-span-1 text-sm font-medium">Event ID:</span>
                                <span className="col-span-3">{selectedEvent.id}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="col-span-1 text-sm font-medium">Patient:</span>
                                <span className="col-span-3">
                                  {selectedEvent.patientName} ({selectedEvent.patientId})
                                </span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="col-span-1 text-sm font-medium">Event Type:</span>
                                <span className="col-span-3">{selectedEvent.eventType}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="col-span-1 text-sm font-medium">Date:</span>
                                <span className="col-span-3">{selectedEvent.date}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="col-span-1 text-sm font-medium">Description:</span>
                                <span className="col-span-3">{selectedEvent.description}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="col-span-1 text-sm font-medium">Status:</span>
                                <span className="col-span-3">
                                  <StatusBadge status={selectedEvent.status} />
                                </span>
                              </div>
                            </div>
                            
                            <div className="border-t pt-4 space-y-4">
                              <h4 className="font-medium text-sm">Blockchain Information</h4>
                              
                              <div className="grid grid-cols-1 gap-2 p-3 border rounded-md bg-muted/30">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="font-medium">IPFS CID:</span>
                                  <code className="text-xs bg-muted px-1 py-0.5 rounded">{selectedEvent.ipfsCid}</code>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="font-medium">SHA-256 Hash:</span>
                                  <code className="text-xs bg-muted px-1 py-0.5 rounded">{selectedEvent.sha256Hash.substring(0, 10)}...{selectedEvent.sha256Hash.substring(selectedEvent.sha256Hash.length - 10)}</code>
                                </div>
                                
                                {selectedEvent.ethereumTxHash && (
                                  <div className="flex justify-between items-center text-sm">
                                    <span className="font-medium">Ethereum TX:</span>
                                    <a 
                                      href={`https://polygonscan.com/tx/${selectedEvent.ethereumTxHash}`} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-xs bg-muted px-1 py-0.5 rounded text-blue-600 hover:underline"
                                    >
                                      {selectedEvent.ethereumTxHash.substring(0, 6)}...{selectedEvent.ethereumTxHash.substring(selectedEvent.ethereumTxHash.length - 6)}
                                    </a>
                                  </div>
                                )}
                                
                                {selectedEvent.bitcoinTxId && (
                                  <div className="flex justify-between items-center text-sm">
                                    <span className="font-medium">Bitcoin TX:</span>
                                    <a 
                                      href={`https://mempool.space/tx/${selectedEvent.bitcoinTxId}`}
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-xs bg-muted px-1 py-0.5 rounded text-blue-600 hover:underline"
                                    >
                                      {selectedEvent.bitcoinTxId.substring(0, 6)}...{selectedEvent.bitcoinTxId.substring(selectedEvent.bitcoinTxId.length - 6)}
                                    </a>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex justify-end space-x-2">
                                <Button
                                  onClick={verifyIntegrity}
                                  disabled={selectedEvent.status === "verified"}
                                  className="bg-ataraxy-purple hover:bg-ataraxy-purple-secondary"
                                >
                                  <Shield className="mr-2 h-4 w-4" />
                                  {selectedEvent.status === "verified" ? "Verified" : "Verify Integrity"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
