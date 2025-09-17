"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Clock, Gauge, MapPin } from "lucide-react";

type TrainStatus = {
  trainNo: string;
  trainName: string;
  currentStation: string;
  nextStation: string;
  etaNext: string;
  delay: string;
  speed: number;
  progress: number;
};

const MOCK_TRAIN_STATUS: TrainStatus = {
  trainNo: "12951",
  trainName: "Mumbai Rajdhani",
  currentStation: "Ratlam Jn (RTM)",
  nextStation: "Kota Jn (KOTA)",
  etaNext: "11:40",
  delay: "15 mins",
  speed: 110,
  progress: 65,
};

export default function TrainTracking() {
  const [trainNumber, setTrainNumber] = useState("");
  const [trainStatus, setTrainStatus] = useState<TrainStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trainNumber.length !== 5) {
      setError("Train number must be 5 digits long.");
      return;
    }
    setError("");
    setIsLoading(true);
    setTrainStatus(null);
    // Simulate API call
    setTimeout(() => {
      setTrainStatus({ ...MOCK_TRAIN_STATUS, trainNo: trainNumber });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time Train Tracking</CardTitle>
        <CardDescription>
          Enter a 5-digit train number to get live updates on its location and
          status.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSearch}>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter Train Number"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value.replace(/\D/g, ""))}
              maxLength={5}
            />
            <Button type="submit" disabled={isLoading || !trainNumber.trim()}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Track
            </Button>
          </div>
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </CardContent>
      </form>

      {trainStatus && (
        <CardContent>
          <Card className="border-accent/50 bg-accent/5">
            <CardHeader>
              <CardTitle>
                {trainStatus.trainNo} - {trainStatus.trainName}
              </CardTitle>
              <CardDescription>
                Last updated just now
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="mb-2 flex justify-between text-sm font-medium">
                  <span>{trainStatus.currentStation}</span>
                  <span>{trainStatus.nextStation}</span>
                </div>
                <Progress value={trainStatus.progress} className="h-2" />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>Last Station</span>
                  <span>Next Station (ETA: {trainStatus.etaNext})</span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-lg border bg-background p-3">
                  <Gauge className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Current Speed</p>
                    <p className="font-semibold">{trainStatus.speed} km/h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border bg-background p-3">
                  <Clock className="h-6 w-6 text-destructive" />
                  <div>
                    <p className="text-xs text-muted-foreground">Delay</p>
                    <p className="font-semibold">{trainStatus.delay}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border bg-background p-3">
                  <MapPin className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Current Location</p>
                    <p className="font-semibold">Near {trainStatus.currentStation}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      )}
    </Card>
  );
}
