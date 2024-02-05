import { TableBody, TableCell, TableRow } from "flowbite-react";
import React from "react";

export default function UserTable({ contentsOfTable }) {
  //   console.log(contentsOfTable?.userCreated);
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          {new Date(parseInt(contentsOfTable?.userCreated)).toLocaleString()}
        </TableCell>
        <TableCell>
          <img
            className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
            src={contentsOfTable?.userPhoto || contentsOfTable?.userPhot}
            alt="img"
          />
        </TableCell>
        <TableCell>{contentsOfTable?.email}</TableCell>
        <TableCell>
          <span className="text-red-700 hover:underline cursor-pointer ">
            delete
          </span>
        </TableCell>
        <TableCell>
          <span className="text-green-700 hover:underline cursor-pointer ">
            {/* if admin then admin,if user then user if premium then premium */}
            admin
          </span>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
