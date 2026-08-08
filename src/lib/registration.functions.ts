import { createServerFn } from "@tanstack/react-start";

import { registrationSchema, type RegistrationInput } from "./registration-schema";

/**
 * Public registration endpoint.
 * Validates input server-side, writes the row with the service-role client
 * (the table is admin/judge-only for reads) and returns the generated
 * registration ID produced by the database trigger.
 */
export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: RegistrationInput) => {
    // Server-side validation mirrors the client rules; surface a readable message.
    const parsed = registrationSchema.safeParse(data);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      throw new Error(first ? `${first.path.join(".")}: ${first.message}` : "Invalid registration details.");
    }
    return parsed.data;
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Reject duplicate email registrations early with a friendly message.
    const { data: existing } = await supabaseAdmin
      .from("registrations")
      .select("registration_id")
      .eq("email", data.email.toLowerCase())
      .maybeSingle();

    if (existing) {
      throw new Error(
        `This email is already registered (${existing.registration_id ?? "pending"}).`,
      );
    }


    const { data: row, error } = await supabaseAdmin
      .from("registrations")
      .insert({
        full_name: data.fullName,
        institution: data.institution,
        faculty: data.faculty || null,
        department: data.department || null,
        student_id: data.studentId || null,
        email: data.email.toLowerCase(),
        phone: data.phone,
        category: data.category,
        track: data.track,
        domain: data.domain,
        project_title: data.projectTitle,
        project_abstract: data.projectAbstract,
        participation_type: data.participationType,
        team_name: data.teamName || null,
        team_members: data.participationType === "team" ? data.teamMembers : [],
        abstract_pdf_path: data.abstractPdfPath || null,
        profile_photo_path: data.profilePhotoPath || null,
      })
      .select("registration_id, full_name, email, category, status, created_at")
      .single();

    if (error) {
      // Log details server-side; return a generic message to the browser.
      console.error("registration insert failed", error);
      throw new Error("We couldn't save your registration. Please try again.");
    }

    return row;
  });
