import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { server } from "@/constants";
import { useDispatch } from "react-redux";
import { setEverything } from "@/store/UserSlice.js";

const Signup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const signup = async(data) => {
    console.log(data);
    try {
      await axios.post(`${server}/users/register`,data); 
      const response = await axios.post(`${server}/users/login`, data, {
        withCredentials: true,
      });
      const res = await response.data;
      dispatch(setEverything(res.data.user));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="solid"
            className="bg-purple-500 text-white"
            onClick={() => setIsOpen(true)}
          >
            Sign Up
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-md p-4 bg-black text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Sign Up</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(signup)}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-300"
              >
              Name
              </label>
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    className="mt-1 block w-full bg-black text-white border-gray-700"
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="mt-1 block w-full bg-black text-white border-gray-700"
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
                Username
              </label>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    id="username"
                    type="text"
                    autoComplete="username"
                    className="mt-1 block w-full bg-black text-white border-gray-700"
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className="mt-1 block w-full bg-black text-white border-gray-700"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button variant="default" type="submit">
                Sign Up
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Signup;
