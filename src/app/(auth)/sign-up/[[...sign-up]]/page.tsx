import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return(
    <div className="flex justify-center items-center h-screen ">
      <head>
        <title>Sign Up</title>
      </head>
      <SignUp />
    </div>
  ) 
}