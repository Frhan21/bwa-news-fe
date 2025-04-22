"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { formSchema } from "./validation";
import axiosInstance from "../../../../../lib/axios";
import { setCookie } from "cookies-next";

const SubmitButton = ({isLoading} : {isLoading: boolean}) => {
  // const { pending } = useFormStatus();

  return (
    <Button disabled={isLoading} className="w-full cursor-pointer" type="submit">
      {isLoading ? "Loading..." : "Submit"}
    </Button>
  );
};

const FormSignIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string[]>([]);


  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError([]);

    setIsLoading(true);
    const validation = formSchema.safeParse({
      email,
      password,
    });
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => issue.message);
      setIsLoading(false);
      setError(errors);
      return;
    }

    try {
      const res = await axiosInstance.post("/login", {
        email:email, 
        password: password
      })

      setCookie("AccessToken", res.data.AccessToken);
      router.push("/dashboard");
    } catch {
      setError(["Login gagal, silahkan coba lagi"]);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="flex min-h-full flex-l flex-col justify-center py-12 px-6 lg:px-96">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in your Account
          </h2>
        </div>

        {error.length > 0 && (
          <div className="mx-auto my-3 bg-red-500 w-[300px] rounded-lg px-4 py-2 text-white">
            <div className="font-bold">Error Message</div>
            <ul className="list-disc list-inside">
              {error?.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              type="email"
              placeholder="Email..."
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Input
              type="password"
              placeholder="Password..."
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <SubmitButton isLoading={isLoading} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormSignIn;
