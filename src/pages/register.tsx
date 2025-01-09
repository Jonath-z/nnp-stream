import Image from "next/image";
import Link from "next/link";
import NnpLogo from "@/components/icons/NnpLogo";
import { saveUserEmail, supabase } from "@/services/supabase";
import { useEffect, useState } from "react";
import Spinner from "@/components/icons/Spinner";
import { useRouter } from "next/router";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const saveEmail = async () => {
    try {
      setIsLoading(true);
      await saveUserEmail(email);
      setIsLoading(false);
      localStorage.setItem("nnp-stream-email", email);
      setEmail("");
      router.push("/");
    } catch (err) {
      console.warn({ err });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="fixed h-screen w-screen">
        <Image src="/images/register-bg.png" alt="" fill className="object-cover" />
        <div
          className="fixed bg-gradient-to-tr from-nnp-gradient blur-[100px]
         to-nnp-primary rounded-br-full rounded-tr-full -left-32 w-1/2 h-1/2 bottom-0 -mb-20 z-10"
        />
        <div className="fixed bg-gradient-to-t from-nnp-primary via-nnp-primary blur-[100px] rounded-tl-full w-4/6 -right-0 h-1/2 bottom-0 -mb-20 z-10" />
      </div>
      <div className="max-w-screen-xl mx-auto relative flex flex-col justify-center items-center h-screen">
        <div className="absolute top-5 left-0">
          <Link href="/">
            <NnpLogo />
          </Link>
        </div>
        <div className="max-w-4xl mx-auto flex flex-col gap-5 px-3">
          <h2 className="lg:text-7xl text-4xl text-white font-black text-center ">
            C'est ici que vos histoires prennent vie.
          </h2>
          <small className="text-center text-white">
            "Prêt à explorer nos créations ? inscrivez-vous pour plonger dans notre univers unique."
          </small>
          <div className="flex max-lg:flex-col items-center justify-center gap-3 mt-5">
            <input
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="p-3 w-full lg:w-96 bg-nnp-background/40 border border-nnp-muted rounded-md text-white outline-none"
              placeholder="blaise@gmail.com"
            />
            <button
              disabled={isLoading}
              onClick={saveEmail}
              className="bg-nnp-highlight max-lg:w-full disabled:opacity-70 text-white font-semibold px-10 py-3 rounded-md"
            >
              {isLoading ? <Spinner className="animate-spin text-white" /> : "Enregistez-vous"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
