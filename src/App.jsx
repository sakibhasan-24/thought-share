import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
