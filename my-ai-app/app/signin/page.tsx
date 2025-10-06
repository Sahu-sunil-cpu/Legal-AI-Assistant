"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gavel, Scale, FileText, Users, ArrowRight, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/LexiAssist/Chat");
  };


  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Continue Your Legal Journey
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Access India's most advanced AI legal assistant. Get instant legal guidance, 
              research support, and document assistance tailored for Indian law.
            </p>
          </div>

          <div className="flex justify-center">
            <Card className="w-full max-w-md bg-gray-900/50 border-gray-800 backdrop-blur-sm animate-scale-in">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-white text-center">
                  Sign In
                </CardTitle>
                <CardDescription className="text-gray-400 text-center">
                  Enter your credentials to access your legal assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>
                  <div className="text-right">
                    <Link href="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-2.5 transition-all duration-300 hover:scale-105"
                  >
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-center text-gray-400">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                      Sign up
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key features below the form */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="text-center p-6 rounded-lg bg-gray-900/30 border border-gray-800">
              <Scale className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">AI Legal Research</h3>
              <p className="text-sm text-gray-400">Instant access to case laws and legal precedents</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-900/30 border border-gray-800">
              <FileText className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Document Assistance</h3>
              <p className="text-sm text-gray-400">AI-powered drafting and document review</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-900/30 border border-gray-800">
              <Gavel className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-400">Round-the-clock legal guidance and consultation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;