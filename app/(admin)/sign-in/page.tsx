"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormLoginValidation } from "@/lib/validations/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

type LoginTypes = z.infer<typeof FormLoginValidation>;

function SignIn() {
  const form = useForm<LoginTypes>({
    resolver: zodResolver(FormLoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginTypes> = async (data) => {
    try {
      const login = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (login?.ok) {
        toast.success(`Login Success`);
        router.push("/dashboard");
      } else if (login?.error) {
        toast.error(login?.error);
      }
    } catch (error) {
      toast.error(`Something went wrong`);
    }
  };

  return (
    <section className="h-screen p-10 flex flex-col justify-center rounded-lg border">
      <div className="">
        <Image
          className="mx-auto my-8"
          src="/logo.svg"
          priority
          width={100}
          height={100}
          alt="logo"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-xl mx-auto  "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <>
                      <Input placeholder="email" {...field} />
                      {form.formState.errors.password && (
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                      {form.formState.errors.password && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.password?.message}
                        </p>
                      )}
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-full " type="submit">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default SignIn;
