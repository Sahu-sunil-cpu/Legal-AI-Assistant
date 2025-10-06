"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Gavel, Shield, Zap, Globe, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profession: "",
    agreeTerms: false
  });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // For now, just navigate to assistant - later integrate with Supabase
    router.push("/LexiAssist/Chat");
  };


  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-cyan-400" />
              <span className="text-cyan-400 font-medium">Join LexiAssist</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Transform Your Legal Practice
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Join thousands of legal professionals using India's most advanced AI legal assistant. 
              Experience the future of legal research and practice management.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <Card className="w-full max-w-md bg-gray-900/50 border-gray-800 backdrop-blur-sm animate-scale-in">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-white text-center">
                  Create Account
                </CardTitle>
                <CardDescription className="text-gray-400 text-center">
                  Get started with your AI legal assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profession" className="text-gray-300">Profession</Label>
                    <Select onValueChange={(value) => setFormData({...formData, profession: value})}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                        <SelectValue placeholder="Select your profession" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="lawyer">Lawyer</SelectItem>
                        <SelectItem value="law-student">Law Student</SelectItem>
                        <SelectItem value="paralegal">Paralegal</SelectItem>
                        <SelectItem value="legal-advisor">Legal Advisor</SelectItem>
                        <SelectItem value="corporate-counsel">Corporate Counsel</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => setFormData({...formData, agreeTerms: checked as boolean})}
                      className="border-gray-600"
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-300">
                      I agree to the{" "}
                      <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={!formData.agreeTerms}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-2.5 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-center text-gray-400">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key benefits below the form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="text-center p-6 rounded-lg bg-gray-900/30 border border-gray-800">
              <Zap className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Instant Insights</h3>
              <p className="text-sm text-gray-400">Get immediate answers to legal questions with AI-powered research</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-900/30 border border-gray-800">
              <Shield className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Secure & Confidential</h3>
              <p className="text-sm text-gray-400">Bank-grade security for all your legal documents and data</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-900/30 border border-gray-800">
              <Globe className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Indian Law Database</h3>
              <p className="text-sm text-gray-400">Complete access to Indian legal database and precedents</p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center space-x-8 text-gray-400 mt-12 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">10K+</div>
              <div className="text-sm">Legal Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">1M+</div>
              <div className="text-sm">Cases Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">99.9%</div>
              <div className="text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;