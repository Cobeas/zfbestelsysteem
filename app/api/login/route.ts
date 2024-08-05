import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';

export async function POST(request: Request) {
  const { password } = await request.json();
  const data = await prisma.system_settings.findFirst({
      where: {
          id: 1
      },
      select: {
          id: true,
          jwt: true,
          refresh: true,
          hash: true
      }
  });
  console.log(data);

  const isMatch = await bcrypt.compare(password, data!.hash as string);

  if (!isMatch) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }

  const accessToken = jwt.sign({ user: 'ZFmedewerker' }, data!.jwt as string, { expiresIn: '8h' });
  const refreshToken = jwt.sign({ user: 'ZFmedewerker' }, data!.refresh as string, { expiresIn: '7d' });

  return NextResponse.json({ accessToken, refreshToken });
}