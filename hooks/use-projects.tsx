import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/use-auth'

export interface Project {
  id: string
  name: string
  description: string
  plan: 'personal' | 'creator' | 'business'
  social_links: Record<string, string> | null
  user_id: string
  created_at: string
  updated_at: string
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchProjects = async () => {
    if (!user) {
      setProjects([])
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (projectData: {
    name: string
    description: string
    plan: 'personal' | 'creator' | 'business'
    social_links?: Record<string, string>
  }) => {
    if (!user) throw new Error('User not authenticated')

    try {
      console.log('Creating project with data:', projectData)
      console.log('User ID:', user.id)
      
      const { data, error } = await supabase
        .from('projects')
        .insert({
          ...projectData,
          user_id: user.id,
        })
        .select()
        .single()

      if (error) {
        console.error('Supabase error creating project:', error)
        throw error
      }
      
      console.log('Project created successfully:', data)
      // Update local state
      setProjects(prev => [data, ...prev])
      return { data, error: null }
    } catch (error) {
      console.error('Error creating project:', error)
      return { data: null, error }
    }
  }

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      // Update local state
      setProjects(prev => prev.map(p => p.id === id ? data : p))
      return { data, error: null }
    } catch (error) {
      console.error('Error updating project:', error)
      return { data: null, error }
    }
  }

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Update local state
      setProjects(prev => prev.filter(p => p.id !== id))
      return { error: null }
    } catch (error) {
      console.error('Error deleting project:', error)
      return { error }
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [user])

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  }
}