
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/StatusBadge";
import { Link, Shield, CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VerificationPage() {
  const { toast } = useToast();
  const [hash, setHash] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<null | {
    verified: boolean;
    event?: {
      id: string;
      patientId: string;
      eventType: string;
      date: string;
      ipfsCid: string;
      ethereumTxHash?: string;
      bitcoinTxId?: string;
    };
  }>(null);

  const handleVerify = () => {
    if (!hash.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid hash to verify",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      // This is mock verification logic - in a real app, this would check against blockchain
      if (hash.length > 20) {
        setVerificationResult({
          verified: true,
          event: {
            id: "EVT-2025-001",
            patientId: "P-2023-0542",
            eventType: "Consultation",
            date: "2025-04-20",
            ipfsCid: "QmV9tSDx9UiPeWExXEeL6wfz7Dpb5G7sp5297RTq2YdW1B",
            ethereumTxHash: "0x71c9010be98e121740f4855ff7f98c49c5563991af129b4e4423e5877bf09e3f",
            bitcoinTxId: "bc134f8caa051e98377d7c6582618817e4279fc6be512f0a478f367531e18a2e"
          }
        });
      } else {
        setVerificationResult({
          verified: false
        });
      }

      setIsVerifying(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Verification Tool</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verify Event Integrity</CardTitle>
          <CardDescription>
            Enter an event hash to verify its authenticity on the blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hash">Event Hash (SHA-256)</Label>
            <div className="flex space-x-2">
              <Input
                id="hash"
                placeholder="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                className="font-mono text-sm"
              />
              <Button 
                onClick={handleVerify} 
                disabled={isVerifying}
                className="bg-ataraxy-purple hover:bg-ataraxy-purple-secondary"
              >
                {isVerifying ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Verify
                  </>
                )}
              </Button>
            </div>
          </div>

          {verificationResult && (
            <Card className={`mt-6 ${verificationResult.verified ? 'border-green-500' : 'border-red-500'}`}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  {verificationResult.verified ? (
                    <>
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <span className="font-medium text-green-700">Verification Successful</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-6 w-6 text-red-500" />
                      <span className="font-medium text-red-700">Verification Failed</span>
                    </>
                  )}
                </div>

                {verificationResult.verified && verificationResult.event && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Event Information</h3>
                      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>Event ID:</div>
                        <div className="font-medium">{verificationResult.event.id}</div>
                        <div>Patient ID:</div>
                        <div className="font-medium">{verificationResult.event.patientId}</div>
                        <div>Event Type:</div>
                        <div className="font-medium">{verificationResult.event.eventType}</div>
                        <div>Date:</div>
                        <div className="font-medium">{verificationResult.event.date}</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium">Blockchain Records</h3>
                      <div className="mt-2 space-y-3">
                        <div className="p-3 rounded-md bg-ataraxy-blue-light/30 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <StatusBadge status="ethereum" />
                            <span className="text-sm">Ethereum (Polygon)</span>
                          </div>
                          <a 
                            href={`https://polygonscan.com/tx/${verificationResult.event.ethereumTxHash}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center"
                          >
                            <span className="font-mono">
                              {verificationResult.event.ethereumTxHash?.substring(0, 6)}...{verificationResult.event.ethereumTxHash?.substring((verificationResult.event.ethereumTxHash?.length || 0) - 6)}
                            </span>
                            <Link className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                        
                        {verificationResult.event.bitcoinTxId && (
                          <div className="p-3 rounded-md bg-amber-50 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <StatusBadge status="bitcoin" />
                              <span className="text-sm">Bitcoin</span>
                            </div>
                            <a 
                              href={`https://mempool.space/tx/${verificationResult.event.bitcoinTxId}`}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline flex items-center"
                            >
                              <span className="font-mono">
                                {verificationResult.event.bitcoinTxId?.substring(0, 6)}...{verificationResult.event.bitcoinTxId?.substring((verificationResult.event.bitcoinTxId?.length || 0) - 6)}
                              </span>
                              <Link className="h-3 w-3 ml-1" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium">IPFS Storage</h3>
                      <div className="mt-2 p-3 rounded-md bg-gray-50 flex justify-between items-center">
                        <span className="text-sm">IPFS Content ID (CID):</span>
                        <a 
                          href={`https://ipfs.io/ipfs/${verificationResult.event.ipfsCid}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-mono text-blue-600 hover:underline flex items-center"
                        >
                          {verificationResult.event.ipfsCid.substring(0, 6)}...{verificationResult.event.ipfsCid.substring(verificationResult.event.ipfsCid.length - 6)}
                          <Link className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {!verificationResult.verified && (
                  <div className="text-sm text-red-700 mt-2">
                    The provided hash was not found in our blockchain records. Please ensure you entered the correct hash.
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="rounded-md bg-blue-50 p-4 text-blue-800 text-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <Shield className="h-5 w-5 text-blue-800" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">About Verification</h3>
                <div className="mt-2 text-sm">
                  <p className="mb-2">
                    This tool allows you to verify the integrity and authenticity of healthcare events by checking their cryptographic hashes against blockchain records.
                  </p>
                  <p>
                    The verification process confirms that event data has not been tampered with since it was recorded and anchored to the blockchain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
