
export type UserRole = 'admin' | 'hr' | 'viewer';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinedAt: Date;
}

export interface InvitationData {
  email: string;
  role: UserRole;
}
