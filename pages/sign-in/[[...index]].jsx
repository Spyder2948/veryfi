import React from "react";
import { ClerkProvider ,SignIn } from "@clerk/nextjs";
import LoginLayout from "@/components/LoginLayout";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
          <>
          <SignIn appearance={{
          variables: {
            fontSize: "19.5px",
            colorPrimary: "#fd7e14",
          }
         }}/>
          </>
  )

}

SignInPage.getLayout = function getLayout(page){
    return <ClerkProvider
            appearance={{
              baseTheme: dark,
            }}
            >
            <LoginLayout>
              {page}
            </LoginLayout>
            </ClerkProvider>;
};