"use client"

import { useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { AiChat } from '@/components/ai-chat'
import { Playground } from '@/components/playground'
import { Homepage } from '@/components/homepage'
import { Projects } from '@/components/projects'
import { KnowledgeBase } from '@/components/knowledge-base'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function Page() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat' | 'playground' | 'projects' | 'data-library'>('dashboard')

  const handleNavigateToChat = () => {
    setCurrentView('chat')
  }

  const handleNavigateToDashboard = () => {
    setCurrentView('dashboard')
  }

  const handleNavigateToProjects = () => {
    setCurrentView('projects')
  }

  const handleNavigateToDataLibrary = () => {
    setCurrentView('data-library')
  }

  const handleNavigateToPlayground = () => {
    setCurrentView('playground')
  }

  return (
    <SidebarProvider>
      <AppSidebar 
        variant="inset" 
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onNavigateToChat={handleNavigateToChat}
      />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <div className="sticky top-0 z-50 bg-background rounded-t-xl overflow-hidden flex-shrink-0">
          <SiteHeader currentView={currentView} />
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          {currentView === 'dashboard' ? (
            <Homepage onNavigateToChat={handleNavigateToChat} />
          ) : currentView === 'chat' ? (
            <AiChat />
          ) : currentView === 'playground' ? (
            <Playground />
          ) : currentView === 'projects' ? (
            <Projects />
          ) : currentView === 'data-library' ? (
            <KnowledgeBase />
          ) : (
            <Homepage onNavigateToChat={handleNavigateToChat} />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}