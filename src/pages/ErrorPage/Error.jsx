import { Button } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const handleNavigate = (direction) => {
    navigate(direction);
  };
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
      <div>
        <h1 className="sm:text-6xl font-semibold">
          <span className="text-red-700">404</span> error!
        </h1>
      </div>
      <div className="flex items-center justify-center gap-6 my-6">
        <Link to="/">
          <Button>Go home</Button>
        </Link>

        <Button onClick={() => handleNavigate(-1)} gradientMonochrome="failure">
          Go back
        </Button>
      </div>
    </div>
  );
}
