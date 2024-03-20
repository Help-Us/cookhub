import React from "react";

// import { supabase } from "@/app/api/supabase";
import { createClient } from "./supabase/server";

const supabaseAdmin = createClient();
const filterData = async (searchKeyword: string | null) => {
  let { data: cookrcp, error } = await supabaseAdmin
    .from("cookrcp")
    .select("*")
    .like("RCP_NAME", `%${searchKeyword}%`);

  return cookrcp;
};

export default filterData;
