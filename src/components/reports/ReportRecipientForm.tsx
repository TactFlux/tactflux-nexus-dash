
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import PlanFeature from '@/components/tier/PlanFeature';

const formSchema = z.object({
  email: z.string().email('Gültige E-Mail-Adresse erforderlich'),
  company_name: z.string().optional(),
});

type ReportRecipientFormValues = z.infer<typeof formSchema>;

const ReportRecipientForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<ReportRecipientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      company_name: '',
    },
  });

  const onSubmit = async (data: ReportRecipientFormValues) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Sie müssen angemeldet sein, um Empfänger hinzuzufügen.",
      });
      return;
    }
    
    try {
      const { error } = await supabase.from('report_recipients').insert({
        email: data.email,
        company_name: data.company_name || null,
        active: true,
        user_id: user.id,
        company_id: user.companyId
      });

      if (error) throw error;

      toast({
        title: "Empfänger hinzugefügt",
        description: `${data.email} wurde zur Empfängerliste hinzugefügt.`,
      });

      form.reset();
      onSuccess();
    } catch (error) {
      console.error('Error adding recipient:', error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Der Empfänger konnte nicht hinzugefügt werden.",
      });
    }
  };

  return (
    <PlanFeature requiredPlan="enterprise">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input placeholder="beispiel@firma.de" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firmenname (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Firma GmbH" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4">
            Hinzufügen
          </Button>
        </form>
      </Form>
    </PlanFeature>
  );
};

export default ReportRecipientForm;
