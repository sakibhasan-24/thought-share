import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg mx-auto">
      <div>
        <h1 className="text-center font-bold">
          Porfile <br />
          <span className="text-xl font-semibold text-orange-600">
            {currentUser.userName}
          </span>
        </h1>
        <div className="max-w-xl mx-auto p-4 rounded-lg shadow-2xl shadow-blue-950">
          <div>
            <img
              src={currentUser?.profilePicture}
              alt="userImage"
              className="rounded-full w-[80px] h-[80px] mx-auto mt-4 object-cover cursor-pointer"
              title="Change Profile Picture"
            />
          </div>
          <div>
            <form className="my-6 flex flex-col space-y-4 gap-4">
              <input
                type="text"
                name="userName"
                id="userName"
                defaultValue={currentUser?.userName}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={currentUser?.email}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="**************************"
              />
              <input
                type="submit"
                value={"update"}
                className="w-full rounded-lg bg-slate-800 text-white px-2 py-2 cursor-pointer hover:bg-slate-700 transition-all duration-200"
              />
            </form>
            <div className="flex items-center justify-between">
              <button className="bg-orange-700 text-slate-300 px-4 py-2 rounded-lg">
                SignOut
              </button>
              <button className="text-red-700 font-semibold hover:underline">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
