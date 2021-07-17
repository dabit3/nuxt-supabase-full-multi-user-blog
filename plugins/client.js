import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  "https://aoatspcdpszjrmezfcmo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNjU3MzE4OSwiZXhwIjoxOTQyMTQ5MTg5fQ.qSjoU2qKuX1XcwI1f-_oj2MwmaIIxyktYtK0ld5Y8yk"
)

export default (_, inject) => {
  inject('supabase', supabase)
}