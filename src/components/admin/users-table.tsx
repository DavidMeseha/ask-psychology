"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: string;
  createdAt: string;
}

interface UsersListProps {
  users: User[];
}

export function UsersList({ users }: UsersListProps) {
  const [usersChanged, setUpdate] = React.useState(new Map<string, string>());
  const [loading, setLoading] = React.useState(false);

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (loading) return;
    const usersTemp = new Map(usersChanged);
    try {
      setLoading(true);

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({ role: newRole }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      usersTemp.set(userId, newRole);
      setUpdate(usersTemp);
    } catch (error) {
      console.error("Error updating user role:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentUserRole = (userId: string, role: string) => {
    if (usersChanged.has(userId)) {
      return usersChanged.get(userId);
    }
    return role;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {loading ? (
                      "Assigning..."
                    ) : (
                      <button
                        onClick={() =>
                          handleRoleChange(
                            user._id,
                            currentUserRole(user._id, user.role) === "user"
                              ? "admin"
                              : "user"
                          )
                        }
                      >
                        {currentUserRole(user._id, user.role) === "user"
                          ? "Assign Admin"
                          : "Remove Admin"}
                      </button>
                    )}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
