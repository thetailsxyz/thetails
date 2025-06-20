"use client"

import * as React from "react"
import { useState } from "react"
import { 
  XIcon,
  CheckIcon,
  StarIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  UploadIcon,
  GlobeIcon,
  BotIcon,
  UserIcon,
  BriefcaseIcon,
  SmileIcon,
  ZapIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface QuickCreateWizardProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

type Plan = 'hobby' | 'creator' | 'business'
type Tone = 'friendly' | 'professional' | 'witty' | 'concise' | 'formal'

const plans = [
  {
    id: 'hobby' as Plan,
    name: 'Hobby',
    price: '$5',
    period: '/month',
    tagline: 'The perfect personal assistant',
    description: 'Perfect for personal projects and portfolios',
    features: [
      '1 project',
      '2,000 message credits',
      'Basic support'
    ],
    popular: false
  },
  {
    id: 'creator' as Plan,
    name: 'Creator',
    price: '$19',
    period: '/month',
    tagline: 'Your intelligent monetization engine',
    description: 'All Hobby features plus tools for monetization',
    features: [
      'Everything in Hobby',
      '5 projects',
      '15,000 message credits',
      'Website scraping',
      'Monetization tools'
    ],
    popular: true
  },
  {
    id: 'business' as Plan,
    name: 'Business',
    price: '$79',
    period: '/month',
    tagline: 'Enterprise-grade support & collaboration',
    description: 'Perfect for teams and enterprise support',
    features: [
      'Everything in Creator',
      'Document uploads',
      'Invite 3 team members',
      '60,000 message credits',
      'Priority support'
    ],
    popular: false
  }
]

const tones = [
  { id: 'friendly' as Tone, label: 'Friendly', icon: SmileIcon },
  { id: 'professional' as Tone, label: 'Professional', icon: BriefcaseIcon },
  { id: 'witty' as Tone, label: 'Witty', icon: ZapIcon },
  { id: 'concise' as Tone, label: 'Concise', icon: ArrowRightIcon },
  { id: 'formal' as Tone, label: 'Formal', icon: UserIcon }
]

const avatars = [
  { id: '1', emoji: '🤖', name: 'Robot' },
  { id: '2', emoji: '👨‍💼', name: 'Professional' },
  { id: '3', emoji: '👩‍🎨', name: 'Creative' },
  { id: '4', emoji: '🧠', name: 'Smart' },
  { id: '5', emoji: '⚡', name: 'Fast' },
  { id: '6', emoji: '🎯', name: 'Focused' },
  { id: '7', emoji: '💡', name: 'Innovative' },
  { id: '8', emoji: '🚀', name: 'Dynamic' }
]

export function QuickCreateWizard({ isOpen, onClose, onComplete }: QuickCreateWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [projectName, setProjectName] = useState("")
  const [coreKnowledge, setCoreKnowledge] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [selectedTone, setSelectedTone] = useState<Tone | null>(null)
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)

  if (!isOpen) return null

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    onComplete()
    onClose()
  }

  const canProceedFromStep1 = selectedPlan !== null
  const canProceedFromStep2 = projectName.trim() !== "" && coreKnowledge.trim() !== ""
  const canComplete = selectedTone !== null && selectedAvatar !== null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto bg-sidebar border border-sidebar-border rounded-xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-sidebar-border bg-sidebar">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <BotIcon className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">Quick Create</h2>
              <p className="text-sm text-sidebar-foreground/70">Step {currentStep} of 3</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <XIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-sidebar-accent text-sidebar-foreground/50'
                  }`}
                >
                  {step < currentStep ? <CheckIcon className="h-4 w-4" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded ${
                      step < currentStep ? 'bg-blue-500' : 'bg-sidebar-accent'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {/* Step 1: Plan Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-sidebar-foreground mb-2">
                  Choose Your Plan
                </h3>
                <p className="text-sidebar-foreground/70">
                  Select a starting point for your new project
                </p>
              </div>

              <div className="grid gap-4">
                {plans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`relative cursor-pointer transition-all duration-200 ${
                      selectedPlan === plan.id
                        ? 'bg-blue-500/10 border-blue-500'
                        : 'bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/20'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-blue-500 text-white">
                          <StarIcon className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-sidebar-foreground">
                            {plan.name}
                          </h4>
                          <p className="text-sm text-sidebar-foreground/70 mb-2">
                            {plan.tagline}
                          </p>
                          <p className="text-sm text-sidebar-foreground/60">
                            {plan.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-sidebar-foreground">
                            {plan.price}
                          </div>
                          <div className="text-sm text-sidebar-foreground/70">
                            {plan.period}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-sidebar-foreground/70">
                            <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <Button
                        className={`w-full mt-4 ${
                          selectedPlan === plan.id
                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                            : 'bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90'
                        }`}
                      >
                        {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Bot Setup */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-sidebar-foreground mb-2">
                  Give Your Bot a Name and Its First Brain
                </h3>
                <p className="text-sidebar-foreground/70">
                  Set up the basic information for your chatbot
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name" className="text-sidebar-foreground font-medium">
                    Project Name
                  </Label>
                  <Input
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="My Awesome Chatbot"
                    className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="core-knowledge" className="text-sidebar-foreground font-medium">
                    Core Knowledge
                  </Label>
                  <Textarea
                    id="core-knowledge"
                    value={coreKnowledge}
                    onChange={(e) => setCoreKnowledge(e.target.value)}
                    placeholder="Paste your initial information, instructions, or knowledge base here..."
                    className="min-h-[120px] bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Creator and Business plan features */}
                {(selectedPlan === 'creator' || selectedPlan === 'business') && (
                  <div className="space-y-2">
                    <Label htmlFor="website-url" className="text-sidebar-foreground font-medium">
                      Connect a Website
                    </Label>
                    <div className="relative">
                      <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground/50" />
                      <Input
                        id="website-url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {/* Business plan document upload */}
                {selectedPlan === 'business' && (
                  <div className="space-y-2">
                    <Label className="text-sidebar-foreground font-medium">
                      Upload Documents
                    </Label>
                    <div className="border-2 border-dashed border-sidebar-border rounded-lg p-6 text-center hover:border-sidebar-foreground/20 transition-colors cursor-pointer">
                      <UploadIcon className="h-8 w-8 text-sidebar-foreground/50 mx-auto mb-2" />
                      <p className="text-sm text-sidebar-foreground/70 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-sidebar-foreground/50">
                        PDF, DOC, TXT files up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Personality Configuration */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-sidebar-foreground mb-2">
                  Define its Personality
                </h3>
                <p className="text-sidebar-foreground/70">
                  Choose the tone and visual identity for your bot
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sidebar-foreground font-medium">
                    Tone of Voice
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {tones.map((tone) => (
                      <Button
                        key={tone.id}
                        variant={selectedTone === tone.id ? "default" : "outline"}
                        className={`h-auto p-4 flex flex-col items-center gap-2 ${
                          selectedTone === tone.id
                            ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500'
                            : 'bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80 hover:border-sidebar-foreground/20'
                        }`}
                        onClick={() => setSelectedTone(tone.id)}
                      >
                        <tone.icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{tone.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sidebar-foreground font-medium">
                    Choose an Avatar
                  </Label>
                  <div className="grid grid-cols-4 gap-3">
                    {avatars.map((avatar) => (
                      <Button
                        key={avatar.id}
                        variant="outline"
                        className={`h-16 w-16 p-0 flex flex-col items-center justify-center ${
                          selectedAvatar === avatar.id
                            ? 'bg-blue-500/10 border-blue-500 text-blue-500'
                            : 'bg-sidebar-accent border-sidebar-border hover:bg-sidebar-accent/80 hover:border-sidebar-foreground/20'
                        }`}
                        onClick={() => setSelectedAvatar(avatar.id)}
                      >
                        <span className="text-2xl">{avatar.emoji}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center justify-between p-6 border-t border-sidebar-border bg-sidebar">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80 disabled:opacity-50"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !canProceedFromStep1) ||
                (currentStep === 2 && !canProceedFromStep2)
              }
              className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
            >
              Next
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!canComplete}
              className="bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
            >
              Create Bot & Go to Playground
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}