import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  HeartPulse,
  Phone,
  Siren,
  HelpCircle,
  MessageSquare,
} from "lucide-react";

const contacts = [
  {
    name: "Railway Helpline",
    number: "139",
    description: "For general inquiries, PNR status, and train schedules.",
    icon: HelpCircle,
  },
  {
    name: "Railway Protection Force (RPF)",
    number: "182",
    description: "For security-related assistance during your journey.",
    icon: Shield,
  },
  {
    name: "Govt. Railway Police (GRP)",
    number: "1512",
    description: "For reporting crimes on railways.",
    icon: Siren,
  },
  {
    name: "Medical Emergency",
    number: "138",
    description: "For any medical assistance required on the train or at the station.",
    icon: HeartPulse,
  },
  {
    name: "SMS Complaint",
    number: "9717630982",
    description: "Send an SMS with your PNR and complaint details.",
    icon: MessageSquare,
  },
];

export default function EmergencyContacts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Contacts</CardTitle>
        <CardDescription>
          Important numbers for assistance during your journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {contacts.map((contact, index) => (
            <li key={contact.name}>
              <div className="flex items-start space-x-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <contact.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <h3 className="font-semibold">{contact.name}</h3>
                    <a
                      href={`tel:${contact.number}`}
                      className="text-lg font-bold text-primary hover:underline"
                    >
                      {contact.number}
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {contact.description}
                  </p>
                </div>
              </div>
              {index < contacts.length - 1 && <Separator className="mt-4" />}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
