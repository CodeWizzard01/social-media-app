"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { signupAction } from "./actions";
import { useToast } from "@/components/ui/use-toast";


function Signup() {
    const { toast } = useToast();
    const handleSubmit = async (formData: FormData) => {
        await signupAction(formData);
        toast({ description: "Account created. You can login now" });
    };
  return (
    <div className="flex items-center justify-center">
      <Card className="w-1/3 h-1/3 m-20">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                required
              />
            </div>
            <div>
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <Input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                accept="image/*"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" variant="outline">
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Signup;
