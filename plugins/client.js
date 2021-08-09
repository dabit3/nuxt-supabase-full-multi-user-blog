import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  "your-supabase-api-url",
  "your-supabase-public-api-key"
)

export default (_, inject) => {
  inject('supabase', supabase)
}