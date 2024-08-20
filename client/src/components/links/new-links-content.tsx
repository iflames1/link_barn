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
import PreviewSetup from "../preview/preview-setup";

const formSchema = z.object({
  links: z.array(
    z.object({
      platform: z.string().min(2).max(50),
      url: z.string().url().min(2).max(50),
      index: z.number(),
    }),
  ),
});

export type FormValues = z.infer<typeof formSchema>;

interface NewLinksProps {
  userProfile: any;
}

export const NewLinks: React.FC<NewLinksProps> = ({ userProfile }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentLinks, setCurrentLinks] = useState<FormValues["links"]>([]);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      links: [{ platform: "", url: "", index: 0 }],
    },
  });

  const { fields, append, move, remove, update } = useFieldArray({
    control: form.control,
    name: "links",
    // keyName: "fieldId", // Ensure uniqueness and persistence of keys
  });

  const onSubmit = async (values: FormValues) => {
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
            index: 0, // Update index on server-side if needed
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
  };

  const links = form.watch("links");

  useEffect(() => {
    console.log(links);
    setCurrentLinks(links);
  }, [links]);

  const onMove = ({
    activeIndex,
    overIndex,
  }: {
    activeIndex: number;
    overIndex: number;
  }) => {
    move(activeIndex, overIndex);

    // Update the index field only after the move
    // update(activeIndex, {
    //   ...fields[activeIndex],
    //   index: overIndex, // Update the moved item's index
    // });
  };

  return (
    <main className="grid grid-cols-2 gap-4">
      <PreviewSetup
        links={currentLinks}
        userProfileDetails={userProfile}
        type="new"
      />
      <div className="py-8 px-7 bg-white">
        <Button
          type="button"
          variant={"outline"}
          className="w-full mb-4"
          onClick={() =>
            append({ platform: "", url: "", index: fields.length })
          }
        >
          Add Link
        </Button>
        <LinksForm
          form={form}
          fields={fields}
          onSubmit={onSubmit}
          isLoading={isLoading}
          move={move}
          remove={remove}
          onMove={onMove}
        />
      </div>
    </main>
  );
};

interface LinksFormProps {
  form: ReturnType<typeof useForm<FormValues>>;
  fields: ReturnType<typeof useFieldArray>["fields"];
  onSubmit: (values: FormValues) => Promise<void>;
  isLoading: boolean;
  move: ReturnType<typeof useFieldArray>["move"];
  remove: ReturnType<typeof useFieldArray>["remove"];
  onMove: ({
    activeIndex,
    overIndex,
  }: {
    activeIndex: number;
    overIndex: number;
  }) => void;
}

const LinksForm: React.FC<LinksFormProps> = ({
  form,
  fields,
  onSubmit,
  isLoading,
  remove,
  onMove,
  move,
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white flex flex-col gap-4"
      >
        <Sortable value={fields} onMove={move}>
          <div className="flex w-full flex-col gap-6">
            {fields.map((field, index) => (
              <SortableItem key={field.fieldId} value={field.id} asChild>
                <div className="space-y-4 bg-gray-light p-5 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <SortableDragHandle
                        onClick={(e) => e.preventDefault()}
                        type="button"
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
                        <FormLabel className="font-light text-sm">
                          Link
                        </FormLabel>
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
              </SortableItem>
            ))}
          </div>
        </Sortable>
        <div className="flex w-full items-end">
          <Button className="self-end  gap-3" type="submit">
            {isLoading && <LoaderCircle className="animate-spin" size={17} />}{" "}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
