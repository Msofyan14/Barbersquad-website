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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { z } from "zod";
import { FormTeamsValidation } from "@/lib/validations/types";
import { SingleImageDropzone } from "../single-image-dropzone";
import { useEffect, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";
import { editTeam } from "@/lib/actions/teams.actions";
import { usePathname } from "next/navigation";
import { useEditTeams } from "@/hooks/use-edit-team";
import { Loader2 } from "lucide-react";

type TeamsValidation = z.infer<typeof FormTeamsValidation>;

export default function ModalEditTeams() {
  const [file, setFile] = useState<File | undefined>();
  const { edgestore } = useEdgeStore();

  const pathname = usePathname();
  const modal = useEditTeams();
  const { teamByid } = useEditTeams();

  const form = useForm<TeamsValidation>({
    resolver: zodResolver(FormTeamsValidation),
    defaultValues: {
      name: teamByid?.name || "",
      email: teamByid?.email || "",
      whatsapp: teamByid?.whatsapp || 62,
      image: teamByid?.image || "",
    },
  });

  useEffect(() => {
    form.reset(teamByid);
    // @ts-ignore
    setFile(teamByid?.image);
  }, [teamByid]);

  const onClose = () => {
    setFile(undefined);
    form.reset();
    modal.onClose();
  };

  const onSubmit: SubmitHandler<TeamsValidation> = async (data) => {
    try {
      if (file === teamByid?.image) {
        const parsedPayload = FormTeamsValidation.safeParse(data);

        if (parsedPayload.success) {
          await editTeam({
            id: teamByid?._id,
            data: parsedPayload.data,
            pathname: pathname,
          }).then(() => {
            toast.success("Success edit team");
          });
        }
      } else {
        if (file) {
          const res = await edgestore.publicFiles.upload({
            file,
            options: {
              replaceTargetUrl: teamByid?.image,
            },
          });

          if (!res) {
            toast.error("Failed to upload image");
            return;
          }

          const payload = {
            ...data,
            image: res.url,
          };

          const parsedPayload = FormTeamsValidation.safeParse(payload);

          if (parsedPayload.success) {
            await editTeam({
              id: teamByid?._id,
              data: parsedPayload.data,
              pathname: pathname,
            }).then(() => {
              toast.success("Success edit team");
            });
          }
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
        <SheetContent
          side={"bottom"}
          className="h-[80%] overflow-y-auto transition duration-300"
        >
          <SheetHeader>
            <SheetTitle>Edit Your Teams</SheetTitle>
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
                    Editing
                  </>
                ) : (
                  "Edit"
                )}
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
