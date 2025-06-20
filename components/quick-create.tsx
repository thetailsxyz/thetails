"use client"

import * as React from "react"
import { useState } from "react"
import { 
  CheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BotIcon,
  GlobeIcon,
  FileTextIcon,
  UsersIcon,
  CreditCardIcon,
  SparklesIcon,
  BuildingIcon,
  UserIcon,
  XIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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

const toneOptions = [
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { value: 'professional', label: 'Professional', description: 'Business-focused and formal' },
  { value: 'witty', label: 'Witty', description: 'Clever and humorous' },
  { value: 'concise', label: 'Concise', description: 'Brief and to the point' },
  { value: 'formal', label: 'Formal', description: 'Traditional and respectful' }
]

const avatarOptions = [
  { id: 'robot', emoji: '🤖', name: 'Robot' },
  { id: 'assistant', emoji: '👨‍💼', name: 'Assistant' },
  { id: 'support', emoji: '🎧', name: 'Support' },
  { id: 'teacher', emoji: '👩‍🏫', name: 'Teacher' },
  { id: 'scientist', emoji: '👨‍🔬', name: 'Scientist' },
  { id: 'artist', emoji: '👩‍🎨', name: 'Artist' }
]

interface QuickCreateProps {
  onClose: () => void
  onComplete: () => void
}

export function QuickCreate({ onClose, onComplete }: QuickCreateProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState<'hobby' | 'creator' | 'business'>('creator')
  const [projectName, setProjectName] = useState('')
  const [coreKnowledge, setCoreKnowledge] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [selectedTone, setSelectedTone] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('')

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
        return projectName.trim() !== '' && coreKnowledge.trim() !== ''
      case 3:
        return selectedTone !== '' && selectedAvatar !== ''
      default:
        return false
    }
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
        <h2 className="text-2xl font-bold text-sidebar-foreground mb-2">Initial Setup</h2>
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
          <Label htmlFor="core-knowledge" className="text-sidebar-foreground font-medium">
            Core Knowledge *
          </Label>
          <Textarea
            id="core-knowledge"
            value={coreKnowledge}
            onChange={(e) => setCoreKnowledge(e.target.value)}
            placeholder="Describe what your chatbot should know about. This will be its foundational knowledge..."
            className="min-h-[120px] bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
          />
        </div>

        {(selectedPlan === 'creator' || selectedPlan === 'business') && (
          <div className="space-y-2">
            <Label htmlFor="website-url" className="text-sidebar-foreground font-medium flex items-center gap-2">
              <GlobeIcon className="h-4 w-4" />
              Website URL (Optional)
            </Label>
            <Input
              id="website-url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
            />
            <p className="text-xs text-sidebar-foreground/60">
              We'll scrape this website to enhance your chatbot's knowledge
            </p>
          </div>
        )}

        {selectedPlan === 'business' && (
          <div className="space-y-2">
            <Label className="text-sidebar-foreground font-medium flex items-center gap-2">
              <FileTextIcon className="h-4 w-4" />
              Document Upload (Optional)
            </Label>
            <div className="border-2 border-dashed border-sidebar-border rounded-lg p-6 text-center bg-sidebar-accent/50">
              <FileTextIcon className="h-8 w-8 text-sidebar-foreground/40 mx-auto mb-2" />
              <p className="text-sidebar-foreground/70 text-sm mb-2">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-sidebar-foreground/60">
                Supports PDF, DOC, TXT files up to 10MB
              </p>
              <Button variant="outline" className="mt-3 bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                Choose Files
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-sidebar-foreground mb-2">Personality Configuration</h2>
        <p className="text-sidebar-foreground/70">Define your chatbot's personality and appearance</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <Label className="text-sidebar-foreground font-medium">Tone of Voice *</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {toneOptions.map((tone) => (
              <Card
                key={tone.value}
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  selectedTone === tone.value
                    ? 'border-blue-500 bg-blue-500/5'
                    : 'border-sidebar-border bg-sidebar-accent hover:border-sidebar-foreground/20'
                }`}
                onClick={() => setSelectedTone(tone.value)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedTone === tone.value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-sidebar-border'
                  }`}>
                    {selectedTone === tone.value && (
                      <CheckIcon className="h-2 w-2 text-white m-0.5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-sidebar-foreground">{tone.label}</h4>
                    <p className="text-xs text-sidebar-foreground/60">{tone.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-sidebar-foreground font-medium">Choose Avatar *</Label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {avatarOptions.map((avatar) => (
              <Card
                key={avatar.id}
                className={`p-4 cursor-pointer transition-all duration-200 text-center ${
                  selectedAvatar === avatar.id
                    ? 'border-blue-500 bg-blue-500/5'
                    : 'border-sidebar-border bg-sidebar-accent hover:border-sidebar-foreground/20'
                }`}
                onClick={() => setSelectedAvatar(avatar.id)}
              >
                <div className="text-2xl mb-2">{avatar.emoji}</div>
                <p className="text-xs text-sidebar-foreground/80">{avatar.name}</p>
                {selectedAvatar === avatar.id && (
                  <CheckIcon className="h-4 w-4 text-blue-500 mx-auto mt-2" />
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto min-h-0">
      {/* Header */}
        <div className="border-b border-sidebar-border bg-background px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <SparklesIcon className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-semibold text-white">Quick Create</h1>
              </div>
              
              {/* Progress Steps */}
              <div className="hidden sm:flex items-center gap-4 ml-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step === currentStep
                        ? 'bg-blue-500 text-white'
                        : step < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-sidebar-accent text-white/60 border border-sidebar-border'
                    }`}>
                      {step < currentStep ? <CheckIcon className="h-4 w-4" /> : step}
                    </div>
                    <span className={`text-sm ${
                      step <= currentStep ? 'text-white' : 'text-white/60'
                    }`}>
                      {step === 1 ? 'Plan' : step === 2 ? 'Setup' : 'Personality'}
                    </span>
                    {step < 3 && (
                      <ArrowRightIcon className="h-4 w-4 text-white/40 ml-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-sidebar-accent"
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

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
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {currentStep === 3 ? 'Create Chatbot' : 'Continue'}
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
    </div>
  )
}