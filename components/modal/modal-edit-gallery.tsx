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
import { Input } from "../ui/input";
import { useEdgeStore } from "@/lib/edgestore";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  MultiFileDropzone,
  type FileState,
} from "@/components/multi-file-image-dropzone";
import { FormGalleryValidation } from "@/lib/validations/types";
import { useEditGallery } from "@/hooks/use-edit-gallery";
import { editGallery } from "@/lib/actions/gallery.actions";

type GalleryValidation = z.infer<typeof FormGalleryValidation>;

export default function ModalEditGallery() {
  const { galleryById, isOpen, onClose } = useEditGallery();

  const form = useForm<GalleryValidation>({
    resolver: zodResolver(FormGalleryValidation),
    defaultValues: {
      name: galleryById?.name || "",
      images: galleryById?.images || [],
    },
  });

  const [fileStates, setFileStates] = useState<FileState[]>([]);

  const { edgestore } = useEdgeStore();

  const pathname = usePathname();

  useEffect(() => {
    form.reset(galleryById);
    // @ts-ignore

    const productImages = galleryById?.images || [];

    const fileStatesFromImages = productImages.map((imageUrl) => ({
      file: null,
      url: imageUrl,
      key: Math.random().toString(36).slice(2),
      progress: "PENDING",
    }));

    // @ts-ignore
    setFileStates(fileStatesFromImages);
  }, [galleryById]);

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

  const handleOnClose = () => {
    form.reset();
    onClose();
  };

  //   const existImage = galleryById?.images;
  //   const currentImage = fileStates
  //     .filter((file) => file.url !== undefined)
  //     .map((link) => link.url);
  //   const nonExistingImages = existImage?.filter(
  //     (url) => !currentImage.includes(url)
  //   );

  //   console.log(nonExistingImages);

  const onSubmit: SubmitHandler<GalleryValidation> = async (data) => {
    try {
      const urlImage = fileStates.map((file) => file.url);
      const existImage = galleryById?.images;
      const isFileToUpdload = fileStates.map((file) => file.file);
      const currentImage = fileStates
        .filter((file) => file.url !== undefined)
        .map((link) => link.url);

      const nonExistingImages = existImage?.filter(
        (url) => !currentImage.includes(url)
      );

      const isEqual =
        urlImage?.length === existImage?.length &&
        urlImage.every((value, index) => value === existImage[index]);

      if (isEqual) {
        const parsedPayload = FormGalleryValidation.safeParse(data);
        if (parsedPayload.success) {
          await editGallery({
            id: galleryById?._id,
            data: parsedPayload.data,
            pathname: pathname,
          }).then(() => {
            toast.success("Success Edit product");
          });
        }
      } else {
        const editedImage = await Promise.all(
          fileStates
            .filter((fileState) => fileState.file !== null) // Filter out entries with null files
            .map(async (fileState, index) => {
              let targetUrltoReplace;

              if (currentImage.length === 0 && isFileToUpdload) {
                targetUrltoReplace =
                  existImage && existImage.length > index
                    ? existImage[index]
                    : undefined;
              } else {
                targetUrltoReplace = nonExistingImages
                  ? nonExistingImages[index]
                  : undefined;
              }

              try {
                if (fileState.progress !== "PENDING") return;

                const res = await edgestore.publicFiles.upload({
                  file: fileState.file,
                  options: {
                    replaceTargetUrl: targetUrltoReplace,
                  },

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

        let payload;

        if (currentImage.length >= 1 && !!isFileToUpdload) {
          payload = {
            ...data,
            images: [...currentImage, ...editedImage],
          };
        } else {
          payload = {
            ...data,
            images: editedImage,
          };
        }

        const parsedPayload = FormGalleryValidation.safeParse(payload);

        if (parsedPayload.success) {
          await editGallery({
            id: galleryById?._id,
            data: parsedPayload.data,
            pathname: pathname,
          }).then(() => {
            toast.success("Success Edit products");
          });
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      handleOnClose();
    }
  };

  console.log(fileStates);

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={"bottom"} className="h-[80%] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Your Teams</SheetTitle>
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
