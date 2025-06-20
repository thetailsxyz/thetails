"use client"

import { PlusCircleIcon, type LucideIcon } from "lucide-react"
import { useState } from "react"

import { Button } from '@/components/ui/button'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { QuickCreateWizard } from '@/components/quick-create-wizard'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    onClick?: () => void
  }[]
}) {
  const { isMobile } = useSidebar()
  const [showQuickCreate, setShowQuickCreate] = useState(false)

  const handleQuickCreateComplete = () => {
    // Navigate to playground or handle completion
    console.log('Quick create completed!')
  }

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Quick Create"
                onClick={() => setShowQuickCreate(true)}
                className="min-w-8 bg-sidebar-foreground text-sidebar duration-200 ease-linear hover:bg-sidebar-foreground/90 hover:text-sidebar active:bg-sidebar-foreground/90 active:text-sidebar"
              >
                <PlusCircleIcon />
                <span>Quick Create</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  tooltip={item.title}
                  isActive={item.isActive}
                  onClick={item.onClick}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <QuickCreateWizard
        isOpen={showQuickCreate}
        onClose={() => setShowQuickCreate(false)}
        onComplete={handleQuickCreateComplete}
      />
    </>
  )
}