import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Invitation } from './types';
import { getInvitationStatusBadgeVariant, getInvitationStatusLabel, isInvitationExpired } from './utils';

interface InvitationsListProps {
  invitations: Invitation[];
  onResendInvitation: (invitation: Invitation) => void;
  onCancelInvitation: (invitation: Invitation) => void;
}

const InvitationsList: React.FC<InvitationsListProps> = ({
  invitations,
  onResendInvitation,
  onCancelInvitation
}) => {
  if (invitations.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Icon name="UserPlus" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Приглашений нет</h3>
          <p className="text-muted-foreground">
            Отправьте приглашения новым сотрудникам для присоединения к команде
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {invitations.map((invitation) => {
        const expired = isInvitationExpired(invitation);
        const canResend = invitation.status === 'pending' || expired;
        const canCancel = invitation.status === 'pending' && !expired;

        return (
          <Card key={invitation.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Mail" size={20} />
                    {invitation.firstName} {invitation.lastName}
                    <Badge variant={getInvitationStatusBadgeVariant(invitation.status)}>
                      {getInvitationStatusLabel(invitation.status)}
                    </Badge>
                    {expired && (
                      <Badge variant="destructive">
                        <Icon name="Clock" size={12} className="mr-1" />
                        Истекло
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{invitation.position}</p>
                  {invitation.department && (
                    <p className="text-xs text-muted-foreground">{invitation.department}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {canResend && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onResendInvitation(invitation)}
                    >
                      <Icon name="RefreshCw" size={14} className="mr-1" />
                      Отправить повторно
                    </Button>
                  )}
                  {canCancel && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onCancelInvitation(invitation)}
                    >
                      <Icon name="X" size={14} className="mr-1" />
                      Отменить
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Mail" size={14} />
                    <span className="text-muted-foreground">{invitation.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="User" size={14} />
                    <span className="text-muted-foreground">
                      Пригласил: {invitation.invitedBy}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Calendar" size={14} />
                    <span className="text-muted-foreground">
                      Отправлено: {new Date(invitation.invitedAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={14} />
                    <span className={`text-muted-foreground ${expired ? 'text-red-600' : ''}`}>
                      Истекает: {new Date(invitation.expiresAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground">
                    {invitation.status === 'pending' && !expired && (
                      <div className="flex items-center gap-1 text-yellow-600">
                        <Icon name="Clock" size={12} />
                        Ожидает ответа
                      </div>
                    )}
                    {invitation.status === 'accepted' && (
                      <div className="flex items-center gap-1 text-green-600">
                        <Icon name="CheckCircle" size={12} />
                        Приглашение принято
                      </div>
                    )}
                    {(expired || invitation.status === 'expired') && (
                      <div className="flex items-center gap-1 text-red-600">
                        <Icon name="AlertTriangle" size={12} />
                        Срок истёк
                      </div>
                    )}
                    {invitation.status === 'cancelled' && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <Icon name="X" size={12} />
                        Приглашение отменено
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default InvitationsList;