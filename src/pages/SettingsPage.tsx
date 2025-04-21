
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, Key, Shield, Link, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const [blockchainSettings, setBlockchainSettings] = useState({
    defaultNetwork: "ethereum",
    bitcoinEnabled: true,
    autoAnchor: true,
    ipfsGateway: "https://ipfs.io/ipfs/"
  });
  
  const [userSettings, setUserSettings] = useState({
    name: "Dr. Smith",
    email: "doctor@hospital.com",
    role: "admin"
  });
  
  const handleSaveBlockchainSettings = () => {
    setIsSaving(true);
    
    setTimeout(() => {
      toast({
        title: "Settings Saved",
        description: "Your blockchain settings have been updated",
      });
      setIsSaving(false);
    }, 1000);
  };
  
  const handleSaveUserSettings = () => {
    setIsSaving(true);
    
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your user profile has been updated",
      });
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="user">
        <TabsList>
          <TabsTrigger value="user">
            <User className="h-4 w-4 mr-2" />
            User
          </TabsTrigger>
          <TabsTrigger value="blockchain">
            <Link className="h-4 w-4 mr-2" />
            Blockchain
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="h-4 w-4 mr-2" />
            API Keys
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="user" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>
                Manage your account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={userSettings.name}
                  onChange={(e) => setUserSettings({...userSettings, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={userSettings.email}
                  onChange={(e) => setUserSettings({...userSettings, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={userSettings.role}
                  onValueChange={(value) => setUserSettings({...userSettings, role: value})}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="auditor">Auditor</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  This determines what features and data you can access in the system
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button 
                onClick={handleSaveUserSettings}
                className="ml-auto bg-ataraxy-purple hover:bg-ataraxy-purple-secondary"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="blockchain" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Settings</CardTitle>
              <CardDescription>
                Configure how events are anchored to the blockchain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="defaultNetwork">Default Blockchain Network</Label>
                <Select 
                  value={blockchainSettings.defaultNetwork}
                  onValueChange={(value) => setBlockchainSettings({...blockchainSettings, defaultNetwork: value})}
                >
                  <SelectTrigger id="defaultNetwork">
                    <SelectValue placeholder="Select default network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum (Polygon)</SelectItem>
                    <SelectItem value="both">Both Ethereum & Bitcoin</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Events will be anchored to this blockchain by default
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="bitcoinEnabled">Enable Bitcoin Anchoring</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow events to be anchored to the Bitcoin blockchain
                  </p>
                </div>
                <Switch 
                  id="bitcoinEnabled" 
                  checked={blockchainSettings.bitcoinEnabled}
                  onCheckedChange={(checked) => setBlockchainSettings({...blockchainSettings, bitcoinEnabled: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoAnchor">Auto-Anchor Events</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically anchor events when they are created
                  </p>
                </div>
                <Switch 
                  id="autoAnchor" 
                  checked={blockchainSettings.autoAnchor}
                  onCheckedChange={(checked) => setBlockchainSettings({...blockchainSettings, autoAnchor: checked})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ipfsGateway">IPFS Gateway URL</Label>
                <Input 
                  id="ipfsGateway" 
                  value={blockchainSettings.ipfsGateway}
                  onChange={(e) => setBlockchainSettings({...blockchainSettings, ipfsGateway: e.target.value})}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Used for retrieving files stored on IPFS
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button 
                onClick={handleSaveBlockchainSettings}
                className="ml-auto bg-ataraxy-purple hover:bg-ataraxy-purple-secondary"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage authentication and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch id="twoFactor" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sessionTimeout">Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out after 30 minutes of inactivity
                  </p>
                </div>
                <Switch id="sessionTimeout" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button className="ml-auto bg-ataraxy-purple hover:bg-ataraxy-purple-secondary">
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for integrating with external systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Button variant="outline" size="sm">
                    Generate New Key
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="apiKey" 
                    value="ataraxy_api_54d9fb1c7073e76d42a86c2d8135b919"
                    readOnly
                    className="font-mono"
                  />
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Use this key to authenticate requests to the Ataraxy Health API
                </p>
              </div>
              
              <div className="rounded-md bg-yellow-50 p-4 text-yellow-800 text-sm">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">API Key Security</h3>
                    <div className="mt-2 text-sm">
                      <p>
                        Keep your API key secure and never share it publicly. If you believe your key has been compromised, generate a new one immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>API Access Permissions</Label>
                
                <div className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Read Events</h4>
                      <p className="text-xs text-muted-foreground">Get event data from the API</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Create Events</h4>
                      <p className="text-xs text-muted-foreground">Create new events via the API</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Verify Events</h4>
                      <p className="text-xs text-muted-foreground">Verify event integrity via the API</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Admin Operations</h4>
                      <p className="text-xs text-muted-foreground">Perform administrative operations</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button className="ml-auto bg-ataraxy-purple hover:bg-ataraxy-purple-secondary">
                Save API Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
