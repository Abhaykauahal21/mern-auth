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

const LoginPage = () => {
    const navigate = useNavigate(); // Add this line to define navigate
    const baseUrl = import.meta.env.VITE_API_BASE_URL; // Add this line to define baseUrl

    // Define the validation schema using zod
    // This schema will validate the form inputs
  
    const formSchema = z.object({
      email : z.string().email({ message: "Invalid email address."  }),
      password: z.string().min(6, { message: "Password must be at least 6 characters.",
      }),
    })
  
    // Initialize the form with react-hook-form
    // and use the zod schema for validation
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      }
    })
  
    const handleForm = async (value) => {
      try {
        // Create a new object with only the fields needed by the backend
        const userData = {
          email: value.email,
          password: value.password
        };
        
        const response = await fetch(`${baseUrl}/api/auth/login`,{
          method: "Post",
          headers : {"Content-type":"application/json"},
          credentials: "include", // Include credentials for cookies to be sent with the request
          body: JSON.stringify(userData) // Send only required fields
        })
        
        const data = await response.json();
        
        if (response.ok) {
          // Status code 2xx (success)
          toast.success(data.message || "Login successful");
          navigate("/dashboard");
        } else {
          toast.error(data.message || "Login failed");
        }
      } catch (error) {
        toast.error("Failed to connect to server");
        console.error("Error:", error);
        console.log("Base URL:", baseUrl);
      }
    }




  return (
    <div className='h-screen w-screen flex items-center justify-center'>

      <Card className="w-96 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8">
  <CardContent>
    <h1 className="text-center text-2xl font-bold drop-shadow-lg mb-6">
      Login an Account
    </h1>

    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleForm)}
        className="space-y-5"
      >
        

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

        

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
        >
          Login
        </Button>
      </form>
    </Form>
    <CardFooter className="mt-6 text-center">
      <p className="text-sm text-gray-400">
        Do not have an account?{' '}
        <Link to="/register" className="text-purple-500 hover:underline">
          Register here
        </Link>
      </p>
    </CardFooter>
  </CardContent>
</Card>


      
    </div>
  )
}

export default LoginPage
