// --- INTEGRACIÓN SUPABASE DESHABILITADA POR MODO MOCKUP ---
// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// export const supabase = createClient(supabaseUrl, supabaseAnonKey)
// export const db = { ... }
// --- FIN INTEGRACIÓN SUPABASE ---

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
    getAll: () => {
      // Supabase integration is disabled, returning a mock array
      return Promise.resolve({ data: [{ id: 'mock-id-1', full_name: 'Mock Member 1', email: 'mock1@example.com', phone: '123456789', country: 'Mockland', commission_id: 'mock-commission-1', cause: 'Mock Cause', status: 'active', participation_score: 100, joined_at: '2023-01-01', created_at: '2023-01-01', updated_at: '2023-01-01' }], error: null });
    },
    getById: (id: string) => {
      // Supabase integration is disabled, returning a mock object
      return Promise.resolve({ data: { id: 'mock-id-1', full_name: 'Mock Member 1', email: 'mock1@example.com', phone: '123456789', country: 'Mockland', commission_id: 'mock-commission-1', cause: 'Mock Cause', status: 'active', participation_score: 100, joined_at: '2023-01-01', created_at: '2023-01-01', updated_at: '2023-01-01' }, error: null });
    },
    create: (data: Omit<Member, 'id' | 'created_at' | 'updated_at'>) => {
      // Supabase integration is disabled, returning a mock object
      return Promise.resolve({ data: { id: 'mock-id-1', full_name: 'Mock Member 1', email: 'mock1@example.com', phone: '123456789', country: 'Mockland', commission_id: 'mock-commission-1', cause: 'Mock Cause', status: 'active', participation_score: 100, joined_at: '2023-01-01', created_at: '2023-01-01', updated_at: '2023-01-01' }, error: null });
    },
    update: (id: string, data: Partial<Member>) => {
      // Supabase integration is disabled, returning a mock object
      return Promise.resolve({ data: { id: 'mock-id-1', full_name: 'Mock Member 1', email: 'mock1@example.com', phone: '123456789', country: 'Mockland', commission_id: 'mock-commission-1', cause: 'Mock Cause', status: 'active', participation_score: 100, joined_at: '2023-01-01', created_at: '2023-01-01', updated_at: '2023-01-01' }, error: null });
    },
    delete: (id: string) => {
      // Supabase integration is disabled, returning a mock object
      return Promise.resolve({ data: null, error: null });
    },
  },
  
  // Comisiones
  commissions: {
    getAll: () => {
      // Supabase integration is disabled, returning a mock array
      return Promise.resolve({ data: [{ id: 'mock-commission-1', name: 'Mock Commission 1', lead_id: 'mock-member-1', okr_text: 'Mock OKR', kpi_json: {}, created_at: '2023-01-01', updated_at: '2023-01-01' }], error: null });
    },
    getById: (id: string) => {
      // Supabase integration is disabled, returning a mock object
      return Promise.resolve({ data: { id: 'mock-commission-1', name: 'Mock Commission 1', lead_id: 'mock-member-1', okr_text: 'Mock OKR', kpi_json: {}, created_at: '2023-01-01', updated_at: '2023-01-01' }, error: null });
    },
    create: (data: Omit<Commission, 'id' | 'created_at' | 'updated_at'>) => {
      // Supabase integration is disabled, returning a mock object
      return Promise.resolve({ data: { id: 'mock-commission-1', name: 'Mock Commission 1', lead_id: 'mock-member-1', okr_text: 'Mock OKR', kpi_json: {}, created_at: '2023-01-01', updated_at: '2023-01-01' }, error: null });
    },
    update: (id: string, data: Partial<Commission>) => {
      // Supabase integration is disabled, returning a mock object
      return Promise.resolve({ data: { id: 'mock-commission-1', name: 'Mock Commission 1', lead_id: 'mock-member-1', okr_text: 'Mock OKR', kpi_json: {}, created_at: '2023-01-01', updated_at: '2023-01-01' }, error: null });
    },
    delete: (id: string) => {
      // Supabase integration is disabled, returning a mock object
      return Promise.resolve({ data: null, error: null });
    },
  },
  
  // Proyectos
  projects: {
    getAll: () => {
      // Supabase integration is disabled, returning a mock array
      return Promise.resolve({ data: [{ id: 'mock-project-1', commission_id: 'mock-commission-1', title: 'Mock Project 1', progress_pct: 50, last_update: '2023-01-01', summary_ai: 'Mock Summary' }], error: null });
    },
    getByCommission: (commissionId: string) => {
      // Supabase integration is disabled, returning a mock array
      return Promise.resolve({ data: [{ id: 'mock-project-1', commission_id: 'mock-commission-1', title: 'Mock Project 1', progress_pct: 50, last_update: '2023-01-01', summary_ai: 'Mock Summary' }], error: null });
    },
    create: (data: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
      // Supabase integration is disabled, returning a mock object
      return Promise.resolve({ data: { id: 'mock-project-1', commission_id: 'mock-commission-1', title: 'Mock Project 1', progress_pct: 50, last_update: '2023-01-01', summary_ai: 'Mock Summary' }, error: null });
    },
    update: (id: string, data: Partial<Project>) => {
      // Supabase integration is disabled, returning a mock object
      return Promise.resolve({ data: { id: 'mock-project-1', commission_id: 'mock-commission-1', title: 'Mock Project 1', progress_pct: 50, last_update: '2023-01-01', summary_ai: 'Mock Summary' }, error: null });
    },
    delete: (id: string) => {
      // Supabase integration is disabled, returning a mock object
      return Promise.resolve({ data: null, error: null });
    },
  },
  
  // Pagos
  payments: {
    getAll: () => {
      // Supabase integration is disabled, returning a mock array
      return Promise.resolve({ data: [{ id: 'mock-payment-1', member_id: 'mock-member-1', amount_clp: 10000, due_date: '2023-01-10', status: 'pending' }], error: null });
    },
    getByMember: (memberId: string) => {
      // Supabase integration is disabled, returning a mock array
      return Promise.resolve({ data: [{ id: 'mock-payment-1', member_id: 'mock-member-1', amount_clp: 10000, due_date: '2023-01-10', status: 'pending' }], error: null });
    },
    getOverdue: () => {
      // Supabase integration is disabled, returning a mock array
      return Promise.resolve({ data: [{ id: 'mock-payment-1', member_id: 'mock-member-1', amount_clp: 10000, due_date: '2023-01-10', status: 'overdue' }], error: null });
    },
    create: (data: Omit<Payment, 'id' | 'created_at' | 'updated_at'>) => {
      // Supabase integration is disabled, returning a mock object
      return Promise.resolve({ data: { id: 'mock-payment-1', member_id: 'mock-member-1', amount_clp: 10000, due_date: '2023-01-10', status: 'pending' }, error: null });
    },
    update: (id: string, data: Partial<Payment>) => {
      // Supabase integration is disabled, returning a mock object
      return Promise.resolve({ data: { id: 'mock-payment-1', member_id: 'mock-member-1', amount_clp: 10000, due_date: '2023-01-10', status: 'pending' }, error: null });
    },
    delete: (id: string) => {
      // Supabase integration is disabled, returning a mock object
      return Promise.resolve({ data: null, error: null });
    },
  }
} 