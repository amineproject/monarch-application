"use client"
import { trpc } from "@/trpc/client"
import { Loader2, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/button"

interface VerifyEmailProps {
    token: string
}


const VerifyEmail = ({token}: VerifyEmailProps) => {
    const{ data, isLoading, isError} = trpc.auth.verifyEmail.useQuery({
        token,
    })

    if(isError){
        return (
        <div className="flex flex-col items-center gap-2">
            <XCircle className="h-8 w-8 text-red-600">
            </XCircle>
            <h3 className="font-semibold text-xl">
                    Une erreur est suvenue...
                </h3>
                <p className="text-muted-foreground text-sm">
                    Le mail de vérification est peut etre obsolete... veuillez réessayer...
                </p>
        </div>)
    }

    if(data?.sucess){
        return (
            <div className="flex h-full flex-col items-center justify-center">
                <div className="relative mb-4 h-60 w-60 text-muted-foreground ">
                    <Image
                        src="/hippo-email-sent.png"
                        fill
                        alt="The email was sent"
                    />
                </div>

                <h3 className="font-semibold text-2xl"> 
                    You&apos;ve all set!
                </h3>
                <p className="text-muted-foreground text-center mt-1">
                    Thank you for verfying your email !
                </p>
                <Link className={buttonVariants( {
                        className: "mt-5"
                    })} href="/sign-in"
                >
                    Sign in
                </Link>
            </div>
        )
    }

    if (isLoading){
        return (
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="animate-spin  h-8 w-8 text-zinc-300"/>
                <h3 className="font-semibold text-xl">
                    Verifying...
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        Vérification en cours...
                    </p>
            </div>)
    }

}
export default VerifyEmail