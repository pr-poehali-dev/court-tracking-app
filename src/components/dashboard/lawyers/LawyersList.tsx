import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Lawyer, CaseRole } from './types';
import { getStatusBadgeVariant, getStatusLabel, formatFullName, getActiveCasesCount } from './utils';

interface LawyersListProps {
  lawyers: Lawyer[];
  caseRoles: CaseRole[];
  onEditLawyer: (lawyer: Lawyer) => void;
  onAssignToCase: (lawyer: Lawyer) => void;
  onViewProfile: (lawyer: Lawyer) => void;
}

const LawyersList: React.FC<LawyersListProps> = ({
  lawyers,
  caseRoles,
  onEditLawyer,
  onAssignToCase,
  onViewProfile
}) => {
  const getInitials = (lawyer: Lawyer) => {
    return `${lawyer.firstName.charAt(0)}${lawyer.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="grid gap-4">
      {lawyers.map((lawyer) => {
        const activeCasesCount = getActiveCasesCount(lawyer.id, caseRoles);
        
        return (
          <Card key={lawyer.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={lawyer.avatar} alt={formatFullName(lawyer)} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(lawyer)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {formatFullName(lawyer)}
                      <Badge variant={getStatusBadgeVariant(lawyer.status)}>
                        {getStatusLabel(lawyer.status)}
                      </Badge>
                      {lawyer.isAdmin && (
                        <Badge variant="secondary">
                          <Icon name="Crown" size={12} className="mr-1" />
                          Админ
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{lawyer.position}</p>
                    {lawyer.department && (
                      <p className="text-xs text-muted-foreground">{lawyer.department}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => onViewProfile(lawyer)}>
                    <Icon name="Eye" size={14} className="mr-1" />
                    Профиль
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onAssignToCase(lawyer)}>
                    <Icon name="UserPlus" size={14} className="mr-1" />
                    Назначить
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onEditLawyer(lawyer)}>
                    <Icon name="Edit" size={14} className="mr-1" />
                    Изменить
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Mail" size={14} />
                    <a href={`mailto:${lawyer.email}`} className="text-blue-600 hover:underline">
                      {lawyer.email}
                    </a>
                  </div>
                  {lawyer.phone && (
                    <div className="flex items-center gap-2">
                      <Icon name="Phone" size={14} />
                      <a href={`tel:${lawyer.phone}`} className="text-blue-600 hover:underline">
                        {lawyer.phone}
                      </a>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Briefcase" size={14} />
                    <span className="text-muted-foreground">
                      Активных дел: {activeCasesCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={14} />
                    <span className="text-muted-foreground">
                      С {new Date(lawyer.hireDate).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>

                <div>
                  {lawyer.barNumber && (
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Award" size={14} />
                      <span className="text-muted-foreground text-xs">
                        Адвокат №{lawyer.barNumber}
                      </span>
                    </div>
                  )}
                  {lawyer.lastLogin && (
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={14} />
                      <span className="text-muted-foreground text-xs">
                        Был в сети: {new Date(lawyer.lastLogin).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  {lawyer.specializations.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Специализации:</p>
                      <div className="flex flex-wrap gap-1">
                        {lawyer.specializations.slice(0, 3).map(spec => (
                          <Badge key={spec} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                        {lawyer.specializations.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{lawyer.specializations.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default LawyersList;