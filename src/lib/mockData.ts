export const mockMembers = [
  {
    id: "1",
    full_name: "Diego Pérez",
    email: "diego@email.com",
    country: "Chile",
    status: "active",
    participation_score: 80,
    joined_at: "2024-07-01",
  },
  {
    id: "2",
    full_name: "María González",
    email: "maria@email.com",
    country: "Argentina",
    status: "paused",
    participation_score: 60,
    joined_at: "2024-06-15",
  },
]; 

export const mockCommissions = [
  {
    id: "c1",
    name: "Comisión de Tecnología",
    kpi_json: { target_members: 10 },
  },
  {
    id: "c2",
    name: "Comisión de Impacto Social",
    kpi_json: { target_members: 8 },
  },
]; 

export const mockProjects = [
  {
    id: "p1",
    title: "Alfabetización Digital para Adultos",
    status: "Activo",
    description: "Programa de capacitación en tecnologías básicas para adultos mayores en comunidades rurales.",
    commission: "Educación y Formación",
    leader: "Dr. Patricia López",
    members: 12,
    progress_pct: 75,
    beneficiaries: 150,
    volunteer_hours: 480,
    funds_raised: 2500000, // en CLP
    last_update: "2024-01-20",
    next_milestone: "Finalización de módulo 3 - 25 de enero",
    summary_ai: "Capacitación en tecnologías básicas para adultos mayores.",
    kpi_json: {
      target_members: 10,
      target_beneficiaries: 200,
      target_hours: 500,
      target_funds: 3000000,
    },
  },
]; 