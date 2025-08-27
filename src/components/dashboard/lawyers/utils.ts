import { Lawyer, CaseRole, Invitation, lawyerRoles } from './types';

export const getStatusBadgeVariant = (status: Lawyer['status']) => {
  switch (status) {
    case 'active': return 'default';
    case 'inactive': return 'secondary';
    case 'pending': return 'outline';
    case 'suspended': return 'destructive';
    default: return 'secondary';
  }
};

export const getStatusLabel = (status: Lawyer['status']) => {
  switch (status) {
    case 'active': return 'Активен';
    case 'inactive': return 'Неактивен';
    case 'pending': return 'Ожидает';
    case 'suspended': return 'Заблокирован';
    default: return status;
  }
};

export const getInvitationStatusBadgeVariant = (status: Invitation['status']) => {
  switch (status) {
    case 'pending': return 'outline';
    case 'accepted': return 'default';
    case 'expired': return 'destructive';
    case 'cancelled': return 'secondary';
    default: return 'secondary';
  }
};

export const getInvitationStatusLabel = (status: Invitation['status']) => {
  switch (status) {
    case 'pending': return 'Ожидает';
    case 'accepted': return 'Принято';
    case 'expired': return 'Истекло';
    case 'cancelled': return 'Отменено';
    default: return status;
  }
};

export const getRoleInfo = (role: CaseRole['role']) => {
  return lawyerRoles.find(r => r.value === role) || { 
    label: role, 
    description: '', 
    icon: 'User' 
  };
};

export const formatFullName = (lawyer: Lawyer) => {
  return `${lawyer.firstName} ${lawyer.lastName}`;
};

export const generateInvitationToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const isInvitationExpired = (invitation: Invitation) => {
  return new Date(invitation.expiresAt) < new Date();
};

export const getActiveCasesCount = (lawyerId: string, caseRoles: CaseRole[]) => {
  return caseRoles.filter(role => role.lawyerId === lawyerId && role.isActive).length;
};

export const getLawyerRolesByCase = (lawyerId: string, caseRoles: CaseRole[]) => {
  const roles = caseRoles.filter(role => role.lawyerId === lawyerId && role.isActive);
  const grouped = roles.reduce((acc, role) => {
    if (!acc[role.caseId]) {
      acc[role.caseId] = [];
    }
    acc[role.caseId].push(role);
    return acc;
  }, {} as { [caseId: string]: CaseRole[] });
  
  return grouped;
};