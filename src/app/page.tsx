import Image from "next/image";
import {
  Bot,
  FileText,
  LifeBuoy,
  Search,
  Ticket,
  TrainFront,
  TrainTrack,
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AiAssistant from "@/components/ai-assistant";
import PnrStatus from "@/components/pnr-status";
import TrainTracking from "@/components/train-tracking";
import LiveStation from "@/components/live-station";
import ComplaintForm from "@/components/complaint-form";
import LostItemForm from "@/components/lost-item-form";
import EmergencyContacts from "@/components/emergency-contacts";

export default function Home() {
  const headerImage = PlaceHolderImages.find(
    (img) => img.id === "header-train"
  );

  const TABS = [
    {
      value: "ai-assistant",
      label: "AI Assistant",
      icon: Bot,
      component: <AiAssistant />,
    },
    {
      value: "pnr-status",
      label: "PNR Status",
      icon: Ticket,
      component: <PnrStatus />,
    },
    {
      value: "train-tracking",
      label: "Track Train",
      icon: TrainFront,
      component: <TrainTracking />,
    },
    {
      value: "live-station",
      label: "Live Station",
      icon: TrainTrack,
      component: <LiveStation />,
    },
    {
      value: "complaint",
      label: "Complaint",
      icon: FileText,
      component: <ComplaintForm />,
    },
    {
      value: "lost-item",
      label: "Lost Item",
      icon: Search,
      component: <LostItemForm />,
    },
    {
      value: "emergency",
      label: "Emergency",
      icon: LifeBuoy,
      component: <EmergencyContacts />,
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="relative flex h-48 w-full items-center justify-center md:h-64">
        {headerImage && (
          <Image
            src={headerImage.imageUrl}
            alt={headerImage.description}
            fill
            className="object-cover"
            data-ai-hint={headerImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/40" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-white md:text-6xl">
            RailMadad AI
          </h1>
          <p className="mt-2 text-lg text-white/90 md:text-xl">
            Your AI-powered companion for Indian Railways
          </p>
        </div>
      </header>

      <main className="flex flex-1 justify-center p-4 sm:p-6 md:p-8">
        <Tabs defaultValue="ai-assistant" className="w-full max-w-7xl">
          <div className="flex justify-center">
            <TabsList className="grid h-auto w-full grid-cols-2 rounded-lg p-2 sm:grid-cols-4 lg:grid-cols-7">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex-col gap-1.5 py-2 text-xs sm:flex-row sm:text-sm sm:py-1.5"
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              {tab.component}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
