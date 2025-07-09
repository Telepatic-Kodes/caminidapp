import { NextRequest, NextResponse } from 'next/server';
import { mockMembers } from '@/lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe en los datos mock
    const existingMember = mockMembers.find(member => member.email === email);
    const isEmailTaken = !!existingMember;

    return NextResponse.json({
      isEmailTaken,
      message: isEmailTaken ? 'Este email ya está registrado' : 'Email disponible'
    });

  } catch (error) {
    console.error('Error en check-email API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 