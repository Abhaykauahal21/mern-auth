import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from "sonner"



const RegisterPage = () => {

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  // Define the validation schema using zod
  // This schema will validate the form inputs

  const formSchema = z.object({
    name: z.string().min(3, {
    message: "Username must be at least 3 characters.",
    }),
    email : z.string().email({ message: "Invalid email address."  }),
    password: z.string().min(6, { message: "Password must be at least 6 characters.",
    }),
    conformPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters." })
  }).refine((data) => data.password === data.conformPassword, {
    message: "Passwords don't match",
  })

  // Initialize the form with react-hook-form
  // and use the zod schema for validation

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      conformPassword: ""
    }
  })

  const handleForm = async (value) => {
    try {
      // Create a new object with only the fields needed by the backend
      const userData = {
        name: value.name,
        email: value.email,
        password: value.password
      };
      
      const response = await fetch(`${baseUrl}/api/auth/register`,{
        method: "Post",
        headers : {"Content-type":"application/json"},
        body: JSON.stringify(userData) // Send only required fields
      })
      
      const data = await response.json();
      
      if (response.ok) {
        // Status code 2xx (success)
        toast.success(data.message || "Registration successful");
        navigate("/login");
      } else {
        // Status code 4xx or 5xx (error)
        // This will catch the "User already registered" message from your backend
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Failed to connect to server");

    }
  }


  return (
    <div className='h-screen w-screen flex items-center justify-center'>

      <Card className="w-96 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8">
  <CardContent>
    <h1 className="text-center text-2xl font-bold drop-shadow-lg mb-6">
      Create an Account
    </h1>

    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleForm)}
        className="space-y-5"
      >
        {/* Username */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2">Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your username"
                  className="bg-white/20 border placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your email"
                  className="border placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder="Enter your password"
                  className="placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="conformPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder="Confirm your password"
                  className="placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
        >
          Sign Up
        </Button>
      </form>
    </Form>
    <CardFooter className="mt-6 text-center">
      <p className="text-sm text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="text-purple-500 hover:underline">
          Login here
        </Link>
      </p>
    </CardFooter>
  </CardContent>
</Card>




      
    </div>
  )
}

export default RegisterPage
