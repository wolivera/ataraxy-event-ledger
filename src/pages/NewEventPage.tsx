
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, Link, Check } from "lucide-react";

export default function NewEventPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    patientId: "",
    eventType: "",
    description: "",
    blockchainOption: "ethereum"
  });
  
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simulate file upload
      setTimeout(() => {
        setUploadedFile(file.name);
        setIsUploading(false);
      }, 1500);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.patientId || !formData.eventType || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate blockchain anchoring process
    setTimeout(() => {
      toast({
        title: "Event Created Successfully",
        description: `Event has been anchored on ${formData.blockchainOption === "both" ? "Ethereum and Bitcoin" : formData.blockchainOption}`,
      });
      setIsSubmitting(false);
      navigate("/events");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New Event</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>
                Enter information about this healthcare event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input 
                  id="patientId" 
                  placeholder="e.g. P-2023-0123"
                  value={formData.patientId}
                  onChange={(e) => handleChange("patientId", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <Select
                  value={formData.eventType}
                  onValueChange={(value) => handleChange("eventType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Treatment">Treatment</SelectItem>
                    <SelectItem value="Prescription">Prescription</SelectItem>
                    <SelectItem value="Lab Results">Lab Results</SelectItem>
                    <SelectItem value="Surgery">Surgery</SelectItem>
                    <SelectItem value="Discharge">Discharge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the event..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                  Upload supporting files for this event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    {uploadedFile ? (
                      <div className="flex items-center space-x-2">
                        <Check className="h-6 w-6 text-green-500" />
                        <span>{uploadedFile}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-muted-foreground" />
                        <h3 className="text-lg font-medium">
                          {isUploading ? "Uploading..." : "Upload document"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Drag and drop or click to upload
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF or JSON (max 10MB)
                        </p>
                      </>
                    )}
                  </div>
                  <Input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    accept=".pdf,.json"
                  />
                  <Label 
                    htmlFor="file-upload"
                    className={`mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                    ${uploadedFile ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2' : 'bg-ataraxy-purple text-white hover:bg-ataraxy-purple-secondary h-10 px-4 py-2'}`}
                  >
                    {uploadedFile ? "Replace File" : "Select File"}
                  </Label>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Blockchain Options</CardTitle>
                <CardDescription>
                  Choose where to anchor this event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="blockchainOption">Anchor On</Label>
                  <Select 
                    value={formData.blockchainOption}
                    onValueChange={(value) => handleChange("blockchainOption", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blockchain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">
                        <div className="flex items-center">
                          <Link className="mr-2 h-4 w-4" />
                          <span>Ethereum (Polygon) Only</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="both">
                        <div className="flex items-center">
                          <Link className="mr-2 h-4 w-4" />
                          <span>Ethereum & Bitcoin</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="rounded-md bg-blue-50 p-4 text-blue-800 text-sm">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Link className="h-5 w-5 text-blue-800" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">About blockchain anchoring</h3>
                      <div className="mt-2 text-sm">
                        <p>
                          {formData.blockchainOption === "both" 
                            ? "The event will be anchored on both Ethereum (Polygon) and Bitcoin for maximum security." 
                            : "The event will be anchored on Ethereum (Polygon) for fast, cost-efficient verification."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button 
                  type="submit"
                  className="w-full bg-ataraxy-purple hover:bg-ataraxy-purple-secondary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting & Anchoring..." : "Submit & Anchor"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
