"use client"

import { useEffect, useState } from "react"
import { getProviders, signIn } from "next-auth/react"
import Button from "./Button";

type Provider = {
  id: string;
  name: string;
  type: string;
  signInUrl: string;
  callbackUrl: string;
  signInUrlParams?: Record<string, string> | null
}

type Providers = Record<string, Provider>

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null)
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      //@ts-ignore
      setProviders(res)
    }
    fetchProviders()
  }, [])

  if (providers) {
    return (
      <div>
        {
          Object.values(providers).map((provider: Provider, i) => (
            <Button
              key={i}
              title={`Sign in with ${provider.name}`}
              handleClick={() => signIn(provider?.id)}
            />
          ))
        }
      </div>
    )
  }
}

export default AuthProviders