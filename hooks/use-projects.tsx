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
  const { user, session } = useAuth()

  const fetchProjects = async () => {
    if (!user) {
      setProjects([])
      setLoading(false)
      return
    }

    try {
      console.log('Fetching projects for user:', user.id)
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching projects:', error)
        throw error
      }
      
      console.log('Fetched projects:', data)
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
    console.log('Creating project - User:', user?.id, 'Session:', !!session)
    
    // Wait for auth to be ready if still loading
    if (!user) {
      const error = new Error('Please sign in to create a project.')
      console.error('Authentication required:', error.message)
      return { data: null, error }
    }

    try {
      // Clean up social_links - remove empty values
      const cleanSocialLinks = projectData.social_links ? 
        Object.fromEntries(
          Object.entries(projectData.social_links).filter(([_, value]) => value && value.trim() !== '')
        ) : null

      const insertData = {
        name: projectData.name.trim(),
        description: projectData.description.trim(),
        plan: projectData.plan,
        social_links: Object.keys(cleanSocialLinks || {}).length > 0 ? cleanSocialLinks : null,
        user_id: user.id,
      }

      console.log('Inserting project data:', insertData)

      // Use a more robust insert with better error handling
      const { data, error } = await supabase
        .from('projects')
        .insert([insertData])
        .select()
        .single()

      if (error) {
        console.error('Supabase insert error:', error)
        
        // Provide more specific error messages based on error codes
        if (error.code === 'PGRST301' || error.message.includes('permission')) {
          return { data: null, error: new Error('Permission denied. Please sign in and try again.') }
        } else if (error.code === '23505') {
          return { data: null, error: new Error('A project with this name already exists.') }
        } else if (error.code === '23503') {
          return { data: null, error: new Error('Invalid user reference. Please sign in again.') }
        } else if (error.message.includes('JWT')) {
          return { data: null, error: new Error('Session expired. Please sign in again.') }
        } else {
          return { data: null, error: new Error(`Failed to create project: ${error.message}`) }
        }
      }
      
      if (!data) {
        return { data: null, error: new Error('Project creation failed - no data returned') }
      }
      
      console.log('Project created successfully:', data)
      
      // Update local state
      setProjects(prev => [data, ...prev])
      return { data, error: null }
    } catch (error: any) {
      console.error('Unexpected error creating project:', error)
      
      // Handle network errors
      if (error.message.includes('fetch')) {
        return { 
          data: null, 
          error: new Error('Network error. Please check your internet connection and try again.') 
        }
      }
      
      return { 
        data: null, 
        error: new Error(`Failed to create project: ${error.message || 'Unknown error'}`) 
      }
    }
  }

  const updateProject = async (id: string, updates: Partial<Project>) => {
    if (!user) {
      return { data: null, error: new Error('Please sign in to update projects.') }
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id) // Ensure user owns the project
        .select()
        .single()

      if (error) {
        console.error('Error updating project:', error)
        return { data: null, error }
      }

      // Update local state
      setProjects(prev => prev.map(p => p.id === id ? data : p))
      return { data, error: null }
    } catch (error) {
      console.error('Error updating project:', error)
      return { data: null, error }
    }
  }

  const deleteProject = async (id: string) => {
    if (!user) {
      return { error: new Error('Please sign in to delete projects.') }
    }

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id) // Ensure user owns the project

      if (error) {
        console.error('Error deleting project:', error)
        return { error }
      }

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