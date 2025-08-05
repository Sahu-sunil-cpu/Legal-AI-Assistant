"use client"

import { Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const { open } = useSidebar()

  return (
    <Sidebar className={`${!open ? "w-16" : "w-64"} bg-sidebar-dark border-r border-sidebar-border transition-all duration-300`}>
      <SidebarContent className="flex flex-col h-full">
        {/* Header with Logo - Always visible */}
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            {open && (
              <span className="font-semibold text-sidebar-foreground text-lg">
                assistant-ui
              </span>
            )}
          </div>
        </SidebarHeader>

        {/* Main Content */}
        <SidebarGroup className="flex-1 p-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button 
                    variant="outline" 
                    className={`w-full ${open ? 'justify-start' : 'justify-center px-2'} gap-3 bg-sidebar-accent border-sidebar-border hover:bg-sidebar-accent-hover text-sidebar-foreground transition-all duration-200`}
                    title={!open ? "New Thread" : ""}
                  >
                    <Plus className="w-4 h-4 shrink-0" />
                    {open && <span>New Thread</span>}
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}