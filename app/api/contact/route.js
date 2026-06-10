import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send email notification to you
    if (process.env.RESEND_API_KEY) {
      // If ADMIN_EMAIL isn't set, it uses the email you registered on Resend with (default Resend behavior for testing)
      const notifyEmail = process.env.ADMIN_EMAIL || 'onboarding@resend.dev'; 
      
      await resend.emails.send({
        from: 'theslotbot Notifications <onboarding@resend.dev>', 
        to: [notifyEmail], 
        subject: `New Discovery Call Lead: ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>New Discovery Call Request! 🚀</h2>
            <p>You have a new lead from <strong>theslotbot</strong>.</p>
            <ul style="font-size: 16px;">
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Industry:</strong> ${industry}</li>
            </ul>
            <p style="color: #888; font-size: 14px; margin-top: 20px;">Automated by theslotbot Notification System.</p>
          </div>
        `
      });
    }

    return NextResponse.json({ message: 'Lead captured successfully' }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
  }
}
