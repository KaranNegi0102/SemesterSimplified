"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    university: "University of Example",
    course: "Computer Science",
    year: "3rd Year",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Toaster />
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">Profile</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-sm">{userData.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-sm">{userData.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                {isEditing ? (
                  <Input
                    id="university"
                    value={userData.university}
                    onChange={(e) =>
                      setUserData({ ...userData, university: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-sm">{userData.university}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                {isEditing ? (
                  <Input
                    id="course"
                    value={userData.course}
                    onChange={(e) =>
                      setUserData({ ...userData, course: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-sm">{userData.course}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              {isEditing ? (
                <Input
                  id="year"
                  value={userData.year}
                  onChange={(e) =>
                    setUserData({ ...userData, year: e.target.value })
                  }
                />
              ) : (
                <p className="text-sm">{userData.year}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
