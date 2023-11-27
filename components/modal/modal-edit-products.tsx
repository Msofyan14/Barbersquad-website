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
import { Input } from "../ui/input";
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
import { addProduct, editProduct } from "@/lib/actions/products.action";
import { useEditProducts } from "@/hooks/use-edit-products";

type ProductValidation = z.infer<typeof FormProductsValidation>;

export default function ModalEditProducts() {
  const { productById, isOpen, onClose } = useEditProducts();

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
  const fileToReplace = fileStates.map((filestate) => filestate.file);

  const onSubmit: SubmitHandler<ProductValidation> = async (data) => {
    try {
      const urlImage = fileStates.map((file) => file.url);
      const existImage = productById?.images;

      const isEqual =
        urlImage.length === existImage?.length &&
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
      } else if (isEqual && !!fileToReplace) {
        const editedImage = await Promise.all(
          fileStates.map(async (fileState, index) => {
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
          images: [...existImage, ...editedImage],
        };

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
      } else {
        const editedImage = await Promise.all(
          fileStates.map(async (fileState, index) => {
            try {
              if (fileState.progress !== "PENDING") return;

              const targetUrltoReplace =
                existImage && existImage.length > index
                  ? existImage[index]
                  : undefined;

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

        const payload = {
          ...data,
          images: editedImage,
        };

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
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
