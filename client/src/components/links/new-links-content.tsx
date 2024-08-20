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
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/constants";
import { getUserUUID } from "@/lib/auth";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";

import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { NewPreview } from "./new-preview";
import { revalidatePathServer } from "@/app/actions";

const formSchema = z.object({
  links: z.array(
    z.object({
      platform: z.string().min(2).max(50),
      url: z.string().url().min(2).max(50),
      index: z.number(),
    }),
  ),
});

export const NewLinks = ({
  userProfile,
  defaultLinks,
}: {
  userProfile: any;
  defaultLinks: any;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [deletedEntries, setDeletedEntries] = useState<number[]>([]);
  const [newLinks, setNewLinks] = useState<number[]>([]);
  const [editedLinks, setEditedLinks] = useState<number[]>([]);

  const [currentLinks, setCurrentLinks] = useState<any>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      links:
        defaultLinks && defaultLinks.length > 0
          ? // @ts-ignore
            defaultLinks.map((link) => ({
              platform: link.platform,
              url: link.url,
              index: link.index,
            }))
          : [{ platform: "", url: "", index: 0 }],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, "FROM SUBMIT");
    setIsLoading(true);

    try {
      const postPromises = values.links.map(async (item, index) => {
        if (newLinks.includes(index)) {
          console.log("POSTING");
          const url = `${API_BASE_URL}/links`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              platform: item.platform,
              index: item.index,
              url: item.url,
              user_id: getUserUUID(),
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.detail;
            toast.error(errorMessage, {
              richColors: true,
            });
            throw new Error(errorMessage);
          }
        }
      });

      const patchPromises = values.links.map(async (item, index) => {
        if (editedLinks.includes(index) && defaultLinks.length !== 0) {
          console.log("EDITING");
          const linkId = defaultLinks[index].uuid;
          const url = `${API_BASE_URL}/links/${linkId}`;
          const response = await fetch(url, {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              platform: item.platform,
              url: item.url,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.detail;
            toast.error(errorMessage, {
              richColors: true,
            });
            throw new Error(errorMessage);
          }
        }
      });

      const deletePromises = deletedEntries.map(async (uuid) => {
        const url = `${API_BASE_URL}/links/${uuid}`;
        const response = await fetch(url, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.message || errorData.detail;
          toast.error(errorMessage, {
            richColors: true,
          });
          throw new Error(errorMessage);
        }
      });

      await Promise.all([...postPromises, ...patchPromises, ...deletePromises]);

      setDeletedEntries([]);
      setNewLinks([]);
      setEditedLinks([]);
      await revalidatePathServer("links");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false); // Set loading state to false after all operations
    }
  }

  const links = form.watch("links");

  useEffect(() => {
    setCurrentLinks(links);
  }, [links]);

  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  // Track newly added links
  const handleAppend = () => {
    append({ platform: "", url: "", index: fields.length });
    setNewLinks((prev) => [...prev, fields.length]);
  };

  // Track edited links
  const handleChange = (index: number) => {
    if (!newLinks.includes(index) && !editedLinks.includes(index)) {
      setEditedLinks((prev) => [...prev, index]);
    }
  };

  const handleRemove = (index: number) => {
    if (defaultLinks[index]) {
      const deletedLink = defaultLinks.splice(index, 1)[0];
      setDeletedEntries((prev) => [...prev, deletedLink.uuid]);
    }
    remove(index);

    // Remove from editedLinks and newLinks if exists
    setEditedLinks((prev) => prev.filter((i) => i !== index));
    setNewLinks((prev) => prev.filter((i) => i !== index));
  };

  return (
    <main className="grid grid-cols-2 gap-4">
      <NewPreview links={currentLinks} userProfileDetails={userProfile} />
      <div className="py-8 px-7 bg-white">
        <Button
          type="button"
          variant={"outline"}
          className="w-full mb-4"
          onClick={handleAppend}
        >
          Add Link
        </Button>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white flex flex-col gap-4"
          >
            <Sortable
              value={fields}
              onMove={({ activeIndex, overIndex }) =>
                move(activeIndex, overIndex)
              }
              overlay={
                <div className="flex flex-col items-center gap-2 bg-[#fafafa] p-4 rounded-lg">
                  <div className="flex items-center justify-between w-full gap-4 mb-4">
                    <div className="h-8 w-32 shrink-0 rounded-sm bg-primary/10" />
                    <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
                  </div>
                  <div className="h-8 w-full rounded-sm bg-primary/10" />
                  <div className="h-8 w-full rounded-sm bg-primary/10" />
                </div>
              }
            >
              <div className="flex w-full flex-col gap-6">
                {fields.map((field, index) => (
                  <SortableItem key={field.id} value={field.id} asChild>
                    <div
                      key={field.id}
                      className="space-y-4 bg-gray-light p-5 rounded-xl"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <SortableDragHandle
                            variant="outline"
                            size="icon"
                            className="size-8 shrink-0"
                          >
                            <DragHandleDots2Icon
                              className="size-4"
                              aria-hidden="true"
                            />
                          </SortableDragHandle>
                          <p className="text-gray-dark font-semibold">
                            Link #{index + 1}
                          </p>
                        </div>
                        <Button
                          type="button"
                          className="text-gray-dark"
                          variant={"ghost"}
                          onClick={() => handleRemove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name={`links.${index}.platform`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Platform</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                handleChange(index);
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a platform" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {options.map((item, optionIndex) => (
                                  <SelectItem
                                    key={optionIndex}
                                    value={item.value}
                                  >
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
                            <FormLabel className="font-light text-sm">
                              Link
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://example.com"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleChange(index);
                                }}
                              />
                            </FormControl>
                            <FormDescription>
                              Enter the URL for your link.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </SortableItem>
                ))}
              </div>
            </Sortable>
            <div className="flex w-full items-end">
              <Button className="self-end gap-3" type="submit">
                {isLoading && (
                  <LoaderCircle className="animate-spin" size={17} />
                )}
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};
