
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, UserMinus, Shield, Mail, Calendar, Edit, Trash2, Copy, CheckCircle } from 'lucide-react';
import { UserRole, TeamMember } from '@/types/team';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import TeamInviteDialog from '@/components/team/TeamInviteDialog';
import RoleChangeDialog from '@/components/team/RoleChangeDialog';
import RemoveUserDialog from '@/components/team/RemoveUserDialog';
import { generateRandomId } from '@/utils/idGenerator';

// Temporary mock data until we integrate with backend
const mockTeamMembers: TeamMember[] = [
  {
    id: generateRandomId(),
    name: 'Max Mustermann',
    email: 'max@beispielfirma.de',
    role: 'admin',
    joinedAt: new Date(2023, 9, 15)
  },
  {
    id: generateRandomId(),
    name: 'Laura Schmidt',
    email: 'laura@beispielfirma.de',
    role: 'hr',
    joinedAt: new Date(2023, 10, 3)
  },
  {
    id: generateRandomId(),
    name: 'Thomas Weber',
    email: 'thomas@beispielfirma.de',
    role: 'viewer',
    joinedAt: new Date(2023, 11, 20)
  }
];

const TeamPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invitations, setInvitations] = useState<any[]>([]);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  
  useEffect(() => {
    // Check if user is admin, if not, redirect
    if (isAuthenticated && user?.role !== 'admin') {
      navigate('/not-authorized');
      return;
    }
    
    // Load team members (mock data for now)
    setMembers(mockTeamMembers);
    
    // In a real implementation, fetch members from API
    // Example:
    // const fetchTeamMembers = async () => {
    //   try {
    //     const response = await fetch('/api/team-members');
    //     const data = await response.json();
    //     setMembers(data);
    //   } catch (error) {
    //     console.error('Error fetching team members:', error);
    //   }
    // };
    // fetchTeamMembers();
  }, [isAuthenticated, user, navigate]);
  
  const handleInviteUser = (data: { email: string, role: UserRole }) => {
    // Generate invite token
    const token = generateRandomId();
    const inviteUrl = `${window.location.origin}/invite/${token}`;
    
    // In a real implementation, save invitation to database and send email
    console.log('Inviting user:', data.email, 'with role:', data.role);
    console.log('Invite URL:', inviteUrl);
    
    // Set the invite link for copying
    setInviteLink(inviteUrl);
    
    toast({
      title: "Einladung erstellt",
      description: `Einladung an ${data.email} wurde erstellt.`,
    });
    
    setIsInviteDialogOpen(false);
  };
  
  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setIsCopied(true);
    
    toast({
      title: "Link kopiert",
      description: "Der Einladungslink wurde in die Zwischenablage kopiert.",
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const handleChangeRole = (memberId: string, newRole: UserRole) => {
    // Update user role
    setMembers(members.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ));
    
    toast({
      title: "Rolle geändert",
      description: `Die Rolle wurde erfolgreich aktualisiert.`,
    });
    
    setIsRoleDialogOpen(false);
    setSelectedMember(null);
  };
  
  const handleRemoveUser = (memberId: string) => {
    // Remove user from team
    setMembers(members.filter(member => member.id !== memberId));
    
    toast({
      title: "Benutzer entfernt",
      description: `Der Benutzer wurde erfolgreich aus dem Team entfernt.`,
    });
    
    setIsRemoveDialogOpen(false);
    setSelectedMember(null);
  };
  
  const getRoleBadgeClass = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-400';
      case 'hr':
        return 'bg-blue-500/20 text-blue-400';
      case 'viewer':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'hr':
        return 'HR Manager';
      case 'viewer':
        return 'Betrachter';
      default:
        return role;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Teammitglieder</h1>
            <p className="text-muted-foreground">
              Verwalten Sie Benutzer und Rollen in Ihrem Unternehmen
            </p>
          </div>
          
          <Button 
            onClick={() => setIsInviteDialogOpen(true)}
            className="bg-gradient-to-r from-[var(--company-primary)] to-[var(--company-accent)]"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Nutzer einladen
          </Button>
        </div>
        
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="members">Aktive Mitglieder</TabsTrigger>
            <TabsTrigger value="invitations">Offene Einladungen</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members">
            {members.length === 0 ? (
              <div className="bg-card border border-border rounded-md p-8 text-center">
                <UserPlus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Noch keine Teammitglieder</h3>
                <p className="text-muted-foreground mb-6">
                  Lade Kollegen ein, um gemeinsam im TactFlux-Dashboard zu arbeiten.
                </p>
                <Button 
                  onClick={() => setIsInviteDialogOpen(true)}
                  className="bg-gradient-to-r from-[var(--company-primary)] to-[var(--company-accent)]"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Nutzer einladen
                </Button>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name / E-Mail</TableHead>
                      <TableHead>Rolle</TableHead>
                      <TableHead>Beitrittsdatum</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">{member.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeClass(member.role)}`}>
                            {getRoleLabel(member.role)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {format(member.joinedAt, 'PPP', { locale: de })}
                        </TableCell>
                        <TableCell className="text-right">
                          {member.id !== user?.id && (
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedMember(member);
                                  setIsRoleDialogOpen(true);
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <span className="sr-only">Rolle ändern</span>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedMember(member);
                                  setIsRemoveDialogOpen(true);
                                }}
                                className="h-8 w-8 p-0 text-destructive border-destructive hover:bg-destructive/10"
                              >
                                <span className="sr-only">Nutzer entfernen</span>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                          {member.id === user?.id && (
                            <span className="text-xs text-muted-foreground">
                              Das sind Sie
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="invitations">
            {invitations.length === 0 ? (
              <div className="bg-card border border-border rounded-md p-8 text-center">
                <Mail className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Keine offenen Einladungen</h3>
                <p className="text-muted-foreground mb-6">
                  Alle versendeten Einladungen wurden bereits angenommen oder sind abgelaufen.
                </p>
                <Button 
                  onClick={() => setIsInviteDialogOpen(true)}
                  className="bg-gradient-to-r from-[var(--company-primary)] to-[var(--company-accent)]"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Nutzer einladen
                </Button>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>E-Mail</TableHead>
                      <TableHead>Rolle</TableHead>
                      <TableHead>Erstellt am</TableHead>
                      <TableHead>Läuft ab</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Invitation rows would go here */}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {inviteLink && (
          <div className="mt-4 p-4 bg-card border border-border rounded-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-medium flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Einladungslink
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Teilen Sie diesen Link mit dem eingeladenen Benutzer
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-initial"
                  onClick={handleCopyInviteLink}
                >
                  {isCopied ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Kopiert
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Link kopieren
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-2 p-2 bg-background rounded text-xs font-mono truncate">
              {inviteLink}
            </div>
          </div>
        )}
      </div>
      
      <TeamInviteDialog 
        open={isInviteDialogOpen} 
        onOpenChange={setIsInviteDialogOpen}
        onInvite={handleInviteUser}
      />
      
      {selectedMember && (
        <>
          <RoleChangeDialog 
            open={isRoleDialogOpen}
            onOpenChange={setIsRoleDialogOpen}
            member={selectedMember}
            onChangeRole={handleChangeRole}
          />
          
          <RemoveUserDialog 
            open={isRemoveDialogOpen}
            onOpenChange={setIsRemoveDialogOpen}
            member={selectedMember}
            onRemove={handleRemoveUser}
          />
        </>
      )}
    </Layout>
  );
};

export default TeamPage;
