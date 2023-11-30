"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
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

import { useAddTeams } from "@/hooks/use-add-teams";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { z } from "zod";
import { FormTeamsValidation } from "@/lib/validations/types";
import { SingleImageDropzone } from "../../single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";
import { addTeams } from "@/lib/actions/teams.actions";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

type TeamsValidation = z.infer<typeof FormTeamsValidation>;

export default function ModalAddTeams() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const pathname = usePathname();

  const form = useForm<TeamsValidation>({
    resolver: zodResolver(FormTeamsValidation),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: 62,
      image: "",
    },
  });

  const modal = useAddTeams();

  const onClose = () => {
    setFile(undefined);
    form.reset();
    modal.onClose();
  };

  const onSubmit: SubmitHandler<TeamsValidation> = async (data) => {
    try {
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
        });

        const payload = {
          ...data,
          image: res.url,
        };

        const parsedPayload = FormTeamsValidation.safeParse(payload);

        if (parsedPayload.success) {
          await addTeams(parsedPayload.data, pathname).then(() => {
            toast.success("Success add team");
          });
        }
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <>
                        <Input placeholder="email" {...field} />
                        {form.formState.errors.email && (
                          <p className="text-sm text-red-500">
                            {form.formState.errors.email?.message}
                          </p>
                        )}
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Whastapp</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type="number"
                          placeholder="whatsapp"
                          {...field}
                        />
                        {form.formState.errors.whatsapp && (
                          <p className="text-sm text-red-500">
                            {form.formState.errors.whatsapp?.message}
                          </p>
                        )}
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Profile Image</FormLabel>
                    <FormControl>
                      <>
                        <SingleImageDropzone
                          {...field}
                          className="w-full"
                          value={file}
                          onChange={(file) => {
                            setFile(file);
                            form.setValue("image", file?.name!);
                          }}
                        />
                        {form.formState.errors.image && (
                          <p className="text-sm text-red-500">
                            {form.formState.errors.image?.message}
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
