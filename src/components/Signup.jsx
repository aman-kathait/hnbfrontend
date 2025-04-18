"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Signup = () => {
  const [input, setInput] = useState({
    firstname: "",
    lastnamename: "",
    role: "",
    year: "",
    email: "",
    password: "",
    
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions.");
      return;
    }

    const fullData = { ...input, termsAccepted };
    console.log("Form Data:", fullData);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setInput({
          firstname: "",
          lastnamename: "",
          role: "",
          year: "",
          email: "",
          password: "",
         
        });
        setTermsAccepted(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 sm:px-4">
      <form
        onSubmit={signupHandler}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6 flex flex-col gap-4"
      >
        <div className="text-center">
          <img
            src="hnblogo.png"
            className="mx-auto h-16 w-16 mb-2"
            alt="Logo"
          />
          <p className="text-sm font-bold text-gray-500">
            Connect with your Batch Mates, Alumni and faculties.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <span className="font-medium">First Name</span>
            <Input
              type="text"
              name="firstname"
              value={input.firstname}
              onChange={changeEventHandler}
              className="my-2 h-9"
              required
            />
          </div>

          <div className="w-full">
            <span className="font-medium">Last Name</span>
            <Input
              type="text"
              name="lastname"
              value={input.lastname}
              onChange={changeEventHandler}
              className="my-2 h-9"
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <Select
              onValueChange={(value) => setInput({ ...input, role: value })}
              value={input.role}
              required
            >
              <SelectTrigger className="w-full font-semibold">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <Select
              onValueChange={(value) => setInput({ ...input, year: value })}
              value={input.year}
              disabled={input.role === "teacher"}
              required={input.role !== "teacher"}
            >
              <SelectTrigger
                className={`w-full font-semibold text-black ${
                  input.role === "teacher"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <SelectValue placeholder="Select a year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Year</SelectLabel>
                  {Array.from({ length: 2026 - 2000 }, (_, i) => {
                    const year = 2000 + i;
                    return (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <span className="font-medium">Email</span>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="my-2 h-9"
            required
          />
        </div>

        <div>
          <span className="font-medium">Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="my-2 h-9"
            required
          />
        </div>

        <div className="items-top flex space-x-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={setTermsAccepted}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none"
            >
              Accept terms and conditions
            </label>
            <p className="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>

        {loading ? (
          <Button className="h-10 w-full" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="h-10 w-full" type="submit">
            Signup
          </Button>
        )}

        <span className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
