import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ChatInterface } from "@/components/ChatInterface"
import { AppProvider } from "@/components/context/AppContext";

const Assistant = () => {
  return (
    <AppProvider>
    <div className="bg-[#303030]">
      <SidebarProvider defaultOpen={true} >
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col bg-chat-background">
            {/* Top Navigation with visible toggle */}
            <div className="flex items-center py-6 px-4 border-b border-border/20">
              <SidebarTrigger className="p-2 hover:bg-white rounded-lg border-2 border-black/30 bg-black/10 fixed  dark:border-white/30 dark:bg-white/10 transition-all duration-200  hover:bg-black/20" />
            </div>
            
            {/* Main Chat Area */}
            <ChatInterface />
          </div>
        </div>
      </SidebarProvider>
    </div>
    </AppProvider>
  );
};

export default Assistant;