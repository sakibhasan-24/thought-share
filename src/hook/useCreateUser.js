import useAxiosPublic from "./useAxiosPublic";
const axiosPublic = useAxiosPublic();
export default function useCreateUser() {
  const saveUserWhileSignUp = async (user) => {
    try {
      const res = await axiosPublic.post("/api/users/signup", user);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  };

  return { saveUserWhileSignUp };
}
