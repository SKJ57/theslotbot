import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, phone, industry } = await request.json();
    
    // Check if we should use local JSON database fallback
    if (!process.env.POSTGRES_URL || process.env.POSTGRES_URL.includes('your_postgres_connection_string_here')) {
      console.log('POSTGRES_URL is missing or placeholder. Using local JSON database fallback...');
      
      const dbPath = path.join(process.cwd(), 'leads.json');
      let leads = [];
      
      if (fs.existsSync(dbPath)) {
        try {
          const fileData = fs.readFileSync(dbPath, 'utf8');
          leads = JSON.parse(fileData);
        } catch (e) {
          console.error('Failed to parse leads.json, resetting database...', e);
        }
      }
      
      const newLead = {
        id: leads.length + 1,
        name,
        email,
        phone,
        industry,
        created_at: new Date().toISOString()
      };
      
      leads.push(newLead);
      fs.writeFileSync(dbPath, JSON.stringify(leads, null, 2), 'utf8');
      console.log('Lead saved locally to leads.json:', newLead);
    } else {
      // Create table if it doesn't exist (useful for a fresh live demo)
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          industry VARCHAR(100) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Safely ensure phone column exists in case the table was created earlier without it
      await sql`
        ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
      `;

      // Insert the new lead
      await sql`
        INSERT INTO leads (name, email, phone, industry)
        VALUES (${name}, ${email}, ${phone}, ${industry})
      `;
    }

    // Send email notification to you
    if (process.env.RESEND_API_KEY) {
      // If ADMIN_EMAIL isn't set, it uses the email you registered on Resend with (default Resend behavior for testing)
      const notifyEmail = process.env.ADMIN_EMAIL || 'onboarding@resend.dev'; 
      
      const { data, error: emailError } = await resend.emails.send({
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
              <li><strong>Phone Number:</strong> ${phone}</li>
              <li><strong>Industry:</strong> ${industry}</li>
            </ul>
            <p style="color: #888; font-size: 14px; margin-top: 20px;">Automated by theslotbot Notification System.</p>
          </div>
        `
      });

      if (emailError) {
        console.error('Resend Email Error:', emailError);
      } else {
        console.log('Resend Email Sent:', data);
      }
    }

    return NextResponse.json({ message: 'Lead captured successfully' }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
  }
}
