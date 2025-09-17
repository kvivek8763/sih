"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const lostItemFormSchema = z.object({
  trainNumber: z.string().min(5, {message: "Train number must be 5 digits."}).max(5).optional().or(z.literal("")),
  stationLost: z.string().min(2, { message: "Station name must be at least 2 characters." }),
  dateLost: z.date({
    required_error: "A date of loss is required.",
  }),
  itemDescription: z.string().min(10, { message: "Description must be at least 10 characters." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit mobile number." }),
});

type LostItemFormValues = z.infer<typeof lostItemFormSchema>;

const defaultValues: Partial<LostItemFormValues> = {
  trainNumber: "",
  stationLost: "",
  itemDescription: "",
  name: "",
  contact: "",
};

export default function LostItemForm() {
  const { toast } = useToast();
  const form = useForm<LostItemFormValues>({
    resolver: zodResolver(lostItemFormSchema),
    defaultValues,
  });

  function onSubmit(data: LostItemFormValues) {
    console.log(data);
    toast({
      title: "Lost Item Reported",
      description: "Your report has been submitted. We will contact you if the item is found.",
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report a Lost Item</CardTitle>
        <CardDescription>
          Please provide as much detail as possible to help us find your
          belongings.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="trainNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Train No. (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 12951" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stationLost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Station Where Item Was Lost</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Mumbai Central" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateLost"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-2">
                    <FormLabel className="mb-[14px]">Date of Loss</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="itemDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the lost item (e.g., color, brand, size, contents)."
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto">
              Submit Report
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
