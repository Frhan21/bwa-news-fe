"use client";

import { User } from "@/model/User";
import { FC, useEffect, useState } from "react";
import { SetupInerceptor } from "../../../../../../lib/axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../../components/submit-button";
import { updatePassword } from "../lib/action";
import { deleteCookie } from "cookies-next";

interface FormUserProps {
  defaultValues?: User | null;
}

const FormUser: FC<FormUserProps> = ({ defaultValues }) => {
  SetupInerceptor();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPasswrd] = useState("");
  const [error, setError] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (defaultValues) {
      setName(defaultValues.name);
      setEmail(defaultValues.email);
      setPassword(defaultValues.password);
    }
  }, [defaultValues]);

  const handleUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);
    setIsLoading(true);

    const res = await Swal.fire({
      title: "Are you sure?",
      text: "Password ini akan diubah dengan yang baru!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085!",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, ubah aja biar ramai",
    });

    if (res.isConfirmed) {
      try {
        await updatePassword({
          current_password: password,
          new_password: newPassword,
          confirm_password: confirmPassword,
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Success",
          text: "Password berhasil diubah",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
        
        deleteCookie("AccessToken"); 
        window.location.reload(); 
      } catch (error: any) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Opps!",
          text: error.message,
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
        setError(error.message || "Error updating password");
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleUser} className="w-[100%] space-y-4">
        {error.length > 0 && (
          <div className="mx-auto my-7 bg-red-700">
            <div className="font-bold mb-4">
              <ul className="list-disc list-inside">
                {error.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              placeholder="Nama user disini..."
              name="name"
              id="name"
              disabled={true}
              value={name}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              placeholder="Email user disini..."
              name="email"
              id="email"
              disabled={true}
              value={email}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="passowrd">Current Password</Label>
            <Input
              placeholder="Password lama nih.."
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new_password">Password Baru ni</Label>
            <Input
              type="password"
              id="new_password"
              name="new_password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm_password">Konfirmasi Password</Label>
            <Input
              type="password"
              name="confirm_password"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPasswrd(e.target.value)}
            />
          </div>
        </div>
        <SubmitButton isLoading={isLoading} />
      </form>
    </>
  );
};

export default FormUser;
