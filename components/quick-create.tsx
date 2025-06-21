"use client"

import * as React from "react"
import { useState } from "react"
import { 
  CheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BotIcon,
  SparklesIcon,
  XIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  GlobeIcon,
  BookOpenIcon,
  FlaskConicalIcon,
  DatabaseIcon,
  ArrowUpRightIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

interface Plan {
  id: 'hobby' | 'creator' | 'business'
  name: string
  price: number
  description: string
  credits: string
  features: string[]
  popular?: boolean
  badge?: string
}

const plans: Plan[] = [
  {
    id: 'hobby',
    name: 'Hobby',
    price: 5,
    description: 'Personal assistant for individual use',
    credits: '2k credits/month',
    features: [
      '1 project',
      '2,000 message credits',
      'Basic support',
      'Standard templates'
    ]
  },
  {
    id: 'creator',
    name: 'Creator',
    price: 19,
    description: 'Monetization engine for content creators',
    credits: '15k credits/month',
    features: [
      'All Hobby features',
      '5 projects',
      '15,000 message credits',
      'Website scraping',
      'Priority support'
    ],
    popular: true,
    badge: 'MOST POPULAR'
  },
  {
    id: 'business',
    name: 'Business',
    price: 79,
    description: 'Enterprise support and collaboration',
    credits: '60k credits/month',
    features: [
      'All Creator features',
      'Unlimited projects',
      '60,000 message credits',
      'Document uploads',
      'Invite 3 team members',
      'Advanced analytics'
    ]
  }
]

const socialPlatforms = [
  { id: 'twitter', name: 'Twitter', icon: TwitterIcon, placeholder: 'https://twitter.com/username' },
  { id: 'facebook', name: 'Facebook', icon: FacebookIcon, placeholder: 'https://facebook.com/page' },
  { id: 'instagram', name: 'Instagram', icon: InstagramIcon, placeholder: 'https://instagram.com/username' },
  { id: 'linkedin', name: 'LinkedIn', icon: LinkedinIcon, placeholder: 'https://linkedin.com/in/username' },
  { id: 'website', name: 'Website', icon: GlobeIcon, placeholder: 'https://yourwebsite.com' }
]

interface QuickCreateProps {
  onClose: () => void
  onComplete: () => void
}

export function QuickCreate({ onClose, onComplete }: QuickCreateProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState<'hobby' | 'creator' | 'business'>('creator')
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({})

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete the flow
      onComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedPlan !== null
      case 2:
        return projectName.trim() !== '' && description.trim() !== ''
      case 3:
        return true // Guide step, always can proceed
      default:
        return false
    }
  }

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }))
  }

  const handleCustomizeProject = () => {
    // Navigate to Data Library
    onComplete()
  }

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-sidebar-foreground mb-2">Choose Your Plan</h2>
        <p className="text-sidebar-foreground/70">Select the plan that best fits your needs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative p-6 cursor-pointer transition-all duration-200 ${
              selectedPlan === plan.id
                ? 'border-blue-500 bg-blue-500/5'
                : 'border-sidebar-border bg-sidebar-accent hover:border-sidebar-foreground/20'
            } ${plan.popular ? 'ring-2 ring-blue-500/20' : ''}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-3 py-1 text-xs font-medium">
                  {plan.badge}
                </Badge>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-sidebar-foreground mb-2">{plan.name}</h3>
              <p className="text-sidebar-foreground/70 text-sm mb-4">{plan.description}</p>
              <div className="mb-2">
                <span className="text-3xl font-bold text-sidebar-foreground">${plan.price}</span>
                <span className="text-sidebar-foreground/70 ml-1">per month</span>
              </div>
              <p className="text-sidebar-foreground/60 text-sm">{plan.credits}</p>
            </div>

            <div className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sidebar-foreground/80 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className={`w-full ${
                selectedPlan === plan.id
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : plan.popular
                  ? 'bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90'
                  : 'bg-sidebar-accent border border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80'
              }`}
              variant={selectedPlan === plan.id ? 'default' : 'outline'}
            >
              {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-sidebar-foreground mb-2">Project Setup</h2>
        <p className="text-sidebar-foreground/70">Configure your chatbot's basic information</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="project-name" className="text-sidebar-foreground font-medium">
            Project Name *
          </Label>
          <Input
            id="project-name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter your project name"
            className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sidebar-foreground font-medium">
            Description *
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what your chatbot should do and how it should behave..."
            className="min-h-[120px] bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-sidebar-foreground font-medium">
            Social Links (Optional)
          </Label>
          <p className="text-xs text-sidebar-foreground/60 -mt-2">
            Add your social media profiles to help train your chatbot with your brand voice
          </p>
          
          <div className="grid grid-cols-1 gap-4">
            {socialPlatforms.map((platform) => (
              <div key={platform.id} className="flex items-center gap-3">
                <div className="flex items-center gap-2 min-w-[100px]">
                  <platform.icon className="h-4 w-4 text-sidebar-foreground/70" />
                  <span className="text-sm text-sidebar-foreground/80">{platform.name}</span>
                </div>
                <Input
                  value={socialLinks[platform.id] || ''}
                  onChange={(e) => handleSocialLinkChange(platform.id, e.target.value)}
                  placeholder={platform.placeholder}
                  className="flex-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-sidebar-foreground mb-2">Project Created Successfully!</h2>
        <p className="text-sidebar-foreground/70">Your chatbot project "{projectName}" is ready. Here's how to continue:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Library Guide */}
        <Card className="bg-sidebar-accent border-sidebar-border p-6 hover:border-sidebar-foreground/20 transition-colors">
          <div className="flex items-start gap-4">
            <div className="bg-purple-500 p-3 rounded-lg flex-shrink-0">
              <DatabaseIcon className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sidebar-foreground font-semibold mb-2">
                Add Knowledge to Your AI
              </h3>
              <p className="text-sidebar-foreground/70 text-sm mb-4 leading-relaxed">
                Visit the <strong>Data Library</strong> to upload documents, add website content, or create custom knowledge bases. This is where you train your AI with specific information.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Upload PDFs, docs, and text files</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Import website content</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Create custom knowledge entries</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Playground Guide */}
        <Card className="bg-sidebar-accent border-sidebar-border p-6 hover:border-sidebar-foreground/20 transition-colors">
          <div className="flex items-start gap-4">
            <div className="bg-blue-500 p-3 rounded-lg flex-shrink-0">
              <FlaskConicalIcon className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sidebar-foreground font-semibold mb-2">
                Test Your Chatbot
              </h3>
              <p className="text-sidebar-foreground/70 text-sm mb-4 leading-relaxed">
                Use the <strong>Playground</strong> to test your AI chatbot in real-time. Adjust settings, refine responses, and perfect the conversation flow.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Real-time conversation testing</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Adjust AI parameters</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Fine-tune responses</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Project Summary */}
      <Card className="bg-sidebar-accent border-sidebar-border p-6">
        <h4 className="text-sidebar-foreground font-medium mb-4">Project Summary</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-sidebar-foreground/70">Project Name:</span>
            <span className="text-sidebar-foreground font-medium">{projectName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sidebar-foreground/70">Plan:</span>
            <span className="text-sidebar-foreground font-medium">{plans.find(p => p.id === selectedPlan)?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sidebar-foreground/70">Monthly Credits:</span>
            <span className="text-sidebar-foreground font-medium">{plans.find(p => p.id === selectedPlan)?.credits}</span>
          </div>
          {Object.keys(socialLinks).filter(key => socialLinks[key]).length > 0 && (
            <div className="pt-2 border-t border-sidebar-border">
              <span className="text-sidebar-foreground/70 text-xs">Connected Social Links:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {Object.entries(socialLinks).filter(([_, url]) => url).map(([platform, _]) => (
                  <Badge key={platform} variant="outline" className="text-xs bg-sidebar-foreground/10 text-sidebar-foreground/70 border-sidebar-foreground/20">
                    {socialPlatforms.find(p => p.id === platform)?.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border bg-background px-4 sm:px-6 lg:px-8 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="text-white/70 hover:text-white hover:bg-sidebar-accent"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center gap-3">
            <span className="text-sm text-white/60">
              Step {currentStep} of 3
            </span>
            <Button
              onClick={currentStep === 3 ? handleCustomizeProject : handleNext}
              disabled={!canProceed()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {currentStep === 3 ? `Customize ${projectName}` : 'Continue'}
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}