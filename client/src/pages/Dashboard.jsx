import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { toast } from "sonner"


const Dashboard = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
     const getUser = async () =>{
       const response = await fetch(`${baseUrl}/api/auth/get-user`,{
         credentials: 'include',
       })
       const data = await response.json();
       if(!data.status){
         navigate('/login')
       }
       setUser(data.user);
     }
     getUser(); 
  },[])
  
  const handleLogout = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (data.status) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message || 'Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred during logout');
    }
  };
  
  if(!user){
    return <>Loading....</>
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-4'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold mb-2'>Welcome {user.name}</h1>
        <p className='text-gray-600'>Email: {user.email}</p>
      </div>
      
      <Button 
        variant="destructive" 
        onClick={handleLogout}
        className="mt-4"
      >
        Logout
      </Button>
    </div>
  )
}

export default Dashboard
