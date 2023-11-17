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
import { loginUser } from "@/lib/actions/users.actions";
import { fetchToken } from "@/lib/actions/tokenClient";

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
      // const signIn =

      // await loginUser(data);

      // return signIn;

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-4xl mx-auto mt-36"
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
                  <Input type="password" placeholder="password" {...field} />
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default SignIn;
