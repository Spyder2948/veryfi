import React from "react";
import { ClerkLoaded, ClerkLoading, ClerkProvider, SignUp } from "@clerk/nextjs";
import LoginLayout from "@/components/LoginLayout";
import { dark } from '@clerk/themes';

export default function SignUpPage() {
  return (
        <>
         <SignUp appearance={{
          variables: {
            fontSize: "19.5px",
            colorPrimary: "#fd7e14",
          }
         }}/>
        </>
        )
}

SignUpPage.getLayout = function getLayout(page){
    return <ClerkProvider
            appearance={{
              baseTheme: dark,
            }}
            >
            <LoginLayout>
              <ClerkLoading>

              </ClerkLoading>

              <ClerkLoaded>
                {page}
              </ClerkLoaded>

            </LoginLayout>
            </ClerkProvider>;
}