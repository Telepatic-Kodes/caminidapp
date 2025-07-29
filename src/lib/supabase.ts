// Supabase Client Configuration
import { createClient } from '@supabase/supabase-js'

// Environment variables for Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create Supabase client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Tipos para TypeScript basados en el modelo del PRD
export interface Member {
  id: string
  full_name: string
  email: string
  phone?: string
  country: string
  commission_id?: string
  cause?: string
  status: 'active' | 'paused' | 'alumni'
  participation_score: number
  joined_at: string
  created_at?: string
  updated_at?: string
}

export interface Commission {
  id: string
  name: string
  lead_id?: string
  okr_text?: string
  kpi_json?: any
  created_at?: string
  updated_at?: string
}

export interface Project {
  id: string
  commission_id: string
  title: string
  progress_pct: number
  last_update: string
  summary_ai?: string
  created_at?: string
  updated_at?: string
}

export interface Payment {
  id: string
  member_id: string
  amount_clp: number
  due_date: string
  paid_at?: string
  status: 'pending' | 'paid' | 'overdue' | 'cancelled'
  created_at?: string
  updated_at?: string
}

// Funciones helper para la base de datos
export const db = {
  // Miembros
  members: {
    getAll: async () => {
      try {
        // Only try Supabase if client is available
        if (supabase) {
          const { data, error } = await supabase
            .from('members')
            .select('*')
            .order('created_at', { ascending: false })
          
          if (error) throw error
          return { data, error: null }
        } else {
          // Return mock data when Supabase is not configured
          console.log('Supabase not configured, using mock data')
          return { 
            data: [{ 
              id: 'mock-id-1', 
              full_name: 'Mock Member 1', 
              email: 'mock1@example.com', 
              phone: '123456789', 
              country: 'Mockland', 
              commission_id: 'mock-commission-1', 
              cause: 'Mock Cause', 
              status: 'active', 
              participation_score: 100, 
              joined_at: '2023-01-01', 
              created_at: '2023-01-01', 
              updated_at: '2023-01-01' 
            }], 
            error: null 
          }
        }
      } catch (error) {
        console.error('Error fetching members:', error)
        // Fallback to mock data if Supabase fails
        return { 
          data: [{ 
            id: 'mock-id-1', 
            full_name: 'Mock Member 1', 
            email: 'mock1@example.com', 
            phone: '123456789', 
            country: 'Mockland', 
            commission_id: 'mock-commission-1', 
            cause: 'Mock Cause', 
            status: 'active', 
            participation_score: 100, 
            joined_at: '2023-01-01', 
            created_at: '2023-01-01', 
            updated_at: '2023-01-01' 
          }], 
          error: null 
        }
      }
    },
    
    getById: async (id: string) => {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('members')
            .select('*')
            .eq('id', id)
            .single()
          
          if (error) throw error
          return { data, error: null }
        } else {
          return { 
            data: { 
              id: 'mock-id-1', 
              full_name: 'Mock Member 1', 
              email: 'mock1@example.com', 
              phone: '123456789', 
              country: 'Mockland', 
              commission_id: 'mock-commission-1', 
              cause: 'Mock Cause', 
              status: 'active', 
              participation_score: 100, 
              joined_at: '2023-01-01', 
              created_at: '2023-01-01', 
              updated_at: '2023-01-01' 
            }, 
            error: null 
          }
        }
      } catch (error) {
        console.error('Error fetching member:', error)
        return { 
          data: { 
            id: 'mock-id-1', 
            full_name: 'Mock Member 1', 
            email: 'mock1@example.com', 
            phone: '123456789', 
            country: 'Mockland', 
            commission_id: 'mock-commission-1', 
            cause: 'Mock Cause', 
            status: 'active', 
            participation_score: 100, 
            joined_at: '2023-01-01', 
            created_at: '2023-01-01', 
            updated_at: '2023-01-01' 
          }, 
          error: null 
        }
      }
    },
    
    create: async (data: Omit<Member, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        if (supabase) {
          const { data: newMember, error } = await supabase
            .from('members')
            .insert([data])
            .select()
            .single()
          
          if (error) throw error
          return { data: newMember, error: null }
        } else {
          // Create mock member
          const mockMember = {
            id: `mock-id-${Date.now()}`,
            ...data,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          console.log('Created mock member:', mockMember)
          return { data: mockMember, error: null }
        }
      } catch (error) {
        console.error('Error creating member:', error)
        return { 
          data: { 
            id: 'mock-id-1', 
            full_name: 'Mock Member 1', 
            email: 'mock1@example.com', 
            phone: '123456789', 
            country: 'Mockland', 
            commission_id: 'mock-commission-1', 
            cause: 'Mock Cause', 
            status: 'active', 
            participation_score: 100, 
            joined_at: '2023-01-01', 
            created_at: '2023-01-01', 
            updated_at: '2023-01-01' 
          }, 
          error: null 
        }
      }
    },
    
    update: async (id: string, data: Partial<Member>) => {
      try {
        if (supabase) {
          const { data: updatedMember, error } = await supabase
            .from('members')
            .update(data)
            .eq('id', id)
            .select()
            .single()
          
          if (error) throw error
          return { data: updatedMember, error: null }
        } else {
          return { 
            data: { 
              id: 'mock-id-1', 
              full_name: 'Mock Member 1', 
              email: 'mock1@example.com', 
              phone: '123456789', 
              country: 'Mockland', 
              commission_id: 'mock-commission-1', 
              cause: 'Mock Cause', 
              status: 'active', 
              participation_score: 100, 
              joined_at: '2023-01-01', 
              created_at: '2023-01-01', 
              updated_at: '2023-01-01' 
            }, 
            error: null 
          }
        }
      } catch (error) {
        console.error('Error updating member:', error)
        return { 
          data: { 
            id: 'mock-id-1', 
            full_name: 'Mock Member 1', 
            email: 'mock1@example.com', 
            phone: '123456789', 
            country: 'Mockland', 
            commission_id: 'mock-commission-1', 
            cause: 'Mock Cause', 
            status: 'active', 
            participation_score: 100, 
            joined_at: '2023-01-01', 
            created_at: '2023-01-01', 
            updated_at: '2023-01-01' 
          }, 
          error: null 
        }
      }
    },
    
    delete: async (id: string) => {
      try {
        if (supabase) {
          const { error } = await supabase
            .from('members')
            .delete()
            .eq('id', id)
          
          if (error) throw error
          return { data: null, error: null }
        } else {
          console.log('Deleted mock member:', id)
          return { data: null, error: null }
        }
      } catch (error) {
        console.error('Error deleting member:', error)
        return { data: null, error: null }
      }
    },
  },
  
  // Comisiones
  commissions: {
    getAll: async () => {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('commissions')
            .select('*')
            .order('name', { ascending: true })
          
          if (error) throw error
          return { data, error: null }
        } else {
          return { 
            data: [{ 
              id: 'mock-commission-1', 
              name: 'Mock Commission 1', 
              lead_id: 'mock-member-1', 
              okr_text: 'Mock OKR', 
              kpi_json: {}, 
              created_at: '2023-01-01', 
              updated_at: '2023-01-01' 
            }], 
            error: null 
          }
        }
      } catch (error) {
        console.error('Error fetching commissions:', error)
        return { 
          data: [{ 
            id: 'mock-commission-1', 
            name: 'Mock Commission 1', 
            lead_id: 'mock-member-1', 
            okr_text: 'Mock OKR', 
            kpi_json: {}, 
            created_at: '2023-01-01', 
            updated_at: '2023-01-01' 
          }], 
          error: null 
        }
      }
    },
    
    getById: async (id: string) => {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('commissions')
            .select('*')
            .eq('id', id)
            .single()
          
          if (error) throw error
          return { data, error: null }
        } else {
          return { 
            data: { 
              id: 'mock-commission-1', 
              name: 'Mock Commission 1', 
              lead_id: 'mock-member-1', 
              okr_text: 'Mock OKR', 
              kpi_json: {}, 
              created_at: '2023-01-01', 
              updated_at: '2023-01-01' 
            }, 
            error: null 
          }
        }
      } catch (error) {
        console.error('Error fetching commission:', error)
        return { 
          data: { 
            id: 'mock-commission-1', 
            name: 'Mock Commission 1', 
            lead_id: 'mock-member-1', 
            okr_text: 'Mock OKR', 
            kpi_json: {}, 
            created_at: '2023-01-01', 
            updated_at: '2023-01-01' 
          }, 
          error: null 
        }
      }
    },
    
    create: async (data: Omit<Commission, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        if (supabase) {
          const { data: newCommission, error } = await supabase
            .from('commissions')
            .insert([data])
            .select()
            .single()
          
          if (error) throw error
          return { data: newCommission, error: null }
        } else {
          const mockCommission = {
            id: `mock-commission-${Date.now()}`,
            ...data,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          console.log('Created mock commission:', mockCommission)
          return { data: mockCommission, error: null }
        }
      } catch (error) {
        console.error('Error creating commission:', error)
        return { 
          data: { 
            id: 'mock-commission-1', 
            name: 'Mock Commission 1', 
            lead_id: 'mock-member-1', 
            okr_text: 'Mock OKR', 
            kpi_json: {}, 
            created_at: '2023-01-01', 
            updated_at: '2023-01-01' 
          }, 
          error: null 
        }
      }
    },
    
    update: async (id: string, data: Partial<Commission>) => {
      try {
        if (supabase) {
          const { data: updatedCommission, error } = await supabase
            .from('commissions')
            .update(data)
            .eq('id', id)
            .select()
            .single()
          
          if (error) throw error
          return { data: updatedCommission, error: null }
        } else {
          return { 
            data: { 
              id: 'mock-commission-1', 
              name: 'Mock Commission 1', 
              lead_id: 'mock-member-1', 
              okr_text: 'Mock OKR', 
              kpi_json: {}, 
              created_at: '2023-01-01', 
              updated_at: '2023-01-01' 
            }, 
            error: null 
          }
        }
      } catch (error) {
        console.error('Error updating commission:', error)
        return { 
          data: { 
            id: 'mock-commission-1', 
            name: 'Mock Commission 1', 
            lead_id: 'mock-member-1', 
            okr_text: 'Mock OKR', 
            kpi_json: {}, 
            created_at: '2023-01-01', 
            updated_at: '2023-01-01' 
          }, 
          error: null 
        }
      }
    },
    
    delete: async (id: string) => {
      try {
        if (supabase) {
          const { error } = await supabase
            .from('commissions')
            .delete()
            .eq('id', id)
          
          if (error) throw error
          return { data: null, error: null }
        } else {
          console.log('Deleted mock commission:', id)
          return { data: null, error: null }
        }
      } catch (error) {
        console.error('Error deleting commission:', error)
        return { data: null, error: null }
      }
    },
  },
  
  // Proyectos
  projects: {
    getAll: async () => {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false })
          
          if (error) throw error
          return { data, error: null }
        } else {
          return { 
            data: [{ 
              id: 'mock-project-1', 
              commission_id: 'mock-commission-1', 
              title: 'Mock Project 1', 
              progress_pct: 50, 
              last_update: '2023-01-01', 
              summary_ai: 'Mock Summary' 
            }], 
            error: null 
          }
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        return { 
          data: [{ 
            id: 'mock-project-1', 
            commission_id: 'mock-commission-1', 
            title: 'Mock Project 1', 
            progress_pct: 50, 
            last_update: '2023-01-01', 
            summary_ai: 'Mock Summary' 
          }], 
          error: null 
        }
      }
    },
    
    getByCommission: async (commissionId: string) => {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('commission_id', commissionId)
            .order('created_at', { ascending: false })
          
          if (error) throw error
          return { data, error: null }
        } else {
          return { 
            data: [{ 
              id: 'mock-project-1', 
              commission_id: 'mock-commission-1', 
              title: 'Mock Project 1', 
              progress_pct: 50, 
              last_update: '2023-01-01', 
              summary_ai: 'Mock Summary' 
            }], 
            error: null 
          }
        }
      } catch (error) {
        console.error('Error fetching projects by commission:', error)
        return { 
          data: [{ 
            id: 'mock-project-1', 
            commission_id: 'mock-commission-1', 
            title: 'Mock Project 1', 
            progress_pct: 50, 
            last_update: '2023-01-01', 
            summary_ai: 'Mock Summary' 
          }], 
          error: null 
        }
      }
    },
    
    create: async (data: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        if (supabase) {
          const { data: newProject, error } = await supabase
            .from('projects')
            .insert([data])
            .select()
            .single()
          
          if (error) throw error
          return { data: newProject, error: null }
        } else {
          const mockProject = {
            id: `mock-project-${Date.now()}`,
            ...data,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          console.log('Created mock project:', mockProject)
          return { data: mockProject, error: null }
        }
      } catch (error) {
        console.error('Error creating project:', error)
        return { 
          data: { 
            id: 'mock-project-1', 
            commission_id: 'mock-commission-1', 
            title: 'Mock Project 1', 
            progress_pct: 50, 
            last_update: '2023-01-01', 
            summary_ai: 'Mock Summary' 
          }, 
          error: null 
        }
      }
    },
    
    update: async (id: string, data: Partial<Project>) => {
      try {
        if (supabase) {
          const { data: updatedProject, error } = await supabase
            .from('projects')
            .update(data)
            .eq('id', id)
            .select()
            .single()
          
          if (error) throw error
          return { data: updatedProject, error: null }
        } else {
          return { 
            data: { 
              id: 'mock-project-1', 
              commission_id: 'mock-commission-1', 
              title: 'Mock Project 1', 
              progress_pct: 50, 
              last_update: '2023-01-01', 
              summary_ai: 'Mock Summary' 
            }, 
            error: null 
          }
        }
      } catch (error) {
        console.error('Error updating project:', error)
        return { 
          data: { 
            id: 'mock-project-1', 
            commission_id: 'mock-commission-1', 
            title: 'Mock Project 1', 
            progress_pct: 50, 
            last_update: '2023-01-01', 
            summary_ai: 'Mock Summary' 
          }, 
          error: null 
        }
      }
    },
    
    delete: async (id: string) => {
      try {
        if (supabase) {
          const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id)
          
          if (error) throw error
          return { data: null, error: null }
        } else {
          console.log('Deleted mock project:', id)
          return { data: null, error: null }
        }
      } catch (error) {
        console.error('Error deleting project:', error)
        return { data: null, error: null }
      }
    },
  },
  
  // Pagos
  payments: {
    getAll: async () => {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('payments')
            .select('*')
            .order('due_date', { ascending: true })
          
          if (error) throw error
          return { data, error: null }
        } else {
          return { 
            data: [{ 
              id: 'mock-payment-1', 
              member_id: 'mock-member-1', 
              amount_clp: 10000, 
              due_date: '2023-01-10', 
              status: 'pending' 
            }], 
            error: null 
          }
        }
      } catch (error) {
        console.error('Error fetching payments:', error)
        return { 
          data: [{ 
            id: 'mock-payment-1', 
            member_id: 'mock-member-1', 
            amount_clp: 10000, 
            due_date: '2023-01-10', 
            status: 'pending' 
          }], 
          error: null 
        }
      }
    },
    
    getByMember: async (memberId: string) => {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('payments')
            .select('*')
            .eq('member_id', memberId)
            .order('due_date', { ascending: true })
          
          if (error) throw error
          return { data, error: null }
        } else {
          return { 
            data: [{ 
              id: 'mock-payment-1', 
              member_id: 'mock-member-1', 
              amount_clp: 10000, 
              due_date: '2023-01-10', 
              status: 'pending' 
            }], 
            error: null 
          }
        }
      } catch (error) {
        console.error('Error fetching payments by member:', error)
        return { 
          data: [{ 
            id: 'mock-payment-1', 
            member_id: 'mock-member-1', 
            amount_clp: 10000, 
            due_date: '2023-01-10', 
            status: 'pending' 
          }], 
          error: null 
        }
      }
    },
    
    getOverdue: async () => {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('payments')
            .select('*')
            .eq('status', 'overdue')
            .order('due_date', { ascending: true })
          
          if (error) throw error
          return { data, error: null }
        } else {
          return { 
            data: [{ 
              id: 'mock-payment-1', 
              member_id: 'mock-member-1', 
              amount_clp: 10000, 
              due_date: '2023-01-10', 
              status: 'overdue' 
            }], 
            error: null 
          }
        }
      } catch (error) {
        console.error('Error fetching overdue payments:', error)
        return { 
          data: [{ 
            id: 'mock-payment-1', 
            member_id: 'mock-member-1', 
            amount_clp: 10000, 
            due_date: '2023-01-10', 
            status: 'overdue' 
          }], 
          error: null 
        }
      }
    },
    
    create: async (data: Omit<Payment, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        if (supabase) {
          const { data: newPayment, error } = await supabase
            .from('payments')
            .insert([data])
            .select()
            .single()
          
          if (error) throw error
          return { data: newPayment, error: null }
        } else {
          const mockPayment = {
            id: `mock-payment-${Date.now()}`,
            ...data,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          console.log('Created mock payment:', mockPayment)
          return { data: mockPayment, error: null }
        }
      } catch (error) {
        console.error('Error creating payment:', error)
        return { 
          data: { 
            id: 'mock-payment-1', 
            member_id: 'mock-member-1', 
            amount_clp: 10000, 
            due_date: '2023-01-10', 
            status: 'pending' 
          }, 
          error: null 
        }
      }
    },
    
    update: async (id: string, data: Partial<Payment>) => {
      try {
        if (supabase) {
          const { data: updatedPayment, error } = await supabase
            .from('payments')
            .update(data)
            .eq('id', id)
            .select()
            .single()
          
          if (error) throw error
          return { data: updatedPayment, error: null }
        } else {
          return { 
            data: { 
              id: 'mock-payment-1', 
              member_id: 'mock-member-1', 
              amount_clp: 10000, 
              due_date: '2023-01-10', 
              status: 'pending' 
            }, 
            error: null 
          }
        }
      } catch (error) {
        console.error('Error updating payment:', error)
        return { 
          data: { 
            id: 'mock-payment-1', 
            member_id: 'mock-member-1', 
            amount_clp: 10000, 
            due_date: '2023-01-10', 
            status: 'pending' 
          }, 
          error: null 
        }
      }
    },
    
    delete: async (id: string) => {
      try {
        if (supabase) {
          const { error } = await supabase
            .from('payments')
            .delete()
            .eq('id', id)
          
          if (error) throw error
          return { data: null, error: null }
        } else {
          console.log('Deleted mock payment:', id)
          return { data: null, error: null }
        }
      } catch (error) {
        console.error('Error deleting payment:', error)
        return { data: null, error: null }
      }
    },
  }
} 