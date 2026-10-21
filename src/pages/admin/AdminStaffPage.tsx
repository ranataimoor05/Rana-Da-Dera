import React, { useState } from 'react';
import { Users, Shield, Plus, CheckCircle2, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

interface StaffMember {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  status: 'active' | 'on_leave';
  assignedArea: string;
}

export const AdminStaffPage: React.FC = () => {
  const { user, switchRole } = useAuth();

  const [staffList, setStaffList] = useState<StaffMember[]>([
    { id: 'st-1', name: 'Rana Taimoor (Owner)', phone: '0301-4431520', role: 'owner_admin', status: 'active', assignedArea: 'All Branches' },
    { id: 'st-2', name: 'Malik Kamran (Head Chef)', phone: '0300-1234567', role: 'manager', status: 'active', assignedArea: 'Kitchen Operations' },
    { id: 'st-3', name: 'Zahid Khan (Delivery Lead)', phone: '0302-9876543', role: 'staff', status: 'active', assignedArea: 'Naseerabad & Westridge' },
    { id: 'st-4', name: 'Arshad Ali (Tandoor Master)', phone: '0333-5551234', role: 'staff', status: 'active', assignedArea: 'Tandoor & Breads' }
  ]);

  return (
    <div className="admin-staff-page">
      <div style={{ marginBottom: '24px' }}>
        <h1 className="serif-title" style={{ fontSize: '2rem' }}>Staff Roles & Access Permissions</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage operational staff, assign roles, and configure portal authorization.</p>
      </div>

      {/* Security Rule Callout */}
      <div style={{ background: 'rgba(241, 199, 75, 0.1)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Shield size={24} className="gold-text" />
        <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: 'var(--color-gold-400)' }}>Invite-Only Staff Boundary:</strong> Staff credentials cannot be created via public registration. Staff additions require administrative invitation.
        </div>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Phone</th>
              <th>Current Role</th>
              <th>Operational Focus</th>
              <th>Status</th>
              <th>Simulate Role</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map(member => (
              <tr key={member.id}>
                <td style={{ fontWeight: 700 }}>{member.name}</td>
                <td>{member.phone}</td>
                <td>
                  <span
                    style={{
                      background: member.role === 'owner_admin' ? 'rgba(241, 199, 75, 0.15)' : 'rgba(255,255,255,0.06)',
                      color: member.role === 'owner_admin' ? 'var(--color-gold-400)' : 'var(--text-main)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}
                  >
                    {member.role.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </td>
                <td style={{ fontSize: '0.85rem' }}>{member.assignedArea}</td>
                <td>
                  <span style={{ color: '#4ade80', fontSize: '0.8rem', fontWeight: 700 }}>
                    ✓ Active
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => switchRole(member.role)}
                    className="btn-hero-secondary"
                    style={{ padding: '4px 12px', fontSize: '0.78rem' }}
                  >
                    Test as {member.role}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
