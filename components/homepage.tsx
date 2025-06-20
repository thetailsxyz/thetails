"use client"

import * as React from "react"
import { 
  PlusIcon,
  BotIcon,
  MessageSquareIcon,
  DatabaseIcon,
  BarChartIcon,
  SettingsIcon,
  ZapIcon,
  SparklesIcon,
  BrainIcon,
  StarIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const productFeatures = [
  { 
    icon: BotIcon, 
    title: "AI Chatbots", 
    color: "text-blue-400",
    bgColor: "bg-sidebar",
    description: "Create intelligent conversational AI agents"
  },
  { 
    icon: MessageSquareIcon, 
    title: "Live Chat", 
    color: "text-green-400",
    bgColor: "bg-sidebar",
    description: "Real-time customer communication platform"
  },
  { 
    icon: DatabaseIcon, 
    title: "Knowledge Base", 
    color: "text-purple-400",
    bgColor: "bg-sidebar",
    description: "Centralized information management system"
  },
  { 
    icon: BarChartIcon, 
    title: "Analytics", 
    color: "text-orange-400",
    bgColor: "bg-sidebar",
    description: "Performance insights and conversation metrics"
  },
  { 
    icon: ZapIcon, 
    title: "Integrations", 
    color: "text-yellow-400",
    bgColor: "bg-sidebar",
    description: "Connect with your favorite tools and platforms"
  },
  { 
    icon: SettingsIcon, 
    title: "Automation", 
    color: "text-cyan-400",
    bgColor: "bg-sidebar",
    description: "Workflow automation and smart routing"
  }
]

const recentConversations = [
  {
    id: 1,
    botName: "Customer Support Pro",
    lastMessage: "How can I help you with your order today?",
    timestamp: "2 minutes ago",
    messageCount: 24,
    avatar: "🎧",
    bgColor: "bg-blue-500",
    status: "active"
  },
  {
    id: 2,
    botName: "Sales Navigator",
    lastMessage: "I'd be happy to show you our premium features...",
    timestamp: "15 minutes ago",
    messageCount: 12,
    avatar: "💼",
    bgColor: "bg-green-500",
    status: "active"
  },
  {
    id: 3,
    botName: "Knowledge Helper",
    lastMessage: "Based on your documentation, here's what I found...",
    timestamp: "1 hour ago",
    messageCount: 8,
    avatar: "📚",
    bgColor: "bg-purple-500",
    status: "idle"
  },
  {
    id: 4,
    botName: "Training Assistant",
    lastMessage: "Let's continue with the next module of your course...",
    timestamp: "3 hours ago",
    messageCount: 45,
    avatar: "🎓",
    bgColor: "bg-orange-500",
    status: "idle"
  },
  {
    id: 5,
    botName: "Creative Writer",
    lastMessage: "I've generated three different versions of your content...",
    timestamp: "1 day ago",
    messageCount: 6,
    avatar: "✍️",
    bgColor: "bg-pink-500",
    status: "idle"
  }
]

const quickActions = [
  {
    icon: SparklesIcon,
    title: "Create New Bot",
    description: "Build a custom AI chatbot with personality and context",
    color: "text-pink-400",
    bgColor: "bg-pink-500"
  },
  {
    icon: BrainIcon,
    title: "Import Knowledge",
    description: "Upload documents and data to train your chatbot",
    color: "text-blue-400",
    bgColor: "bg-blue-500"
  },
  {
    icon: ZapIcon,
    title: "Bot Templates",
    description: "Start with pre-built chatbot templates for common use cases",
    color: "text-green-400",
    bgColor: "bg-green-500"
  }
]

const getStatusBadge = (status: string) => {
  if (status === 'active') {
    return (
      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
        Active
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20 text-xs">
      <div className="w-2 h-2 bg-gray-500 rounded-full mr-1"></div>
      Idle
    </Badge>
  )
}

export function Homepage() {
  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden">
      {/* Main content area - scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0 px-4 sm:px-6 lg:px-16 xl:px-24 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">My Workspace</p>
              <h1 className="text-2xl sm:text-3xl font-medium text-white">
                Good afternoon, Tails
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <SettingsIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Features Grid - Mobile: 2 rows x 3 cols, Desktop: 1 row x 6 cols */}
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {productFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <Card
                  className={`bg-sidebar border-0 hover:bg-sidebar-accent transition-colors p-6 aspect-square flex items-center justify-center w-full cursor-default`}
                >
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </Card>
                <p className="text-sm text-white font-medium mt-3 text-center">{feature.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Conversations */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Conversations</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentConversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className="bg-sidebar border-0 hover:bg-sidebar-accent transition-colors cursor-pointer p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className={`${conversation.bgColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0`}>
                      {conversation.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sidebar-foreground font-medium truncate">
                          {conversation.botName}
                        </h3>
                        {getStatusBadge(conversation.status)}
                      </div>
                      <p className="text-sidebar-foreground/70 text-sm line-clamp-1 mb-2">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex items-center justify-between text-xs text-sidebar-foreground/60">
                        <span className="flex items-center gap-1">
                          <MessageSquareIcon className="h-3 w-3" />
                          {conversation.messageCount} messages
                        </span>
                        <span>{conversation.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
            </div>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="bg-sidebar border-0 hover:bg-sidebar-accent transition-colors cursor-pointer p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className={`${action.bgColor} p-3 rounded-lg flex-shrink-0`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sidebar-foreground font-semibold mb-2">{action.title}</h3>
                      <p className="text-sidebar-foreground/70 text-sm">{action.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
              
              {/* Featured Templates */}
              <Card className="bg-sidebar border-0 p-6 border border-blue-500/20">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg flex-shrink-0">
                    <StarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-sidebar-foreground font-semibold">Featured Templates</h3>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-xs">
                        New
                      </Badge>
                    </div>
                    <p className="text-sidebar-foreground/70 text-sm mb-3">
                      Explore our newest collection of industry-specific chatbot templates
                    </p>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Browse Templates
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}