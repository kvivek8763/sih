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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type TrainInfo = {
  trainNo: string;
  trainName: string;
  origin: string;
  destination: string;
  eta: string;
  platform: string;
  status: "On Time" | "Delayed" | "Arrived" | "Departed";
};

const MOCK_TRAINS: TrainInfo[] = [
  {
    trainNo: "12951",
    trainName: "Mumbai Rajdhani",
    origin: "MMCT",
    destination: "NDLS",
    eta: "08:32",
    platform: "2",
    status: "On Time",
  },
  {
    trainNo: "22435",
    trainName: "Vande Bharat Exp",
    origin: "BSB",
    destination: "NDLS",
    eta: "08:45",
    platform: "5",
    status: "Delayed",
  },
  {
    trainNo: "12002",
    trainName: "Shatabdi Exp",
    origin: "BPL",
    destination: "NDLS",
    eta: "09:10",
    platform: "1",
    status: "Arrived",
  },
  {
    trainNo: "12313",
    trainName: "Sealdah Rajdhani",
    origin: "SDAH",
    destination: "NDLS",
    eta: "10:30",
    platform: "3",
    status: "On Time",
  },
  {
    trainNo: "12417",
    trainName: "Prayagraj Exp",
    origin: "PRYJ",
    destination: "NDLS",
    eta: "07:00",
    platform: "6",
    status: "Departed",
  },
];

export default function LiveStation() {
  const [stationCode, setStationCode] = useState("");
  const [liveData, setLiveData] = useState<TrainInfo[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stationCode.trim()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const shuffledData = [...MOCK_TRAINS].sort(() => Math.random() - 0.5);
      setLiveData(shuffledData);
      setIsLoading(false);
    }, 1500);
  };

  const getStatusVariant = (status: TrainInfo["status"]) => {
    switch (status) {
      case "On Time":
        return "default";
      case "Delayed":
        return "destructive";
      case "Arrived":
        return "secondary";
      case "Departed":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Station Information</CardTitle>
        <CardDescription>
          Get real-time updates on trains arriving at and departing from a
          station.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSearch}>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter Station Code (e.g., NDLS)"
              value={stationCode}
              onChange={(e) => setStationCode(e.target.value.toUpperCase())}
              maxLength={5}
            />
            <Button type="submit" disabled={isLoading || !stationCode.trim()}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Search
            </Button>
          </div>
        </CardContent>
      </form>
      {liveData && (
        <CardContent>
          <CardTitle className="text-xl mb-4">
            Showing results for {stationCode}
          </CardTitle>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Train</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>ETA/ETD</TableHead>
                  <TableHead className="text-center">Platform</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {liveData.map((train) => (
                  <TableRow key={train.trainNo}>
                    <TableCell>
                      <div className="font-medium">{train.trainNo}</div>
                      <div className="text-xs text-muted-foreground">
                        {train.trainName}
                      </div>
                    </TableCell>
                    <TableCell>
                      {train.origin} to {train.destination}
                    </TableCell>
                    <TableCell>{train.eta}</TableCell>
                    <TableCell className="text-center">{train.platform}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={getStatusVariant(train.status)}>
                        {train.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
