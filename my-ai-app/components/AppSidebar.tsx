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
import { useApp } from "./context/AppContext"

export function AppSidebar() {
  const { open } = useSidebar()
  const { state, dispatch } = useApp()

  return (
    <Sidebar className={`${!open ? "w-16" : "w-64"} bg-sidebar-dark border-r border-sidebar-border transition-all duration-300`}>
      <SidebarContent className="flex flex-col h-full">
        {/* Header with Logo - Always visible */}
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-300 rounded-lg flex items-center justify-center shrink-0">
              <span className="font-bold text-sm">AI</span>
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
                  <div>


                    <Button
                      variant="outline"
                      onClick={ () => {
                        dispatch({type: "SET_NEW_THREAD", payload: true})
                      }}
                      className={`w-full ${open ? 'justify-start' : 'justify-center px-2'} gap-3 bg-sidebar-accent border-sidebar-border hover:bg-sidebar-accent-hover text-sidebar-foreground transition-all duration-200`}
                      title={!open ? "New Thread" : ""}
                    >
                      <Plus className="w-4 border rounded-md  h-5 shrink-0 bg-slate-400 " />
                      {open && <span>New Thread</span>}
                    </Button>

                    <div>


                      {
                        state.chat.map(c => <div>
                          <p>{c.title}</p>
                        </div>)
                      }

                    </div>
                  </div>

                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}