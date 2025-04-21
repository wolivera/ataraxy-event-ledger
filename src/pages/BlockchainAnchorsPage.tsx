
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { Link, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function BlockchainAnchorsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  interface Anchor {
    id: string;
    eventId: string;
    patientId: string;
    blockchainType: "ethereum" | "bitcoin";
    txHash: string;
    timestamp: string;
    blockNumber: number;
    confirmations: number;
    status: "pending" | "ethereum" | "bitcoin" | "verified" | "failed";
  }

  // Mock data
  const anchors: Anchor[] = [
    {
      id: "anc-1",
      eventId: "EVT-2025-001",
      patientId: "P-2023-0542",
      blockchainType: "ethereum",
      txHash: "0x71c9010be98e121740f4855ff7f98c49c5563991af129b4e4423e5877bf09e3f",
      timestamp: "2025-04-20 14:32",
      blockNumber: 39245621,
      confirmations: 24,
      status: "ethereum"
    },
    {
      id: "anc-2",
      eventId: "EVT-2025-002",
      patientId: "P-2023-0618",
      blockchainType: "bitcoin",
      txHash: "bc134f8caa051e98377d7c6582618817e4279fc6be512f0a478f367531e18a2e",
      timestamp: "2025-04-19 09:15",
      blockNumber: 834521,
      confirmations: 6,
      status: "bitcoin"
    },
    {
      id: "anc-3",
      eventId: "EVT-2025-004",
      patientId: "P-2023-0389",
      blockchainType: "ethereum",
      txHash: "0x8a2b59578f9f29c85ee67ef5fc2b72cdc75c9647af25c0d85143a642401f69df",
      timestamp: "2025-04-17 11:22",
      blockNumber: 39243101,
      confirmations: 56,
      status: "ethereum"
    },
    {
      id: "anc-4",
      eventId: "EVT-2025-005",
      patientId: "P-2023-0701",
      blockchainType: "ethereum",
      txHash: "0x583e5ca567c21e32b4f7d280cb9c464885c898fede6ce42cf3e770cbb33dab45",
      timestamp: "2025-04-16 16:45",
      blockNumber: 39242018,
      confirmations: 73,
      status: "ethereum"
    },
    {
      id: "anc-5",
      eventId: "EVT-2025-005",
      patientId: "P-2023-0701",
      blockchainType: "bitcoin",
      txHash: "9d5a44c55a4872834344d8ed59e3a49873e0dbb6b48143538679323811232234",
      timestamp: "2025-04-16 17:30",
      blockNumber: 834509,
      confirmations: 12,
      status: "bitcoin"
    },
    {
      id: "anc-6",
      eventId: "EVT-2025-006",
      patientId: "P-2023-0498",
      blockchainType: "bitcoin",
      txHash: "24cc67893c2da1b98d94c29ced63a6d111bc35448712b3af1d191714635ebd7a",
      timestamp: "2025-04-15 09:10",
      blockNumber: 834501,
      confirmations: 15,
      status: "bitcoin"
    },
  ];

  const filteredAnchors = anchors.filter(
    (anchor) =>
      anchor.eventId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anchor.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anchor.txHash.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ethereumAnchors = filteredAnchors.filter(
    (anchor) => anchor.blockchainType === "ethereum"
  );

  const bitcoinAnchors = filteredAnchors.filter(
    (anchor) => anchor.blockchainType === "bitcoin"
  );

  const getExplorerUrl = (anchor: Anchor) => {
    if (anchor.blockchainType === "ethereum") {
      return `https://polygonscan.com/tx/${anchor.txHash}`;
    } else {
      return `https://mempool.space/tx/${anchor.txHash}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Blockchain Anchors</h2>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search anchors by event ID, patient ID or transaction hash..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Anchors</TabsTrigger>
          <TabsTrigger value="ethereum">Ethereum (Polygon)</TabsTrigger>
          <TabsTrigger value="bitcoin">Bitcoin</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event ID</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Blockchain</TableHead>
                  <TableHead>Transaction Hash</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAnchors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      No anchors found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAnchors.map((anchor) => (
                    <TableRow key={anchor.id}>
                      <TableCell className="font-medium">{anchor.eventId}</TableCell>
                      <TableCell>{anchor.patientId}</TableCell>
                      <TableCell>
                        <span className="capitalize">{anchor.blockchainType}</span>
                      </TableCell>
                      <TableCell>
                        <a 
                          href={getExplorerUrl(anchor)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:underline"
                        >
                          <span className="font-mono">
                            {anchor.txHash.substring(0, 6)}...{anchor.txHash.substring(anchor.txHash.length - 6)}
                          </span>
                          <Link className="h-3 w-3 ml-1" />
                        </a>
                      </TableCell>
                      <TableCell>{anchor.timestamp}</TableCell>
                      <TableCell>#{anchor.blockNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={anchor.status} />
                          <span className="text-xs text-green-600">
                            {anchor.confirmations} confirmations
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="ethereum">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event ID</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Transaction Hash</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ethereumAnchors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      No Ethereum anchors found
                    </TableCell>
                  </TableRow>
                ) : (
                  ethereumAnchors.map((anchor) => (
                    <TableRow key={anchor.id}>
                      <TableCell className="font-medium">{anchor.eventId}</TableCell>
                      <TableCell>{anchor.patientId}</TableCell>
                      <TableCell>
                        <a 
                          href={getExplorerUrl(anchor)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:underline"
                        >
                          <span className="font-mono">
                            {anchor.txHash.substring(0, 6)}...{anchor.txHash.substring(anchor.txHash.length - 6)}
                          </span>
                          <Link className="h-3 w-3 ml-1" />
                        </a>
                      </TableCell>
                      <TableCell>{anchor.timestamp}</TableCell>
                      <TableCell>#{anchor.blockNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={anchor.status} />
                          <span className="text-xs text-green-600">
                            {anchor.confirmations} confirmations
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="bitcoin">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event ID</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bitcoinAnchors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      No Bitcoin anchors found
                    </TableCell>
                  </TableRow>
                ) : (
                  bitcoinAnchors.map((anchor) => (
                    <TableRow key={anchor.id}>
                      <TableCell className="font-medium">{anchor.eventId}</TableCell>
                      <TableCell>{anchor.patientId}</TableCell>
                      <TableCell>
                        <a 
                          href={getExplorerUrl(anchor)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:underline"
                        >
                          <span className="font-mono">
                            {anchor.txHash.substring(0, 6)}...{anchor.txHash.substring(anchor.txHash.length - 6)}
                          </span>
                          <Link className="h-3 w-3 ml-1" />
                        </a>
                      </TableCell>
                      <TableCell>{anchor.timestamp}</TableCell>
                      <TableCell>#{anchor.blockNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={anchor.status} />
                          <span className="text-xs text-green-600">
                            {anchor.confirmations} confirmations
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
