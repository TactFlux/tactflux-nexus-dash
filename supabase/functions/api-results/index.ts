
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// CORS-Headers für den Zugriff von externen Anwendungen
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

// Funktion zum Validieren des API-Keys
async function validateApiKey(apiKey: string, supabase: any) {
  // API-Key aus Header extrahieren (Bearer token)
  const key = apiKey.replace("Bearer ", "")
  
  if (!key) return false
  
  // Suchen des API-Keys in der Datenbank
  const { data, error } = await supabase
    .from('api_keys')
    .select('user_id')
    .eq('api_key', key)
    .single()
  
  if (error || !data) return false
  
  // API-Key letztes Nutzungsdatum aktualisieren
  await supabase
    .from('api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('api_key', key)
  
  // Überprüfen, ob der Benutzer Enterprise-Rolle hat
  const { data: roleData, error: roleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', data.user_id)
    .eq('role', 'enterprise')
    .single()
  
  return !roleError && roleData ? true : false
}

serve(async (req) => {
  // CORS-Preflight-Anfragen behandeln
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  try {
    // Nur GET-Anfragen erlauben
    if (req.method !== 'GET') {
      return new Response(
        JSON.stringify({ error: 'Nur GET-Anfragen sind erlaubt' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // API-Key aus Header extrahieren
    const authHeader = req.headers.get('authorization')
    
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'API-Key erforderlich (Authorization: Bearer API_KEY)' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Supabase-Client erstellen
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // API-Key validieren
    const isValidApiKey = await validateApiKey(authHeader, supabase)
    
    if (!isValidApiKey) {
      return new Response(
        JSON.stringify({ error: 'Ungültiger API-Key oder fehlende Enterprise-Berechtigung' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Query-Parameter für Filterung extrahieren
    const url = new URL(req.url)
    const fromDate = url.searchParams.get('from')
    const toDate = url.searchParams.get('to')
    const limit = parseInt(url.searchParams.get('limit') || '100')
    
    // Abfrage vorbereiten
    let query = supabase
      .from('candidate_results')
      .select(`
        id,
        candidate_name,
        role,
        total_score,
        module_scores,
        created_at
      `)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    // Filter hinzufügen, wenn vorhanden
    if (fromDate) {
      query = query.gte('created_at', fromDate)
    }
    
    if (toDate) {
      query = query.lte('created_at', toDate)
    }
    
    // Daten abrufen
    const { data, error } = await query
    
    if (error) {
      throw error
    }
    
    // Erfolgreiche Antwort
    return new Response(
      JSON.stringify({
        success: true,
        results: data || []
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('API-Fehler:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Interner Serverfehler', 
        details: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
