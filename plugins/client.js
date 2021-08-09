import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  "https://your-app-id.supabase.co",
  "your-public-key"
)

export default (_, inject) => {
  inject('supabase', supabase)
}