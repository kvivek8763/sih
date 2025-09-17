"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, TrainFront, User } from "lucide-react";
import { cn } from "@/lib/utils";

type PnrDetails = {
  pnr: string;
  trainName: string;
  trainNo: string;
  from: string;
  to: string;
  date: string;
  passengers: {
    name: string;
    bookingStatus: string;
    currentStatus: string;
  }[];
};

const MOCK_PNR_DATA: PnrDetails = {
  pnr: "2456819302",
  trainName: "MUMBAI RAJDHANI",
  trainNo: "12951",
  from: "MUMBAI CENTRAL (MMCT)",
  to: "NEW DELHI (NDLS)",
  date: "25 Jul, 2024",
  passengers: [
    {
      name: "PASSENGER 1",
      bookingStatus: "CNF/B5/45/LOWER",
      currentStatus: "CNF/B5/45/LOWER",
    },
    {
      name: "PASSENGER 2",
      bookingStatus: "WL/10",
      currentStatus: "RAC/5",
    },
  ],
};

export default function PnrStatus() {
  const [pnr, setPnr] = useState("");
  const [pnrDetails, setPnrDetails] = useState<PnrDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckPnr = (e: React.FormEvent) => {
    e.preventDefault();
    if (pnr.length !== 10) {
      setError("PNR must be 10 digits long.");
      return;
    }
    setError("");
    setIsLoading(true);
    setPnrDetails(null);
    // Simulate API call
    setTimeout(() => {
      setPnrDetails({ ...MOCK_PNR_DATA, pnr });
      setIsLoading(false);
    }, 1500);
  };

  const getStatusVariant = (status: string) => {
    if (status.startsWith("CNF")) return "default";
    if (status.startsWith("RAC")) return "secondary";
    if (status.startsWith("WL")) return "destructive";
    return "outline";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>PNR Status Enquiry</CardTitle>
        <CardDescription>
          Enter your 10-digit PNR number to check your booking status.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleCheckPnr}>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter PNR Number"
              value={pnr}
              onChange={(e) => setPnr(e.target.value.replace(/\D/g, ""))}
              maxLength={10}
            />
            <Button type="submit" disabled={isLoading || !pnr.trim()}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Check
            </Button>
          </div>
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </CardContent>
      </form>

      {pnrDetails && (
        <CardContent>
          <Card className="border-primary/50">
            <CardHeader className="bg-primary/5 text-primary">
              <div className="flex items-center gap-4">
                <TrainFront className="h-6 w-6" />
                <div>
                  <CardTitle className="text-lg">
                    {pnrDetails.trainNo} - {pnrDetails.trainName}
                  </CardTitle>
                  <CardDescription className="text-primary/80">
                    {pnrDetails.from} to {pnrDetails.to} on {pnrDetails.date}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4">
                <h4 className="mb-4 font-semibold text-muted-foreground">
                  Passenger Details
                </h4>
                <div className="space-y-4">
                  {pnrDetails.passengers.map((passenger, index) => (
                    <div key={index}>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{passenger.name}</span>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Booking Status
                          </p>
                          <Badge variant={getStatusVariant(passenger.bookingStatus)}>
                            {passenger.bookingStatus}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Current Status
                          </p>
                          <Badge
                            variant={getStatusVariant(passenger.currentStatus)}
                          >
                            {passenger.currentStatus}
                          </Badge>
                        </div>
                      </div>
                      {index < pnrDetails.passengers.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      )}
    </Card>
  );
}
