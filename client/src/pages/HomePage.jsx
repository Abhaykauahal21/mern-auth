import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>

      <Card className="w-96 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-6">
        <CardContent>
          <h1 className="text-center text-2xl font-bold  drop-shadow-lg mb-5">
            Welcome To MERN Authentication
          </h1>

          <div className="flex items-center          justify-center gap-8 mt-8">
              <Button className="text-white px-6 py-2 rounded-xl shadow-md hover:scale-105 transition-transform duration-200">
                <Link to="/register">
                  Register
                </Link>
              </Button>
              <Button className="text-white px-6 py-2 rounded-xl shadow-md hover:scale-105 transition-transform duration-200">
                <Link to="/login">
                  Login
                </Link>
              </Button>
          </div>
  </CardContent>
</Card>

      
    </div>
  )
}

export default HomePage
