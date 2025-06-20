"use client"

import * as React from "react"
import { 
  SendIcon, 
  RotateCcwIcon,
  DownloadIcon,
  SettingsIcon,
  GridIcon,
  ListIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

export function Playground() {
  const [userInput, setUserInput] = React.useState("We is going to the market.")
  const [instructions, setInstructions] = React.useState("Fix the grammar.")
  const [model, setModel] = React.useState("text-davinci-003")
  const [temperature, setTemperature] = React.useState([0.56])
  const [maxLength, setMaxLength] = React.useState([256])
  const [topP, setTopP] = React.useState([0.9])
  const [mode, setMode] = React.useState("complete")

  const handleSubmit = () => {
    console.log("Submitting:", { userInput, instructions, model, temperature, maxLength, topP })
  }

  const handleReset = () => {
    setUserInput("")
    setInstructions("")
  }

  return (
    <div className="flex h-full w-full max-w-full overflow-hidden bg-background">
      {/* Left Panel - Input Area */}
      <div className="flex-1 flex flex-col min-h-0 border-r border-sidebar-border">
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Main Input Area */}
          <div className="space-y-4">
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your text here..."
              className="min-h-[300px] resize-none bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Instructions Section */}
          <div className="space-y-3">
            <Label htmlFor="instructions" className="text-sidebar-foreground font-medium">
              Instructions
            </Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter instructions for the AI..."
              className="min-h-[120px] resize-none bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="border-t border-sidebar-border p-4 bg-sidebar-accent/50">
          <div className="flex items-center gap-3">
            <Button
              onClick={handleSubmit}
              className="bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90 font-medium"
            >
              Submit
            </Button>
            <Button
              onClick={handleReset}
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <RotateCcwIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Configuration */}
      <div className="w-80 flex flex-col bg-sidebar-accent/30 min-h-0">
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Mode Selection */}
          <div className="space-y-3">
            <Label className="text-sidebar-foreground font-medium">Mode</Label>
            <div className="flex items-center gap-2 p-1 bg-sidebar-accent rounded-lg">
              <Button
                variant={mode === "complete" ? "default" : "ghost"}
                size="sm"
                onClick={() => setMode("complete")}
                className={`flex-1 ${
                  mode === "complete"
                    ? "bg-sidebar-foreground text-sidebar"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                }`}
              >
                <GridIcon className="h-4 w-4 mr-2" />
                Complete
              </Button>
              <Button
                variant={mode === "insert" ? "default" : "ghost"}
                size="sm"
                onClick={() => setMode("insert")}
                className={`flex-1 ${
                  mode === "insert"
                    ? "bg-sidebar-foreground text-sidebar"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                }`}
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Insert
              </Button>
              <Button
                variant={mode === "edit" ? "default" : "ghost"}
                size="sm"
                onClick={() => setMode("edit")}
                className={`flex-1 ${
                  mode === "edit"
                    ? "bg-sidebar-foreground text-sidebar"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                }`}
              >
                <ListIcon className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>

          {/* Model Selection */}
          <div className="space-y-3">
            <Label htmlFor="model" className="text-sidebar-foreground font-medium">
              Model
            </Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text-davinci-003">text-davinci-003</SelectItem>
                <SelectItem value="text-curie-001">text-curie-001</SelectItem>
                <SelectItem value="text-babbage-001">text-babbage-001</SelectItem>
                <SelectItem value="text-ada-001">text-ada-001</SelectItem>
                <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                <SelectItem value="gpt-4">gpt-4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Temperature */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sidebar-foreground font-medium">Temperature</Label>
              <span className="text-sm text-sidebar-foreground/70">{temperature[0]}</span>
            </div>
            <Slider
              value={temperature}
              onValueChange={setTemperature}
              max={2}
              min={0}
              step={0.01}
              className="w-full"
            />
          </div>

          {/* Maximum Length */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sidebar-foreground font-medium">Maximum Length</Label>
              <span className="text-sm text-sidebar-foreground/70">{maxLength[0]}</span>
            </div>
            <Slider
              value={maxLength}
              onValueChange={setMaxLength}
              max={4000}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Top P */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sidebar-foreground font-medium">Top P</Label>
              <span className="text-sm text-sidebar-foreground/70">{topP[0]}</span>
            </div>
            <Slider
              value={topP}
              onValueChange={setTopP}
              max={1}
              min={0}
              step={0.01}
              className="w-full"
            />
          </div>

          {/* Additional Controls */}
          <div className="pt-4 border-t border-sidebar-border">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <SettingsIcon className="h-4 w-4 mr-2" />
                Advanced
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}