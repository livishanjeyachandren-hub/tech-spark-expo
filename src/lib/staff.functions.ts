import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

/** Returns the roles assigned to the signed-in user. */
export const getMyRoles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return data.map((r) => r.role as "admin" | "judge");
  });

/** All registrations — visible to admins and judges through RLS. */
export const listRegistrations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const setRegistrationStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status: "pending" | "approved" | "rejected" }) =>
    z
      .object({ id: z.string().uuid(), status: z.enum(["pending", "approved", "rejected"]) })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("registrations")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteRegistration = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("registrations").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Marks attendance for a scanned registration ID, refusing duplicate check-ins. */
export const checkInParticipant = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { registrationId: string }) =>
    z.object({ registrationId: z.string().trim().min(4).max(40) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("registrations")
      .select("id, full_name, email, category, track, project_title, status, checked_in_at")
      .eq("registration_id", data.registrationId.toUpperCase())
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!row) return { found: false as const };

    if (row.checked_in_at) {
      return { found: true as const, duplicate: true as const, participant: row };
    }

    const checkedInAt = new Date().toISOString();
    const { error: updateError } = await context.supabase
      .from("registrations")
      .update({ checked_in_at: checkedInAt })
      .eq("id", row.id);
    if (updateError) throw new Error(updateError.message);

    return {
      found: true as const,
      duplicate: false as const,
      participant: { ...row, checked_in_at: checkedInAt },
    };
  });

/** Scores submitted by the signed-in judge. */
export const listMyScores = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("scores")
      .select("*")
      .eq("judge_id", context.userId);
    if (error) throw new Error(error.message);
    return data;
  });

/** All scores — used for the leaderboard. */
export const listAllScores = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("scores")
      .select("registration_id, innovation, technical, impact, presentation");
    if (error) throw new Error(error.message);
    return data;
  });

export const saveScore = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      registrationId: string;
      innovation: number;
      technical: number;
      impact: number;
      presentation: number;
      comments: string;
    }) =>
      z
        .object({
          registrationId: z.string().uuid(),
          innovation: z.number().int().min(0).max(25),
          technical: z.number().int().min(0).max(25),
          impact: z.number().int().min(0).max(25),
          presentation: z.number().int().min(0).max(25),
          comments: z.string().trim().max(1000),
        })
        .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("scores").upsert(
      {
        registration_id: data.registrationId,
        judge_id: context.userId,
        innovation: data.innovation,
        technical: data.technical,
        impact: data.impact,
        presentation: data.presentation,
        comments: data.comments || null,
      },
      { onConflict: "registration_id,judge_id" },
    );
    if (error) throw new Error(error.message);
    return { ok: true };
  });
