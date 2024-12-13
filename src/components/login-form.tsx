"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { loginSchema } from "~/lib/schema";
import type { z } from "zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export default function LoginForm() {
  const router = useRouter();
  const wrappedMutation = api.wrapped.create.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("wrapped", JSON.stringify(data));
      router.push("/stories");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    toast.promise(wrappedMutation.mutateAsync(values), {
      loading: "Obtenint el teu wrapped...",
      success: "Wrapped obtingut! Redirigint...",
      error: (error) => `Error al obtenir el wrapped: ${error.message}`,
    });
  }

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center gap-2">
          <Image src="/logo.svg" alt="Bicing" width={100} height={100} />
          <CardTitle className="text-center text-2xl font-black tracking-tighter">
            WRAPPED 2024
          </CardTitle>
        </div>
        <CardDescription className="text-center"></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>
              No emmagatzemem cap tipus de dades personals
            </AlertTitle>
            <AlertDescription>
              Les dades del teu wrapped es guardaran en el teu navegador i no
              son compartides amb cap altre servei.
            </AlertDescription>
            <AlertDescription className="mt-2">
              {"Pots consultar el codi font a "}
              <Link
                className="text-red-500 hover:underline"
                href="https://github.com/crodriguezanton/bicingwrapped"
              >
                GitHub
              </Link>
            </AlertDescription>
          </Alert>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email de SMOU</FormLabel>
                  <FormControl>
                    <Input placeholder="ada@smou.cat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contrasenya</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-red-500 text-white hover:bg-red-600"
              disabled={wrappedMutation.isPending}
              type="submit"
            >
              {wrappedMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Obtenint el meu wrapped...
                </>
              ) : (
                "Obtenir el meu wrapped"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {"Fet amb ❤️ per "}
          <Link
            className="text-red-500 hover:underline"
            href="https://twitter.com/crodriguezanton"
          >
            @crodriguezanton
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
