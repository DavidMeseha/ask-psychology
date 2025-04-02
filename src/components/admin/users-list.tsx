"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Check, X } from "lucide-react";

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
  const [usersList, setUsersList] = useState(users);

  async function handleVerifyEmail(userId: string) {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to verify user");
      }

      setUsersList((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, emailVerified: true } : user
        )
      );

      toast({
        title: "Success",
        description: "User email verified successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to verify user email",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email Verified</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            usersList.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "admin" ? "default" : "outline"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.emailVerified ? (
                    <Badge className="bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  ) : (
                    <Badge
                      variant="destructive"
                      className="bg-red-100 text-red-800"
                    >
                      <X className="h-3 w-3 mr-1" /> Not Verified
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {!user.emailVerified && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVerifyEmail(user._id)}
                    >
                      Verify Email
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
