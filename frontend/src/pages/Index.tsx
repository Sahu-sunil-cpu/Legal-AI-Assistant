
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, Clock, FileText, MessageSquare, Scale, Users, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Welcome to the
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                lexiverse
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Make better legal decisions with our smart AI tools, trusted legal expertise,
              <br />
              and comprehensive legal community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/assistant">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-6 text-lg font-semibold rounded-xl shadow-2xl"
                >
                  Start Legal Chat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 px-10 py-6 text-lg rounded-xl"
              >
                Watch Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-400" />
                </div>
                <p className="text-gray-300 font-medium text-lg">100% Confidential</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <p className="text-gray-300 font-medium text-lg">Lightning Fast</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-400" />
                </div>
                <p className="text-gray-300 font-medium text-lg">24/7 Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* India-focused Mission Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900/50 to-black border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500/20 to-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Users className="h-10 w-10 text-orange-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              AI-Powered Legal Assistant for India
            </h2>
            <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
              Bridging the Legal Access Gap with Intelligent, Inclusive and Real-time Legal Support
            </p>
            <div className="flex items-center justify-center space-x-6 text-gray-400">
              <div className="flex items-center">
                <Heart className="h-5 w-5 text-red-400 mr-2" />
                <span>Empowering Citizens</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-2" />
                <span>Democratizing Justice</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How LexiAssist Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get legal insights in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-gray-900/50 border-gray-800 text-center hover:bg-gray-900/70 transition-colors">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">1. Ask Your Question</h3>
                <p className="text-gray-400">
                  Type your legal question, speak it aloud, or upload a document for analysis
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 text-center hover:bg-gray-900/70 transition-colors">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">2. AI Analysis</h3>
                <p className="text-gray-400">
                  Our advanced AI processes your query using comprehensive legal knowledge
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 text-center hover:bg-gray-900/70 transition-colors">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Scale className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">3. Get Instant Answer</h3>
                <p className="text-gray-400">
                  Receive clear, actionable legal insights with voice response included
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose LexiAssist?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of legal assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
              <CardContent className="p-6">
                <FileText className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Document Analysis</h3>
                <p className="text-gray-400">
                  Upload contracts, agreements, or legal documents for instant AI-powered analysis
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
              <CardContent className="p-6">
                <MessageSquare className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Voice Interaction</h3>
                <p className="text-gray-400">
                  Speak your questions naturally and receive spoken responses for hands-free operation
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Privacy First</h3>
                <p className="text-gray-400">
                  Your legal questions and documents remain completely confidential and secure
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900/50 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Legal Answers?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands who trust LexiAssist for their legal questions
            </p>
            <Link to="/assistant">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-6 text-lg font-semibold rounded-xl"
              >
                Start Your Legal Chat Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Copyright Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">LexiAssist</h3>
            <p className="text-gray-400 mb-4">
              AI Legal Assistant - Your Smart Legal Companion
            </p>
            <div className="border-t border-gray-800 pt-4">
              <p className="text-sm text-gray-500 mb-2">
                © {new Date().getFullYear()} LexiAssist. All rights reserved.
              </p>
              <p className="text-xs text-gray-600">
                <strong>Legal Disclaimer:</strong> This AI assistant provides general legal information only and does not constitute legal advice. 
                For specific legal matters, please consult with a qualified attorney.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
