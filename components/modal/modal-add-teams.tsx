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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { z } from "zod";
import { FormTeamsValidation } from "@/lib/validations/types";

type TeamsValidation = z.infer<typeof FormTeamsValidation>;

export default function ModalAddTeams() {
  {
    const form = useForm<TeamsValidation>({
      resolver: zodResolver(FormTeamsValidation),
      defaultValues: {
        name: "",
        email: "",
        whatsapp: +62,
        image: "",
      },
    });

    const onSubmit = () => {};

    const modal = useAddTeams();

    return (
      <div>
        <Sheet open={modal.isOpen} onOpenChange={modal.onClose}>
          <SheetContent side={"bottom"} className="h-[70%] md:h-[80%]">
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
                <Button className="w-full " type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
    );
  }
}
