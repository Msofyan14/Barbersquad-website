"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { useEdgeStore } from "@/lib/edgestore";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  MultiFileDropzone,
  type FileState,
} from "@/components/multi-file-image-dropzone";
import { FormGalleryValidation } from "@/lib/validations/types";
import { useAddGallery } from "@/hooks/use-add-gallery";
import { addGallery } from "@/lib/actions/gallery.actions";

type GalleryValidation = z.infer<typeof FormGalleryValidation>;

export default function ModalAddGallery() {
  const form = useForm<GalleryValidation>({
    resolver: zodResolver(FormGalleryValidation),
    defaultValues: {
      name: "",
      images: [],
    },
  });
  const [fileStates, setFileStates] = useState<FileState[]>([]);

  const { edgestore } = useEdgeStore();

  const pathname = usePathname();

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  const modal = useAddGallery();

  const onClose = () => {
    form.reset();
    setFileStates([]);
    modal.onClose();
  };

  const onSubmit: SubmitHandler<GalleryValidation> = async (data) => {
    try {
      const uploadedImage = await Promise.all(
        fileStates.map(async (fileState) => {
          try {
            if (fileState.progress !== "PENDING") return;
            const res = await edgestore.publicFiles.upload({
              file: fileState.file,
              onProgressChange: async (progress: any) => {
                updateFileProgress(fileState.key, progress);
                if (progress === 100) {
                  // wait 1 second to set it to complete
                  // so that the user can see the progress bar
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  updateFileProgress(fileState.key, "COMPLETE");
                }
              },
            });

            return res.url;
          } catch (err) {
            updateFileProgress(fileState.key, "ERROR");
          }
        })
      );

      const payload = {
        ...data,
        images: uploadedImage,
      };

      const parsedPayload = FormGalleryValidation.safeParse(payload);

      if (parsedPayload.success) {
        await addGallery(parsedPayload.data, pathname).then(() => {
          toast.success("Success add gallery");
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      onClose();
    }
  };

  return (
    <div>
      <Sheet open={modal.isOpen} onOpenChange={modal.onClose}>
        <SheetContent side={"bottom"} className="h-[80%] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Your Gallery</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-xl mx-auto  "
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <>
                        <Input placeholder="name" {...field} />
                        {form.formState.errors.name && (
                          <p className="text-sm text-red-500">
                            {form.formState.errors.name?.message}
                          </p>
                        )}
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Gallery Images</FormLabel>
                    <FormControl>
                      <>
                        <div className="">
                          <MultiFileDropzone
                            className="w-full"
                            value={fileStates}
                            dropzoneOptions={{
                              maxFiles: 4,
                              maxSize: 1024 * 1024 * 1, // 1 MB
                            }}
                            onChange={setFileStates}
                            onFilesAdded={async (addedFiles) => {
                              addedFiles.forEach((file) => {
                                form.setValue("images", [
                                  ...form.getValues().images,
                                  file?.file.name,
                                ]);
                              });

                              setFileStates([...fileStates, ...addedFiles]);
                            }}
                          />
                        </div>
                        {form.formState.errors.images && (
                          <p className="text-sm text-red-500">
                            {form.formState.errors.images?.message}
                          </p>
                        )}
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                disabled={form.formState.isSubmitting}
                className="w-full disabled:bg-primary/90 "
                type="submit"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                    Submitting
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
