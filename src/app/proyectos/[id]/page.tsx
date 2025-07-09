import { mockProjects } from '@/lib/mockData';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default function ProyectoDetallePage({ params }: Props) {
  const proyecto = mockProjects.find(p => p.id === params.id);

  if (!proyecto) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-2">{proyecto.title}</h1>
      <span className="inline-block mb-4 px-2 py-1 text-xs rounded bg-green-100 text-green-800">{proyecto.status || 'Activo'}</span>
      <p className="mb-4">{proyecto.description}</p>
      <div className="mb-2 text-sm text-gray-500">
        Comisión: {proyecto.commission} | Líder: {proyecto.leader || proyecto.lead} | {proyecto.members} miembros
      </div>
      <div className="mb-4">
        <div className="text-xs text-gray-600 mb-1">Progreso</div>
        <div className="w-full bg-gray-200 rounded h-2">
          <div
            className="bg-yellow-400 h-2 rounded"
            style={{ width: `${proyecto.progress_pct || proyecto.progress}%` }}
          ></div>
        </div>
        <div className="text-right text-xs text-gray-500">{proyecto.progress_pct || proyecto.progress}%</div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <div className="text-xs text-gray-500">Beneficiarios</div>
          <div className="font-bold">{proyecto.beneficiaries || proyecto.impact?.beneficiaries}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Horas Voluntarias</div>
          <div className="font-bold">{proyecto.volunteer_hours || proyecto.impact?.hoursVolunteered}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Fondos Recaudados</div>
          <div className="font-bold">${((proyecto.funds_raised || proyecto.impact?.fundsRaised) / 1000).toLocaleString()}K CLP</div>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-4">
        Última actualización: {proyecto.last_update || proyecto.lastUpdate} <br />
        Próximo hito: {proyecto.next_milestone || proyecto.nextMilestone}
      </div>
    </div>
  );
} 