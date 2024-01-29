import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
export default function GoogleButton() {
  return (
    <Button gradientDuoTone="greenToBlue">
      <AiFillGoogleCircle className="mr-2 w-10 h-6 " />
      Sign in with Google
    </Button>
  );
}
