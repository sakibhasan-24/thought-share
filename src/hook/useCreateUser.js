import useAxiosPublic from "./useAxiosPublic";
const axiosPublic = useAxiosPublic();
export default function useCreateUser() {
  const saveUserWhileSignUp = async (user) => {
    const res = await axiosPublic.post("/api/users/signup", user);
    return res.data;
  };

  return { saveUserWhileSignUp };
}
