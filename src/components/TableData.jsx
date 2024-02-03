import { Button, TableBody, TableCell, TableRow } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function TableData({ contentsOfTable, handleDelete }) {
  return (
    <TableBody className="">
      <TableRow className="bg-white ">
        <TableCell>
          {new Date(contentsOfTable?.createdAt).toLocaleString()}
        </TableCell>
        <TableCell>
          <Link to="/">
            <img
              src={contentsOfTable.image}
              alt="img"
              className="w-10 h-10 rounded-full object-cover"
            />
          </Link>
        </TableCell>
        <TableCell>{contentsOfTable.title}</TableCell>
        <TableCell>{contentsOfTable.category}</TableCell>
        <TableCell>
          <span
            onClick={() => handleDelete(contentsOfTable._id)}
            className="font-medium text-red-500 hover:underline text-xs cursor-pointer"
          >
            Delete
          </span>
        </TableCell>
        <TableCell>
          <Link to={`/dashboard/edit/${contentsOfTable._id}`}>
            <span className="font-medium text-green-500 hover:underline text-xs cursor-pointer">
              edit
            </span>
          </Link>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
