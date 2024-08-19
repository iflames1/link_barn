"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { options } from "@/components/links/select-link";
import { useState } from "react";
import { API_BASE_URL } from "@/lib/constants";
import { getUserUUID } from "@/lib/auth";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  links: z.array(
    z.object({
      platform: z.string().min(2).max(50),
      url: z.string().url().min(2).max(50),
    }),
  ),
});

export const NewLinks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      links: [{ platform: "", url: "" }],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsLoading(true);
    for (const item of values.links) {
      try {
        const url = `${API_BASE_URL}/links`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            platform: item.platform,
            index: 0,
            url: item.url,
            user_id: getUserUUID(),
          }),
        });
        console.log(response);

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.message || errorData.detail;
          console.log(errorData);
          toast.error(errorMessage, {
            richColors: true,
          });
          throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  return (
    <div className="py-8 px-7 bg-white">
      <Button
        type="button"
        variant={"outline"}
        className="w-full mb-4"
        onClick={() => append({ platform: "", url: "" })}
      >
        Add Link
      </Button>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white flex flex-col gap-4"
        >
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="space-y-4 bg-gray-light p-5 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-dark font-semibold">
                  {" "}
                  Link #{index + 1}
                </p>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    className="text-gray-dark"
                    variant={"ghost"}
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <FormField
                control={form.control}
                name={`links.${index}.platform`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {options.map((item, optionIndex) => (
                          <SelectItem key={optionIndex} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`links.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light text-sm">Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the URL for your link.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <div className="flex w-full items-end">
            <Button className="self-end  gap-3" type="submit">
              {isLoading && <LoaderCircle className="animate-spin" size={17} />}{" "}
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
