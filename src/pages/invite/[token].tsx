import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LockKeyhole, CheckCircle2, XCircle } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { generateRandomId } from '@/utils/idGenerator';
import { UserRole } from '@/types/team';

const formSchema = z.object({
  password: z.string()
    .min(8, { message: 'Das Passwort muss mindestens 8 Zeichen lang sein' })
    .regex(/[A-Z]/, { message: 'Das Passwort muss mindestens einen Großbuchstaben enthalten' })
    .regex(/[0-9]/, { message: 'Das Passwort muss mindestens eine Zahl enthalten' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Die Passwörter stimmen nicht überein",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

interface InvitationDataType {
  companyName: string;
  email: string;
  role: UserRole;
  valid: boolean;
}

const mockInvitationData: InvitationDataType = {
  companyName: "Beispiel GmbH",
  email: "einladung@beispiel.de",
  role: "hr",
  valid: true,
};

const InvitePage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [invitationData, setInvitationData] = useState<InvitationDataType | null>(null);
  const [isAccepted, setIsAccepted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setInvitationData(mockInvitationData);
      setIsLoading(false);
    }, 1000);
  }, [token]);

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const userId = generateRandomId();
      
      localStorage.setItem('tactflux-admin', JSON.stringify({
        id: userId,
        email: invitationData?.email,
        isAdmin: invitationData?.role === 'admin',
        role: invitationData?.role,
        companyId: 'mock-company-id',
        company: {
          id: 'mock-company-id',
          name: invitationData?.companyName,
          plan: 'pro',
          logoUrl: '/lovable-uploads/79b93f56-97fe-416b-9625-4bf78b87f33f.png',
          primaryColor: '#6E59A5',
          accentColor: '#1EAEDB',
          welcomeMessage: `Willkommen bei ${invitationData?.companyName}!`
        }
      }));
      
      setIsAccepted(true);
      setIsLoading(false);
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 1500);
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

  if (isLoading && !isAccepted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Einladung wird überprüft</CardTitle>
            <CardDescription>Bitte warten Sie, während wir Ihre Einladung überprüfen.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet"></div>
              <p className="mt-4 text-foreground">Lädt...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAccepted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle>Einladung erfolgreich angenommen!</CardTitle>
            <CardDescription>
              Sie werden in wenigen Sekunden zum Dashboard weitergeleitet.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!invitationData?.valid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <XCircle className="h-16 w-16 text-destructive" />
            </div>
            <CardTitle>Ungültige Einladung</CardTitle>
            <CardDescription>
              Diese Einladung ist ungültig oder abgelaufen. Bitte kontaktieren Sie Ihren Administrator.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => navigate('/login')}>
              Zur Anmeldeseite
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Teameinladung annehmen</CardTitle>
          <CardDescription>
            Sie wurden eingeladen, dem Team von <strong>{invitationData?.companyName}</strong> beizutreten.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm text-muted-foreground mb-2">
                Eingeladen als
              </div>
              <div className="font-medium">{invitationData?.email}</div>
              <div className="mt-2 text-sm">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                  {getRoleLabel(invitationData?.role ?? 'viewer')}
                </span>
              </div>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passwort festlegen</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="password"
                          placeholder="Ihr neues Passwort"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passwort bestätigen</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="password"
                          placeholder="Passwort wiederholen"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet"
              >
                Einladung annehmen
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvitePage;
