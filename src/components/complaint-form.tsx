"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const complaintFormSchema = z.object({
  pnr: z.string().length(10, { message: "PNR must be 10 digits." }).optional().or(z.literal("")),
  complaintType: z.string({
    required_error: "Please select a complaint type.",
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(500, { message: "Description must not exceed 500 characters." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit mobile number." }),
});

type ComplaintFormValues = z.infer<typeof complaintFormSchema>;

const defaultValues: Partial<ComplaintFormValues> = {
  pnr: "",
  description: "",
  name: "",
  contact: "",
};

export default function ComplaintForm() {
  const { toast } = useToast();
  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintFormSchema),
    defaultValues,
  });

  function onSubmit(data: ComplaintFormValues) {
    console.log(data);
    toast({
      title: "Complaint Registered",
      description: `Your complaint about "${data.complaintType}" has been successfully submitted.`,
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register a Complaint</CardTitle>
        <CardDescription>
          We are sorry for the inconvenience. Please provide details about your
          issue.
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="pnr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PNR Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="10-digit PNR" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="complaintType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complaint Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Coach Maintenance">
                          Coach Maintenance
                        </SelectItem>
                        <SelectItem value="Food & Beverage">
                          Food & Beverage
                        </SelectItem>
                        <SelectItem value="Staff Behavior">
                          Staff Behavior
                        </SelectItem>
                        <SelectItem value="Cleanliness">Cleanliness</SelectItem>
                        <SelectItem value="Punctuality">Punctuality</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complaint Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your issue in detail."
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
              Submit Complaint
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
