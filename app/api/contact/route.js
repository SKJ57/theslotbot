import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, industry } = await request.json();
    
    // Create table if it doesn't exist (useful for a fresh live demo)
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        industry VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert the new lead
    await sql`
      INSERT INTO leads (name, email, industry)
      VALUES (${name}, ${email}, ${industry})
    `;

    return NextResponse.json({ message: 'Lead captured successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
  }
}
