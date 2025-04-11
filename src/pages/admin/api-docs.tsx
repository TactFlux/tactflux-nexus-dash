
import React from 'react';
import { useUserTier } from '@/contexts/UserTierContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { Copy, FileJson, ArrowLeft, Book, CodeSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import EnterpriseFeature from '@/components/tier/EnterpriseFeature';

const CodeBlock = ({ children, onCopy }: { children: string, onCopy?: () => void }) => {
  return (
    <div className="relative">
      <pre className="font-mono text-sm bg-muted p-4 rounded-md overflow-x-auto">
        <code>{children}</code>
      </pre>
      {onCopy && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-2 right-2 h-7 opacity-50 hover:opacity-100"
          onClick={onCopy}
        >
          <Copy className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
};

const ApiDocsPage = () => {
  const { isEnterprise, isLoading } = useUserTier();
  const navigate = useNavigate();
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Kopiert!',
      description: 'Code in die Zwischenablage kopiert.',
    });
  };

  const curlExample = `curl -X GET "https://qcszoetnsqmrcdankful.supabase.co/functions/v1/api-results?from=2024-01-01" \\
  -H "Authorization: Bearer dein_api_key"`;

  const pythonExample = `import requests

url = "https://qcszoetnsqmrcdankful.supabase.co/functions/v1/api-results"
headers = {"Authorization": "Bearer dein_api_key"}
params = {"from": "2024-01-01", "limit": 50}

response = requests.get(url, headers=headers, params=params)
data = response.json()

# Ergebnisse verarbeiten
for result in data["results"]:
    print(f"Kandidat: {result['candidate_name']}, Score: {result['total_score']}")`;

  const javascriptExample = `// Mit fetch API
const fetchResults = async () => {
  const response = await fetch(
    'https://qcszoetnsqmrcdankful.supabase.co/functions/v1/api-results?from=2024-01-01&limit=50', 
    {
      headers: {
        'Authorization': 'Bearer dein_api_key'
      }
    }
  );
  
  const data = await response.json();
  
  if (data.results) {
    // Ergebnisse verarbeiten
    data.results.forEach(result => {
      console.log(\`Kandidat: \${result.candidate_name}, Score: \${result.total_score}\`);
    });
  }
}

fetchResults();`;

  const jsonResponseExample = `{
  "success": true,
  "results": [
    {
      "id": "3b5a03c2-4e3b-4b8f-a2f3-1b4d9c52e7a8",
      "candidate_name": "Marta Schmidt",
      "role": "UX Designer",
      "total_score": 87,
      "module_scores": {
        "problem_solving": 91,
        "creativity": 86,
        "collaboration": 84
      },
      "created_at": "2024-03-15T10:23:45.123Z"
    },
    {
      "id": "7d2c1f3a-9e8b-4d7c-a2b1-6f5e8d3c9a2b",
      "candidate_name": "Thomas Weber",
      "role": "Frontend Developer",
      "total_score": 92,
      "module_scores": {
        "problem_solving": 94,
        "creativity": 89,
        "collaboration": 93
      },
      "created_at": "2024-03-10T14:12:33.456Z"
    }
  ]
}`;

  return (
    <Layout>
      <EnterpriseFeature>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/admin/api-keys')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zurück zur API-Key Verwaltung
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">API-Dokumentation</h1>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="mr-2 h-5 w-5" /> Übersicht
              </CardTitle>
              <CardDescription>
                Die TactFlux API ermöglicht Enterprise-Kunden den programmatischen Zugriff auf Kandidaten-Daten und Testergebnisse.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Mit der TactFlux API kannst du Kandidatendaten und Testergebnisse in deine eigenen Systeme integrieren.
                Um die API nutzen zu können, benötigst du einen API-Key, den du im 
                <Button variant="link" className="px-1 h-auto" onClick={() => navigate('/admin/api-keys')}>
                  API-Key Verwaltungsbereich
                </Button>
                erstellen kannst.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Authentifizierung</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Alle API-Anfragen erfordern einen API-Key, der im Authorization-Header übergeben wird:
                    </p>
                    <CodeBlock onCopy={() => copyToClipboard('Authorization: Bearer dein_api_key')}>
                      Authorization: Bearer dein_api_key
                    </CodeBlock>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Basis-URL</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Alle API-Endpunkte verwenden diese Basis-URL:
                    </p>
                    <CodeBlock onCopy={() => copyToClipboard('https://qcszoetnsqmrcdankful.supabase.co/functions/v1')}>
                      https://qcszoetnsqmrcdankful.supabase.co/functions/v1
                    </CodeBlock>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileJson className="mr-2 h-5 w-5" /> Endpunkte
              </CardTitle>
              <CardDescription>
                Verfügbare API-Endpunkte und deren Parameter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">GET /api-results</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Gibt eine Liste von Kandidaten-Testergebnissen zurück.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Query-Parameter</h4>
                    <div className="bg-muted rounded-md p-4">
                      <ul className="space-y-2 text-sm">
                        <li><span className="font-mono">from</span> - <span className="text-muted-foreground">Optional. Filter für Ergebnisse ab diesem Datum (Format: YYYY-MM-DD)</span></li>
                        <li><span className="font-mono">to</span> - <span className="text-muted-foreground">Optional. Filter für Ergebnisse bis zu diesem Datum (Format: YYYY-MM-DD)</span></li>
                        <li><span className="font-mono">limit</span> - <span className="text-muted-foreground">Optional. Maximale Anzahl der zurückgegebenen Datensätze (Standard: 100)</span></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Antwort</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Bei Erfolg gibt der Endpunkt einen 200 Status-Code und ein JSON-Objekt zurück:
                    </p>
                    <CodeBlock onCopy={() => copyToClipboard(jsonResponseExample)}>
                      {jsonResponseExample}
                    </CodeBlock>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CodeSquare className="mr-2 h-5 w-5" /> Code-Beispiele
              </CardTitle>
              <CardDescription>
                Beispiele für die Verwendung der API in verschiedenen Programmiersprachen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="curl">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                </TabsList>
                
                <TabsContent value="curl">
                  <CodeBlock onCopy={() => copyToClipboard(curlExample)}>
                    {curlExample}
                  </CodeBlock>
                </TabsContent>
                
                <TabsContent value="python">
                  <CodeBlock onCopy={() => copyToClipboard(pythonExample)}>
                    {pythonExample}
                  </CodeBlock>
                </TabsContent>
                
                <TabsContent value="javascript">
                  <CodeBlock onCopy={() => copyToClipboard(javascriptExample)}>
                    {javascriptExample}
                  </CodeBlock>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fehlerbehandlung</CardTitle>
              <CardDescription>
                Mögliche Fehlerreaktionen und deren Bedeutung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-medium mb-1">401 Unauthorized</p>
                    <p className="text-sm text-muted-foreground">
                      Fehlender oder ungültiger API-Key, oder der Benutzer hat keine Enterprise-Berechtigung.
                    </p>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-medium mb-1">400 Bad Request</p>
                    <p className="text-sm text-muted-foreground">
                      Fehlerhafte Anfrageparameter oder ungültiges Datumsformat.
                    </p>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-medium mb-1">500 Internal Server Error</p>
                    <p className="text-sm text-muted-foreground">
                      Ein Serverfehler ist aufgetreten. Bitte kontaktiere den Support, wenn das Problem bestehen bleibt.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </EnterpriseFeature>
    </Layout>
  );
};

export default ApiDocsPage;
