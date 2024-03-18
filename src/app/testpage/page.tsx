import { createClient } from "@/utils/supabase/server";

export default async function TestPage() {
  const supabase = createClient();
  const { data: testData } = await supabase.from("test").select();

  return <pre>{JSON.stringify(testData, null, 2)}</pre>;
}
