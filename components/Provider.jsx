"use client"; //because we use browser capabilities (client side)

import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default Provider;

//all providers will go to layout --> so that can be used everywhere across the app