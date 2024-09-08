"use client";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().default("anonymous"),
  question: z.string().min(10, {
    message: "Question must be at least 10 characters.",
  }),
});

export default function ContactUs() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "anonymous",
      question: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 3000)), // Simulating API call
      {
        loading: "Sending message...",
        success: "Message sent successfully!",
        error: "Failed to send message.",
      },
    );
    setIsOpen(false); // Close the popover after submission
    form.reset(); // Reset the form
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Contact The Team</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">
                What do you want to know?
              </h4>
              <p className="text-sm text-muted-foreground">
                Ask your question and we&quot;ll be in touch shortly
              </p>
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username or leave empty for anonymous"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What is Unikind?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant={"secondary"} className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
