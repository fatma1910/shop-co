import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex justify-center items-center h-screen ">
      <head>
        <title>Sign In</title>
      </head>
      <SignIn/>
    </section>
  );
}