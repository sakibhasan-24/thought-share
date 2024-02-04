import React from "react";
import { useShowUser } from "../../apiCallHooks/showUsers";
import { Table, TableHead, TableHeadCell } from "flowbite-react";
import TableData from "../../components/TableData";
import UserTable from "./UserTable";

export default function Users() {
  const { users } = useShowUser();
  //   console.log(users);
  return (
    <div className="table-auto md:mx-auto p-4 overflow-x-auto  scrollbar scrollbar-track-slate-200 scrollbar-thumb-slate-800">
      {users?.length > 0 ? (
        <>
          <Table hoverable className="shadow-md ">
            <TableHead>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>image</TableHeadCell>
              <TableHeadCell>email</TableHeadCell>

              <TableHeadCell>delete</TableHeadCell>
              <TableHeadCell>Role</TableHeadCell>
            </TableHead>
            {users?.map((user) => (
              <UserTable key={user._id} contentsOfTable={user} />
            ))}
          </Table>
        </>
      ) : (
        "nothing is found"
      )}
    </div>
  );
}
