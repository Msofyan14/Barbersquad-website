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
import { useState } from "react";
import {
  MultiFileDropzone,
  type FileState,
} from "@/components/multi-file-image-dropzone";
import { FormProductsValidation } from "@/lib/validations/types";
import { useAddProducts } from "@/hooks/use-add-products";
import { addProduct } from "@/lib/actions/products.actions";

type ProductValidation = z.infer<typeof FormProductsValidation>;

export default function ModalAddProducts() {
  const form = useForm<ProductValidation>({
    resolver: zodResolver(FormProductsValidation),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
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
  const modal = useAddProducts();

  const onClose = () => {
    form.reset();
    setFileStates([]);
    modal.onClose();
  };

  const onSubmit: SubmitHandler<ProductValidation> = async (data) => {
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

      const parsedPayload = FormProductsValidation.safeParse(payload);

      if (parsedPayload.success) {
        await addProduct(parsedPayload.data, pathname).then(() => {
          toast.success("Success add products");
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
            <SheetTitle>Add Your Product</SheetTitle>
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
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Product Images</FormLabel>
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
