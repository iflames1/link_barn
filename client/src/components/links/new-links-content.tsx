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
import { Suspense, useEffect, useState, useRef } from "react";
import { API_BASE_URL } from "@/lib/constants";
import { getUserUUID } from "@/lib/auth";
import { toast } from "sonner";
import { LoaderCircle, Minus } from "lucide-react";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";

import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { NewPreview } from "./new-preview";
import { revalidateTagServer } from "@/app/actions";
import GetStarted from "./get-started";
import LoadingForm from "./loading";
import { Skeleton } from "../ui/skeleton";
import { LinkSchema } from "../preview/preview";

const formSchema = z.object({
  links: z.array(
    z.object({
      platform: z.string().min(2).max(50),
      url: z.string().url().min(2).max(50),
      index: z.number(),
      link_title: z.string().max(20).optional(),
    })
  ),
});

export const NewLinks = ({
  userProfile,
  defaultLinks,
}: {
  userProfile: any;
  defaultLinks: any;
}) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deletedEntries, setDeletedEntries] = useState<number[]>([]);
  const [newLinks, setNewLinks] = useState<number[]>([]);
  const [editedLinks, setEditedLinks] = useState<number[]>([]);
  const [defaultLinksLen, setdefaultLinksLen] = useState(defaultLinks.length);
  const [currentLinks, setCurrentLinks] = useState<any>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      links:
        defaultLinks &&
        defaultLinks.length > 0 && // @ts-ignore
        defaultLinks
          .sort((a: LinkSchema, b: LinkSchema) => a.index - b.index)
          .map((link: LinkSchema) => ({
            platform: link.platform,
            url: link.url,
            index: link.index,
            link_title: link.platform === "link" ? link.link_title : "",
          })),
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
            next: {
              tags: ["userProfile"],
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.detail;
            console.log(errorData);
            console.log(response);

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
          console.log(item);
          const response = await fetch(url, {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              platform: item.platform,
              url: item.url,
              index: item.index,
              link_title: item.link_title,
            }),
            next: {
              tags: ["userProfile"],
            },
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
        console.log("DELETING", uuid);
        const url = `${API_BASE_URL}/links/${uuid}`;
        const response = await fetch(url, {
          method: "DELETE",
          next: {
            tags: ["userProfile"],
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.message || errorData.detail;
          console.log(errorData);
          console.log(response);
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
      toast.success("Links updated successfully", {
        richColors: true,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        toast.error(err.message);
      } else {
        console.log("An unknown error occurred:", err);
        toast.error("An unknown error occurred.");
      }
    } finally {
      await revalidateTagServer("userProfile");
      setIsLoading(false);
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

  const handleAppend = () => {
    append({ platform: "", url: "", index: fields.length });
    setNewLinks((prev) => [...prev, fields.length]);
  };

  setTimeout(() => {
    const newForm = formRef.current?.lastElementChild;
    if (newForm) {
      newForm.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 100);

  // const handleChange = (index: number) => {
  //   if (!newLinks.includes(index) && !editedLinks.includes(index)) {
  //     setEditedLinks((prev) => [...prev, index]);
  //   }
  // };

  const handleChange = (index: number) => {
    // setEditedLinks((prev) => {
    //   if (!prev.includes(index) && !newLinks.includes(index)) {
    //     return [...prev, index];
    //   }
    //   return prev;
    // });
    form.setValue(`links.${index}.index`, index);
    setEditedLinks((prev) => {
      if (!prev.includes(index) && !newLinks.includes(index)) {
        return [...prev, index];
      }
      return prev;
    });
  };

  const handleRemove = (index: number) => {
    if (defaultLinks[index]) {
      const deletedLink = defaultLinks.splice(index, 1)[0];
      setDeletedEntries((prev) => [...prev, deletedLink.uuid]);
    }
    remove(index);

    setEditedLinks((prev) => prev.filter((i) => i !== index));
    setNewLinks((prev) => prev.filter((i) => i !== index));
  };

  const handleMinusClick = (index: number) => {
    form.setValue(`links.${index}.platform`, "");
    form.setValue(`links.${index}.link_title`, "");
    handleChange(index);
  };

  return (
    <main className="grid grid-cols-1 show-grid gap-4">
      <div className="hidden show-preview">
        <NewPreview links={currentLinks} userProfileDetails={userProfile} />
      </div>

      <div className="bg-white flex flex-col justify-between rounded-xl z-0 sm:h-[calc(100vh-152px)] h-[calc(100vh-96.37px)] overflow-auto">
        <div className="sm:p-10 p-6">
          <div className="pb-6  relative">
            <h2 className="hM text-black pb-2">Customize your links</h2>
            <p className="bM text-gray-dark pb-10">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>

            <Button
              type="button"
              variant={"outline"}
              className="hS text-base-dark border-[1px] hover:text-base-dark border-base-dark hover:bg-base-light py-[11px] px-7 rounded-lg w-full"
              onClick={handleAppend}
            >
              Add Link
            </Button>
          </div>
          <Suspense fallback={<LoadingForm />}>
            {defaultLinksLen === 0 && links.length == 0 ? (
              <GetStarted />
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="justify-between flex flex-col gap-4 w-full"
                >
                  <Sortable
                    value={fields}
                    onMove={({ activeIndex, overIndex }) => {
                      move(activeIndex, overIndex);

                      const start = Math.min(activeIndex, overIndex);
                      const end = Math.max(activeIndex, overIndex);
                      for (let i = start; i <= end; i++) {
                        handleChange(i);
                      }
                    }}
                    overlay={
                      <div className="flex flex-col items-center gap-2 bg-[#fafafa] p-4 rounded-lg">
                        <div className="flex items-center justify-between w-full gap-4 mb-4">
                          <Skeleton className="h-8 w-32 shrink-0 rounded-sm bg-primary/10" />
                          <Skeleton className="size-8 shrink-0 rounded-sm bg-primary/10" />
                        </div>
                        <div className="w-full flex flex-col gap-3 mb-4">
                          <Skeleton className="h-4 w-20 rounded-sm bg-primary/10" />
                          <Skeleton className="h-8 w-full rounded-sm bg-primary/10" />
                        </div>
                        <div className="w-full flex flex-col gap-3">
                          <Skeleton className="h-4 w-20 rounded-sm bg-primary/10" />
                          <Skeleton className="h-8 w-full rounded-sm bg-primary/10" />
                        </div>
                      </div>
                    }
                  >
                    <div ref={formRef} className="flex w-full flex-col gap-6">
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
                              name={`links.${index}.index`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      className="focus:shadow-active py-5 placeholder:text-black"
                                      type="hidden"
                                      {...field}
                                      value={index}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleChange(index);
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            {form.watch(`links.${index}.platform`) ===
                              "link" && (
                              <FormField
                                control={form.control}
                                name={`links.${index}.link_title`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Link Title</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Button
                                          variant={"outline"}
                                          size={"icon"}
                                          className="absolute h-5 w-5 top-[-4px] right-[-2px]"
                                          type="button"
                                          onClick={() =>
                                            handleMinusClick(index)
                                          }
                                        >
                                          <Minus size={16} />
                                        </Button>
                                        <Input
                                          placeholder="Enter link title"
                                          className="focus:shadow-active py-5 placeholder:text-black"
                                          {...field}
                                          defaultValue={""}
                                          onChange={(e) => {
                                            field.onChange(e);
                                            handleChange(index);
                                          }}
                                        />
                                      </div>
                                    </FormControl>
                                    <FormDescription>
                                      Enter a title for your generic link.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
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
                                      <SelectTrigger
                                        disabled={
                                          form.watch(
                                            `links.${index}.platform`
                                          ) === "link"
                                        }
                                        className="focus:shadow-active py-5 placeholder:text-black"
                                      >
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
                                    Url
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="https://example.com"
                                      className="focus:shadow-active py-5 placeholder:text-black"
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
                  <div className="flex w-full items-end self-end border-t border-t-gray pt-4 flex-col">
                    <Button
                      className="self-end gap-3 hS button text-white bg-base-dark hover:bg-opacity-90"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <LoaderCircle className="animate-spin" size={17} />
                      )}
                      Save
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </Suspense>
        </div>
      </div>
    </main>
  );
};
