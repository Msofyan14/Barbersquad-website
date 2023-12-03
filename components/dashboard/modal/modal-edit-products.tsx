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

import { Textarea } from "@/components/ui/textarea";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { useEdgeStore } from "@/lib/edgestore";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import {
  MultiFileDropzone,
  type FileState,
} from "@/components/multi-file-image-dropzone";
import { FormProductsValidation } from "@/lib/validations/types";
import {
  addProduct,
  deleteProduct,
  editProduct,
} from "@/lib/actions/products.actions";
import { useEditProducts } from "@/hooks/use-edit-products";

type ProductValidation = z.infer<typeof FormProductsValidation>;

export default function ModalEditProducts() {
  const { productById, isOpen, isLoading, onClose } = useEditProducts();

  const form = useForm<ProductValidation>({
    resolver: zodResolver(FormProductsValidation),
    defaultValues: {
      name: productById?.name || "",
      price: productById?.price || 0,
      description: productById?.description || "",
      images: productById?.images || [""],
    },
  });

  const [fileStates, setFileStates] = useState<FileState[]>([]);

  const { edgestore } = useEdgeStore();

  const pathname = usePathname();

  useEffect(() => {
    form.reset(productById);
    // @ts-ignore

    const productImages = productById?.images || [];

    const fileStatesFromImages = productImages.map((imageUrl) => ({
      file: null,
      url: imageUrl,
      key: Math.random().toString(36).slice(2),
      progress: "PENDING",
    }));

    // @ts-ignore
    setFileStates(fileStatesFromImages);
  }, [productById]);

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

  const existImage = productById?.images;
  const currentImage = fileStates
    .filter((file) => file.url !== undefined)
    .map((link) => link.url);
  const nonExistingImages = existImage?.filter(
    (url) => !currentImage.includes(url)
  );

  console.log(nonExistingImages);

  const onSubmit: SubmitHandler<ProductValidation> = async (data) => {
    try {
      const urlImage = fileStates.map((file) => file.url);
      const existImage = productById?.images;
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
        const parsedPayload = FormProductsValidation.safeParse(data);
        if (parsedPayload.success) {
          await editProduct({
            id: productById?._id,
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

        const parsedPayload = FormProductsValidation.safeParse(payload);

        if (parsedPayload.success) {
          await editProduct({
            id: productById?._id,
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

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={"bottom"} className="h-[80%] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Your Product</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            {isLoading ? (
              <Loader2 className="animate-spin w-8 h-8 max-w-xl mx-auto mt-[120px]" />
            ) : (
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
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <>
                          <Input type="number" placeholder="email" {...field} />
                          {form.formState.errors.price && (
                            <p className="text-sm text-red-500">
                              {form.formState.errors.price?.message}
                            </p>
                          )}
                        </>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descriptions</FormLabel>
                      <FormControl>
                        <>
                          <Textarea placeholder="description" {...field} />
                          {form.formState.errors.description && (
                            <p className="text-sm text-red-500">
                              {form.formState.errors.description?.message}
                            </p>
                          )}
                        </>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Product Images</FormLabel>
                      <FormControl>
                        <>
                          <div className="">
                            <MultiFileDropzone
                              {...field}
                              className="w-full"
                              value={fileStates}
                              dropzoneOptions={{
                                maxFiles: 4,
                                maxSize: 1024 * 1024 * 1, // 1 MB
                              }}
                              onChange={setFileStates}
                              onFilesAdded={async (addedFiles) => {
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
            )}
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
