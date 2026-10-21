import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Lock, Mail, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/auth';

export const LoginPage: React.FC = () => {
  const { t } = useI18n();
  const { login, switchRole } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('0301-4431520');
  const [password, setPassword] = useState('demo123');
  const [demoRole, setDemoRole] = useState<UserRole>('customer');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(identifier, demoRole);
    navigate(demoRole === 'owner_admin' || demoRole === 'manager' || demoRole === 'staff' ? '/admin' : '/dashboard');
  };

  return (
    <div className="auth-page" style={{ padding: '60px 0 100px' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary-800), var(--color-primary-950))', border: '1px solid var(--color-gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'var(--color-gold-400)' }}>
              <LogIn size={24} />
            </div>
            <h1 className="serif-title gold-gradient-text" style={{ fontSize: '1.8rem' }}>
              Sign In to Rana Da Dera
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Access order history, live tracking & table bookings
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Phone or Email Address</label>
              <input
                type="text"
                required
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                placeholder="0301-4431520"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <Link to="/forgot-password" style={{ fontSize: '0.78rem', color: 'var(--color-gold-400)' }}>
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Demo QA Role Selection Helper */}
            <div style={{ margin: '14px 0', padding: '12px', background: 'rgba(241, 199, 75, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-glass)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-400)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                DEMO ROLE SIMULATOR
              </span>
              <select
                value={demoRole}
                onChange={e => setDemoRole(e.target.value as UserRole)}
                className="form-select"
                style={{ fontSize: '0.82rem', padding: '6px 10px' }}
              >
                <option value="customer">Customer Patron (View orders & points)</option>
                <option value="owner_admin">Owner / Administrator (Full Suite)</option>
                <option value="manager">Restaurant Manager</option>
                <option value="staff">Kitchen & Delivery Staff</option>
              </select>
            </div>

            <button type="submit" className="btn-hero-primary" style={{ width: '100%', marginTop: '8px' }}>
              <span>Sign In</span>
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--color-gold-400)', fontWeight: 700 }}>
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    register(name, email, phone);
    navigate('/dashboard');
  };

  return (
    <div className="auth-page" style={{ padding: '60px 0 100px' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary-800), var(--color-primary-950))', border: '1px solid var(--color-gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'var(--color-gold-400)' }}>
              <UserPlus size={24} />
            </div>
            <h1 className="serif-title gold-gradient-text" style={{ fontSize: '1.8rem' }}>
              Join Royal Dining Club
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Earn 100 bonus welcome points upon signing up!
            </p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Rana Taimoor"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="0301-4431520"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address (Optional)</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="taimoor@example.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input"
              />
            </div>

            <button type="submit" className="btn-hero-primary" style={{ width: '100%', marginTop: '12px' }}>
              <span>Create Customer Account</span>
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Already registered?{' '}
            <Link to="/login" style={{ color: 'var(--color-gold-400)', fontWeight: 700 }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) return;
    setSent(true);
  };

  return (
    <div className="auth-page" style={{ padding: '60px 0 100px' }}>
      <div className="container" style={{ maxWidth: '460px' }}>
        <div className="glass-panel" style={{ padding: '36px' }}>
          <h1 className="serif-title gold-gradient-text" style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '8px' }}>
            Password Assistance
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '24px' }}>
            Enter your phone number or email to receive a recovery code.
          </p>

          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '14px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '0.88rem' }}>
                <CheckCircle2 size={20} />
                <span>Demo recovery instructions sent to {identifier}.</span>
              </div>
              <Link to="/login" className="btn-hero-primary" style={{ display: 'inline-block' }}>
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Phone or Email</label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="0301-4431520"
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn-hero-primary" style={{ width: '100%', marginTop: '12px' }}>
                Send Recovery Code
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
