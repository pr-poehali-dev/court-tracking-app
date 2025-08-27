import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InviteLawyerDialog from './lawyers/InviteLawyerDialog';
import LawyersList from './lawyers/LawyersList';
import AssignRoleDialog from './lawyers/AssignRoleDialog';
import InvitationsList from './lawyers/InvitationsList';
import { Lawyer, CaseRole, Invitation, specializations } from './lawyers/types';
import { generateInvitationToken } from './lawyers/utils';

const LawyersTab = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([
    {
      id: '1',
      firstName: 'Анна',
      lastName: 'Петрова',
      email: 'anna.petrova@lawfirm.ru',
      phone: '+7 (495) 123-45-67',
      status: 'active',
      position: 'Ведущий юрист',
      department: 'Корпоративное право',
      hireDate: '2022-03-15',
      specializations: ['Корпоративное право', 'Налоговое право', 'М&A'],
      barNumber: 'А001234',
      isAdmin: false,
      lastLogin: '2024-08-26'
    },
    {
      id: '2',
      firstName: 'Михаил',
      lastName: 'Соколов',
      email: 'mikhail.sokolov@lawfirm.ru',
      phone: '+7 (495) 234-56-78',
      status: 'active',
      position: 'Партнёр',
      department: 'Судебная практика',
      hireDate: '2020-01-10',
      specializations: ['Арбитражные споры', 'Гражданское право', 'Корпоративные споры'],
      barNumber: 'А005678',
      isAdmin: true,
      lastLogin: '2024-08-27'
    },
    {
      id: '3',
      firstName: 'Елена',
      lastName: 'Краснова',
      email: 'elena.krasnova@lawfirm.ru',
      status: 'pending',
      position: 'Младший юрист',
      department: 'Семейное право',
      hireDate: '2024-08-20',
      specializations: ['Семейное право'],
      isAdmin: false,
      invitedBy: 'Михаил Соколов',
      invitedAt: '2024-08-20'
    }
  ]);

  const [caseRoles, setCaseRoles] = useState<CaseRole[]>([
    {
      id: '1',
      caseId: '1',
      caseName: 'Покупка квартиры на Арбате',
      lawyerId: '1',
      role: 'coordinator',
      assignedBy: 'Михаил Соколов',
      assignedAt: '2024-08-01',
      isActive: true,
      responsibilities: ['Общая координация', 'Контакт с клиентом'],
      notes: 'Главный координатор по сделке'
    },
    {
      id: '2',
      caseId: '2',
      caseName: 'Корпоративные договоры ООО "Строй-Инвест"',
      lawyerId: '2',
      role: 'litigator',
      assignedBy: 'Михаил Соколов',
      assignedAt: '2024-08-15',
      isActive: true,
      responsibilities: ['Представительство в арбитраже'],
      notes: 'Ведущий по арбитражным делам'
    }
  ]);

  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: '1',
      email: 'sergey.volkov@email.com',
      firstName: 'Сергей',
      lastName: 'Волков',
      position: 'Юрист',
      department: 'Налоговое консультирование',
      invitedBy: 'Михаил Соколов',
      invitedAt: '2024-08-20',
      expiresAt: '2024-08-27',
      status: 'pending',
      token: 'inv_abc123def456'
    },
    {
      id: '2',
      email: 'maria.ivanova@email.com',
      firstName: 'Мария',
      lastName: 'Иванова',
      position: 'Ведущий юрист',
      department: 'Недвижимость',
      invitedBy: 'Анна Петрова',
      invitedAt: '2024-08-10',
      expiresAt: '2024-08-17',
      status: 'expired',
      token: 'inv_xyz789ghi012'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterSpecialization, setFilterSpecialization] = useState<string>('all');

  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isAssignRoleDialogOpen, setIsAssignRoleDialogOpen] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);

  const [newInvitation, setNewInvitation] = useState<Partial<Invitation & { specializations: string[]; message?: string }>>({
    specializations: []
  });

  const [newRole, setNewRole] = useState<Partial<CaseRole>>({
    isActive: true
  });

  const availableCases = [
    { id: '1', name: 'Покупка квартиры на Арбате', client: 'Иван Петров' },
    { id: '2', name: 'Корпоративные договоры ООО "Строй-Инвест"', client: 'Мария Сидорова' },
    { id: '3', name: 'Семейный спор Коваленко', client: 'Алексей Коваленко' }
  ];

  const departments = Array.from(new Set(lawyers.map(l => l.department).filter(Boolean)));

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || lawyer.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || lawyer.department === filterDepartment;
    const matchesSpecialization = filterSpecialization === 'all' || 
                                 lawyer.specializations.includes(filterSpecialization);
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesSpecialization;
  });

  const handleSendInvitation = () => {
    if (newInvitation.email && newInvitation.firstName && newInvitation.lastName && newInvitation.position) {
      const invitation: Invitation = {
        id: Date.now().toString(),
        email: newInvitation.email,
        firstName: newInvitation.firstName,
        lastName: newInvitation.lastName,
        position: newInvitation.position,
        department: newInvitation.department,
        invitedBy: 'Текущий пользователь', // В реальном приложении будет из контекста
        invitedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending',
        token: generateInvitationToken()
      };
      
      setInvitations(prev => [...prev, invitation]);
      setNewInvitation({ specializations: [] });
      setIsInviteDialogOpen(false);
    }
  };

  const handleAssignRole = () => {
    if (selectedLawyer && newRole.caseId && newRole.role) {
      const role: CaseRole = {
        id: Date.now().toString(),
        caseId: newRole.caseId,
        caseName: newRole.caseName || '',
        lawyerId: selectedLawyer.id,
        role: newRole.role,
        assignedBy: 'Текущий пользователь',
        assignedAt: new Date().toISOString(),
        isActive: true,
        notes: newRole.notes
      };
      
      setCaseRoles(prev => [...prev, role]);
      setNewRole({ isActive: true });
      setSelectedLawyer(null);
      setIsAssignRoleDialogOpen(false);
    }
  };

  const handleAssignToCase = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setIsAssignRoleDialogOpen(true);
  };

  const handleEditLawyer = (lawyer: Lawyer) => {
    // Функционал редактирования юриста
    console.log('Редактирование юриста:', lawyer);
  };

  const handleViewProfile = (lawyer: Lawyer) => {
    // Функционал просмотра профиля
    console.log('Просмотр профиля:', lawyer);
  };

  const handleResendInvitation = (invitation: Invitation) => {
    const updatedInvitation = {
      ...invitation,
      status: 'pending' as const,
      invitedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      token: generateInvitationToken()
    };
    
    setInvitations(prev => prev.map(inv => inv.id === invitation.id ? updatedInvitation : inv));
  };

  const handleCancelInvitation = (invitation: Invitation) => {
    setInvitations(prev => prev.map(inv => 
      inv.id === invitation.id ? { ...inv, status: 'cancelled' as const } : inv
    ));
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Юристы</h2>
        <InviteLawyerDialog
          isOpen={isInviteDialogOpen}
          onOpenChange={setIsInviteDialogOpen}
          newInvitation={newInvitation}
          onInvitationChange={setNewInvitation}
          onSendInvitation={handleSendInvitation}
        />
      </div>

      <Tabs defaultValue="lawyers" className="w-full">
        <TabsList>
          <TabsTrigger value="lawyers">Команда</TabsTrigger>
          <TabsTrigger value="invitations">Приглашения</TabsTrigger>
          <TabsTrigger value="roles">Роли в делах</TabsTrigger>
        </TabsList>

        <TabsContent value="lawyers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Поиск по имени или email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="inactive">Неактивные</SelectItem>
                <SelectItem value="pending">Ожидают</SelectItem>
                <SelectItem value="suspended">Заблокированные</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Отдел" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все отделы</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
              <SelectTrigger>
                <SelectValue placeholder="Специализация" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все специализации</SelectItem>
                {specializations.map(spec => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <LawyersList 
            lawyers={filteredLawyers}
            caseRoles={caseRoles}
            onEditLawyer={handleEditLawyer}
            onAssignToCase={handleAssignToCase}
            onViewProfile={handleViewProfile}
          />
        </TabsContent>

        <TabsContent value="invitations">
          <InvitationsList 
            invitations={invitations}
            onResendInvitation={handleResendInvitation}
            onCancelInvitation={handleCancelInvitation}
          />
        </TabsContent>

        <TabsContent value="roles">
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">Управление ролями</h3>
            <p className="text-muted-foreground">
              Здесь будет отображаться информация о ролях юристов в делах
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <AssignRoleDialog
        isOpen={isAssignRoleDialogOpen}
        onOpenChange={setIsAssignRoleDialogOpen}
        selectedLawyer={selectedLawyer}
        newRole={newRole}
        onRoleChange={setNewRole}
        onAssignRole={handleAssignRole}
        availableCases={availableCases}
      />
    </div>
  );
};

export default LawyersTab;