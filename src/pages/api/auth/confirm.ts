import { type EmailOtpType } from "@supabase/supabase-js";
import { createServerClient, type CookieOptions, serializeCookieHeader } from "@supabase/ssr";

import { SUPABASE_API_KEY, SUPABASE_PROJECT_URL } from "@/utils/constant";
import { NextApiRequest, NextApiResponse } from "next";

export function createSSRClient(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerClient(SUPABASE_PROJECT_URL!, SUPABASE_API_KEY!, {
    cookies: {
      getAll() {
        return Object.keys(req.cookies).map((name) => ({ name, value: req.cookies[name] || "" }));
      },
      setAll(cookiesToSet) {
        res.setHeader(
          "Set-Cookie",
          cookiesToSet.map(({ name, value, options }) => serializeCookieHeader(name, value, options)),
        );
      },
    },
  });

  return supabase;
}

function stringOrFirstString(item: string | string[] | undefined) {
  return Array.isArray(item) ? item[0] : item;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).appendHeader("Allow", "GET").end();
    return;
  }

  const queryParams = req.query;
  const token_hash = stringOrFirstString(queryParams.token_hash);
  const type = stringOrFirstString(queryParams.type);

  let next = "/error";

  if (token_hash && type) {
    const supabase = createSSRClient(req, res);
    const { error } = await supabase.auth.verifyOtp({
      type: type as EmailOtpType,
      token_hash,
    });
    if (error) {
      console.error(error);
    } else {
      next = stringOrFirstString(queryParams.next) || "/";
    }
  }

  res.redirect(next);
}