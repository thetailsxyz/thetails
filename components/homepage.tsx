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
  StarIcon,
  TrendingUpIcon,
  ClockIcon,
  UsersIcon,
  FolderIcon,
  AlertTriangleIcon,
  BugIcon,
  WifiOffIcon,
  ShieldAlertIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const dashboardMetrics = [
  { 
    icon: FolderIcon, 
    title: "Active Projects", 
    color: "text-blue-400",
    bgColor: "bg-sidebar",
    data: "3",
    subtitle: "View and manage your projects"
  },
  { 
    icon: MessageSquareIcon, 
    title: "Total Conversations", 
    color: "text-green-400",
    bgColor: "bg-sidebar",
    data: "1,284",
    subtitle: "+15% from last month",
    trend: true
  },
  { 
    icon: DatabaseIcon, 
    title: "Knowledge Sources", 
    color: "text-purple-400",
    bgColor: "bg-sidebar",
    data: "12",
    subtitle: "Documents & websites in your library"
  },
  { 
    icon: ZapIcon, 
    title: "Message Credits Used", 
    color: "text-orange-400",
    bgColor: "bg-sidebar",
    data: "8,500 / 15,000",
    subtitle: "72% of monthly credits used",
    progress: 72
  },
  { 
    icon: ClockIcon, 
    title: "Avg. Response Time", 
    color: "text-cyan-400",
    bgColor: "bg-sidebar",
    data: "1.8s",
    subtitle: "AI performance"
  },
  { 
    icon: UsersIcon, 
    title: "Team Members", 
    color: "text-pink-400",
    bgColor: "bg-sidebar",
    data: "2 / 3",
    subtitle: "Invite and manage collaborators"
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

const topIssues = [
  {
    id: 1,
    icon: AlertTriangleIcon,
    title: "AI Response Delays",
    description: "Users experiencing slow response times during peak hours",
    reportCount: 47,
    severity: "high",
    color: "text-red-400",
    bgColor: "bg-red-500"
  },
  {
    id: 2,
    icon: BugIcon,
    title: "Login Authentication Errors",
    description: "Multiple reports of users unable to authenticate with Google SSO",
    reportCount: 23,
    severity: "medium",
    color: "text-blue-400",
    bgColor: "bg-blue-500"
  },
  {
    id: 3,
    icon: WifiOffIcon,
    title: "Knowledge Base Sync Issues",
    description: "Documents not updating properly in the knowledge base",
    reportCount: 18,
    severity: "medium",
    color: "text-orange-400",
    bgColor: "bg-orange-500"
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

          {/* Dashboard Metrics Grid - Mobile: 2 rows x 3 cols, Desktop: 1 row x 6 cols */}
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {dashboardMetrics.map((metric, index) => (
              <div key={index} className="flex flex-col">
                <Card
                  className={`bg-sidebar border-0 hover:bg-sidebar-accent transition-colors p-4 w-full cursor-default`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                      <metric.icon className={`h-4 w-4 ${metric.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-sidebar-foreground/70 font-medium truncate">{metric.title}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-sidebar-foreground">{metric.data}</span>
                      {metric.trend && (
                        <TrendingUpIcon className="h-3 w-3 text-green-500" />
                      )}
                    </div>
                    
                    {metric.progress && (
                      <div className="space-y-1">
                        <Progress value={metric.progress} className="h-1.5" />
                      </div>
                    )}
                    
                    <p className="text-xs text-sidebar-foreground/60 leading-tight">{metric.subtitle}</p>
                  </div>
                </Card>
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
              <h2 className="text-xl font-semibold text-white">Top Issues</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                View All Issues
              </Button>
            </div>
            <div className="space-y-4">
              {topIssues.map((issue, index) => (
                <Card
                  key={index}
                  className="bg-sidebar border-0 hover:bg-sidebar-accent transition-colors cursor-pointer p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className={`${issue.bgColor} p-3 rounded-lg flex-shrink-0`}>
                      <issue.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sidebar-foreground font-semibold">{issue.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              issue.severity === 'high' 
                                ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                                : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                            }`}
                          >
                            {issue.reportCount} reports
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sidebar-foreground/70 text-sm">{issue.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}