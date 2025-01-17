import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Absensi from '@/models/Absensi';

export async function POST(req: Request) {
  await dbConnect();
  const { userId, status } = await req.json();

  try {
    const absensi = new Absensi({
      userId,
      tanggal: new Date(),
      status,
    });
    await absensi.save();
    return NextResponse.json(absensi);
  } catch (error) {
    console.error('Absensi error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const absensiList = await Absensi.find().populate('userId', 'username').sort({ tanggal: -1 });
    return NextResponse.json(absensiList);
  } catch (error) {
    console.error('Fetch absensi error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

