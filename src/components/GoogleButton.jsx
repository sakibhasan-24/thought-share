import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import useAuth from "../hook/useAuth";
import { useState } from "react";
import useAxiosPublic from "../apiCallHooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function GoogleButton() {
  const { googleLogIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handleGoogleLogIn = async () => {
    setLoading(true);
    googleLogIn().then(async (res) => {
      const user = res.user;
      const userInfo = {
        name: user.displayName,
        email: user.email,
        userPhot: user.photoURL,
        userCreated: user.metadata.createdAt,
      };
      const response = await axiosPublic.post("/users", userInfo);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Successfully create account",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
      if (response.data.success === false) {
        Swal.fire({
          title: "Welcome Back",
          time: 1500,
        });
        navigate("/dashboard");
      }
    });
  };
  return (
    <Button onClick={handleGoogleLogIn} gradientDuoTone="greenToBlue">
      <AiFillGoogleCircle className="mr-2 w-10 h-6 " />
      Sign in with Google
    </Button>
  );
}
