'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  // Niche Switcher State
  const [activeNiche, setActiveNiche] = useState('labs');

  // ROI Calculator State
  const [apptsPerDay, setApptsPerDay] = useState(20);
  const [minsPerAppt, setMinsPerAppt] = useState(15);
  const [hoursSaved, setHoursSaved] = useState(0);
  const [extraRevenue, setExtraRevenue] = useState(0);

  // Form State
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', industry: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error

  useEffect(() => {
    // 5 working days a week
    // Average value of an appointment recovered = ₹2500
    const minsPerDay = apptsPerDay * minsPerAppt;
    const hoursPerWeek = (minsPerDay * 5) / 60;
    
    // Calculate Extra Revenue (Assuming 10% no-show rate eliminated, 20 days a month, ₹2500 avg value)
    const recoveredApptsPerMonth = (apptsPerDay * 0.1) * 20;
    const extraRev = recoveredApptsPerMonth * 2500;

    setHoursSaved(Math.round(hoursPerWeek));
    setExtraRevenue(extraRev);
  }, [apptsPerDay, minsPerAppt]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });
      
      if (response.ok) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error(error);
      setFormStatus('error');
    }
  };

  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Background decorative elements */}
      <div className="bg-circuit-lines"></div>
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-container">
          <a href="#" className="logo">
            <span className="logo-the">the</span><span className="logo-slotbot">slotbot</span>
          </a>
          <div className="nav-links">
            <a href="#services" onClick={(e) => smoothScroll(e, 'services')}>Services</a>
            <a href="#roi-calculator" onClick={(e) => smoothScroll(e, 'roi-calculator')}>ROI Calculator</a>
            <a href="#team" onClick={(e) => smoothScroll(e, 'team')}>Our Team</a>
            <a href="#contact" className="btn btn-primary" onClick={(e) => smoothScroll(e, 'contact')}>Book Discovery</a>
          </div>
          <button className="mobile-menu-btn"><i className="fas fa-bars"></i></button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">AI agents that <span className="highlight">automate</span> your business</h1>
            <p className="hero-subtitle">We build intelligent CRM and workflow automations tailored for Diagnostic Labs and Salons & Spas. Say goodbye to manual tasks and hello to pure efficiency.</p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary btn-large" onClick={(e) => smoothScroll(e, 'contact')}>Get Started <i className="fas fa-arrow-right"></i></a>
              <a href="#services" className="btn btn-secondary btn-large" onClick={(e) => smoothScroll(e, 'services')}>See How It Works</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="glass-card simulation-card">
              <div className="sim-header">
                <div className="sim-dots"><span></span><span></span><span></span></div>
                <div className="sim-title">Live Automation Flow</div>
              </div>
              <div className="sim-body">
                <div className="sim-message bot">New appointment booked! Triggering automation sequence...</div>
                <div className="sim-action"><i className="fas fa-check-circle"></i> Calendar Updated</div>
                <div className="sim-action"><i className="fas fa-paper-plane"></i> Confirmation WhatsApp Sent</div>
                <div className="sim-message bot">Waiting for appointment completion to send review request.</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Niche Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Tailored Automations for Your Industry</h2>
            <p>Select your industry to see how <span className="logo-the">the</span><span className="logo-slotbot">slotbot</span> transforms your daily operations.</p>
          </div>

          <div className="niche-switcher">
            <button 
              className={`niche-btn ${activeNiche === 'labs' ? 'active' : ''}`} 
              onClick={() => setActiveNiche('labs')}
            >
              <i className="fas fa-microscope"></i> Diagnostic Labs
            </button>
            <button 
              className={`niche-btn ${activeNiche === 'spas' ? 'active' : ''}`} 
              onClick={() => setActiveNiche('spas')}
            >
              <i className="fas fa-spa"></i> Salons & Spas
            </button>
          </div>

          <div className={`niche-content ${activeNiche === 'labs' ? 'active' : 'hidden'}`}>
            <div className="niche-grid">
              <div className="niche-text">
                <h3>Diagnostic Lab Workflows</h3>
                <ul className="feature-list">
                  <li><i className="fas fa-robot highlight-icon"></i> <strong>Smart Scheduling:</strong> Automated patient booking & reminders.</li>
                  <li><i className="fas fa-robot highlight-icon"></i> <strong>Report Delivery:</strong> Secure, instant WhatsApp/Email PDF delivery.</li>
                  <li><i className="fas fa-robot highlight-icon"></i> <strong>Patient CRM:</strong> Routine wellness check reminders based on history.</li>
                  <li><i className="fas fa-robot highlight-icon"></i> <strong>Reputation Growth:</strong> Automated Google Review requests post-visit.</li>
                </ul>
              </div>
              <div className="niche-visual">
                <div className="flow-diagram">
                  <div className="flow-step">Patient Books</div>
                  <i className="fas fa-arrow-down flow-arrow"></i>
                  <div className="flow-step">Reminder Sent (Auto)</div>
                  <i className="fas fa-arrow-down flow-arrow"></i>
                  <div className="flow-step">Report Ready</div>
                  <i className="fas fa-arrow-down flow-arrow"></i>
                  <div className="flow-step highlight-step">Auto-Sent via WhatsApp</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`niche-content ${activeNiche === 'spas' ? 'active' : 'hidden'}`}>
            <div className="niche-grid">
              <div className="niche-text">
                <h3>Salon & Spa Workflows</h3>
                <ul className="feature-list">
                  <li><i className="fas fa-robot highlight-icon"></i> <strong>Zero No-Shows:</strong> Automated SMS reminders and deposit collection.</li>
                  <li><i className="fas fa-robot highlight-icon"></i> <strong>Loyalty Loops:</strong> Automated point tracking and personalized offers.</li>
                  <li><i className="fas fa-robot highlight-icon"></i> <strong>Smart Upsells:</strong> Recommend products based on booked services.</li>
                  <li><i className="fas fa-robot highlight-icon"></i> <strong>Staff Sync:</strong> Automated staff scheduling and performance tracking.</li>
                </ul>
              </div>
              <div className="niche-visual">
                <div className="flow-diagram">
                  <div className="flow-step">Client Books</div>
                  <i className="fas fa-arrow-down flow-arrow"></i>
                  <div className="flow-step">Reminder & Upsell (Auto)</div>
                  <i className="fas fa-arrow-down flow-arrow"></i>
                  <div className="flow-step">Service Completed</div>
                  <i className="fas fa-arrow-down flow-arrow"></i>
                  <div className="flow-step highlight-step">Loyalty Points & Review Request</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="roi-calculator" className="calculator-section">
        <div className="container">
          <div className="calculator-wrapper glass-card">
            <div className="calc-input">
              <h2>Calculate Your ROI</h2>
              <p>See how much time and money AI agents can save you every week.</p>
              
              <div className="slider-group">
                <div className="slider-header">
                  <label htmlFor="appointments">Appointments per Day</label>
                  <span>{apptsPerDay}</span>
                </div>
                <input 
                  type="range" 
                  id="appointments" 
                  min="5" 
                  max="100" 
                  value={apptsPerDay}
                  onChange={(e) => setApptsPerDay(parseInt(e.target.value))}
                />
              </div>

              <div className="slider-group">
                <div className="slider-header">
                  <label htmlFor="time-spent">Manual Mins per Booking <br/><small>(Scheduling, Reminders, Follow-ups)</small></label>
                  <span>{minsPerAppt}</span>
                </div>
                <input 
                  type="range" 
                  id="time-spent" 
                  min="5" 
                  max="60" 
                  value={minsPerAppt}
                  onChange={(e) => setMinsPerAppt(parseInt(e.target.value))}
                />
              </div>
            </div>
            
            <div className="calc-output">
              <div className="result-card">
                <div className="result-title">Hours Saved / Week</div>
                <div className="result-value">{hoursSaved}</div>
                <div className="result-desc">Time given back to your team</div>
              </div>
              <div className="result-card highlight-card">
                <div className="result-title">Extra Revenue / Month</div>
                <div className="result-value">₹{extraRevenue.toLocaleString('en-IN')}</div>
                <div className="result-desc">Recovered from zero no-shows & upsells</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>The Human Intelligence Behind the AI</h2>
            <p>We are a dedicated team of 3 specialists, bringing bespoke automation to your fingertips.</p>
          </div>
          
          <div className="team-grid">
            <div className="team-card glass-card">
              <div className="team-avatar"><i className="fas fa-code-branch"></i></div>
              <h3>Tashir Ahmed</h3>
              <p className="team-role">Automation Architect</p>
              <p className="team-desc">Designs seamless, logic-driven workflows that eliminate bottlenecks.</p>
            </div>
            <div className="team-card glass-card">
              <div className="team-avatar"><i className="fas fa-database"></i></div>
              <h3>Sujal Kumar Jaiswal</h3>
              <p className="team-role">CRM Integration Lead</p>
              <p className="team-desc">Expert in connecting complex lab databases and specialized salon software.</p>
            </div>
            <div className="team-card glass-card">
              <div className="team-avatar"><i className="fas fa-users"></i></div>
              <h3>Jagdish Singh</h3>
              <p className="team-role">Client Success Lead</p>
              <p className="team-desc">Ensures your team adopts the tools smoothly and maximizes ROI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Ready to automate your business?</h2>
              <p>Book a free discovery call. We'll map out your current bottlenecks and show you exactly how <span className="logo-the">the</span><span className="logo-slotbot">slotbot</span> can fix them.</p>
              
              <div className="social-links mt-4">
                <p className="mb-2"><strong>Follow us:</strong></p>
                <a href="https://www.linkedin.com/company/slotbot/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <i className="fab fa-linkedin-in"></i> Connect on LinkedIn
                </a>
              </div>
            </div>
            
            <div className="contact-form glass-card">
              {formStatus !== 'success' ? (
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required 
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required 
                      placeholder="+91 XXXXX XXXXX"
                      value={formState.phone}
                      onChange={(e) => setFormState({...formState, phone: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="industry">Industry</label>
                    <select 
                      id="industry" 
                      required
                      value={formState.industry}
                      onChange={(e) => setFormState({...formState, industry: e.target.value})}
                    >
                      <option value="" disabled>Select your industry...</option>
                      <option value="labs">Diagnostic Lab</option>
                      <option value="spas">Salon / Spa</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {formStatus === 'error' && <p style={{color: '#ff5f56', marginBottom: '1rem'}}>Something went wrong. Please try again.</p>}
                  <button type="submit" className="btn btn-primary w-100" disabled={formStatus === 'loading'}>
                    {formStatus === 'loading' ? <><i className="fas fa-spinner fa-spin"></i> Submitting...</> : 'Book Discovery Call'}
                  </button>
                </form>
              ) : (
                <div className="form-success">
                  <i className="fas fa-check-circle"></i>
                  <h3>Request Sent!</h3>
                  <p>We'll be in touch shortly to schedule your discovery call.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container text-center">
          <p>&copy; 2026 theslotbot. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
