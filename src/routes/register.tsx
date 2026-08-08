import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import QRCode from "qrcode";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Download, Loader2, Plus, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/site/site-layout";
import { Reveal } from "@/components/site/reveal";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, EVENT, TRACKS } from "@/lib/event-data";
import { registrationSchema, type RegistrationInput } from "@/lib/registration-schema";
import { submitRegistration } from "@/lib/registration.functions";

const TITLE = "Register | Tech Talent Expo 2026";
const DESCRIPTION =
  "Register your project for Tech Talent Expo 2026 at the University of Vavuniya. Get a unique registration ID and QR check-in pass instantly.";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: RegisterPage,
});

const DOMAINS = ["Agriculture", "Education", "Medical", "Industrial", "Others"] as const;

type Receipt = {
  registration_id: string | null;
  full_name: string;
  email: string;
  category: string;
  status: string;
  created_at: string;
  projectTitle: string;
  qr: string;
};

/** Uploads a file to the private registration bucket and returns its object path. */
async function uploadFile(file: File, folder: string) {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("registration-files").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  return path;
}

function RegisterPage() {
  const submit = useServerFn(submitRegistration);
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [abstractFile, setAbstractFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const form = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema) as never,
    defaultValues: {
      fullName: "",
      institution: "",
      faculty: "",
      department: "",
      studentId: "",
      email: "",
      phone: "",
      category: "undergraduate",
      track: "web-mobile",
      domain: "Agriculture",
      projectTitle: "",
      projectAbstract: "",
      participationType: "individual",
      teamName: "",
      teamMembers: [],
      abstractPdfPath: "",
      profilePhotoPath: "",
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: "teamMembers" });
  const participationType = form.watch("participationType");
  const category = form.watch("category");
  const maxMembers = CATEGORIES.find((c) => c.id === category)?.maxMembers ?? 4;

  async function onSubmit(values: RegistrationInput) {
    setBusy(true);
    try {
      // Optional attachments are uploaded first so their paths persist with the row.
      if (abstractFile) {
        values.abstractPdfPath = await uploadFile(abstractFile, "abstracts");
      }
      if (photoFile) {
        values.profilePhotoPath = await uploadFile(photoFile, "photos");
      }

      const row = await submit({ data: values });

      // QR payload agreed with the check-in/email pipeline.
      let qr = "";
      try {
        qr = await QRCode.toDataURL(
          JSON.stringify({
            fullname: values.fullName,
            email: values.email,
            phone_number: values.phone,
            category: values.category,
            track: values.track,
            domain: values.domain,
            project_title: values.projectTitle,
          }),
          { width: 512, margin: 1, color: { dark: "#0b0616", light: "#ffffff" } },
        );
      } catch {
        // Registration already saved — never fail the flow on QR rendering.
        toast.warning("Registration saved, but the QR code could not be generated.");
      }

      setReceipt({ ...row, projectTitle: values.projectTitle, qr });
      toast.success(`Registered — ${row.registration_id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      // Only surface safe, user-friendly messages — never raw server errors.
      const message =
        err instanceof Error && err.message && err.message.length < 200
          ? err.message
          : "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }

  if (receipt) return <ReceiptView receipt={receipt} />;

  return (
    <>
      <PageHeader
        eyebrow="Registration"
        title="Enter your project"
        description={`Registrations close on ${EVENT.registrationDeadline}. You will receive a unique registration ID and QR check-in pass as soon as you submit.`}
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal>
          <form onSubmit={form.handleSubmit(onSubmit as never)} className="glass rounded-3xl p-7 sm:p-10">
            <FormSection title="Personal details" step="01">
              <Field label="Full name" error={form.formState.errors.fullName?.message}>
                <Input {...form.register("fullName")} placeholder="Your full name" />
              </Field>
              <Field label="Email" error={form.formState.errors.email?.message}>
                <Input type="email" {...form.register("email")} placeholder="you@example.com" />
              </Field>
              <Field label="Phone" error={form.formState.errors.phone?.message}>
                <Input {...form.register("phone")} placeholder="+94 7X XXX XXXX" />
              </Field>
              <Field label="Student / Employee ID (optional)">
                <Input {...form.register("studentId")} placeholder="e.g. 2021/TS/001" />
              </Field>
              <Field
                label="University / School / Company"
                error={form.formState.errors.institution?.message}
              >
                <Input {...form.register("institution")} placeholder="University of Vavuniya" />
              </Field>
              <Field label="Faculty (optional)">
                <Input {...form.register("faculty")} placeholder="Faculty of Technological Studies" />
              </Field>
              <Field label="Department (optional)">
                <Input {...form.register("department")} placeholder="Information Technology" />
              </Field>
            </FormSection>

            <FormSection title="Project details" step="02">
              <Field label="Category" error={form.formState.errors.category?.message}>
                <Select
                  value={form.watch("category")}
                  onValueChange={(v) =>
                    form.setValue("category", v as RegistrationInput["category"])
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Track" error={form.formState.errors.track?.message}>
                <Select
                  value={form.watch("track")}
                  onValueChange={(v) => form.setValue("track", v as RegistrationInput["track"])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TRACKS.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Domain">
                <Select
                  value={form.watch("domain")}
                  onValueChange={(v) => form.setValue("domain", v as RegistrationInput["domain"])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DOMAINS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Project title" error={form.formState.errors.projectTitle?.message}>
                <Input {...form.register("projectTitle")} placeholder="Name of your project" />
              </Field>
              <Field
                label="Abstract"
                full
                error={form.formState.errors.projectAbstract?.message}
                hint="50–2000 characters describing the problem, your solution and its impact."
              >
                <Textarea rows={6} {...form.register("projectAbstract")} />
              </Field>
            </FormSection>

            <FormSection title="Team" step="03">
              <Field label="Participation type">
                <Select
                  value={participationType}
                  onValueChange={(v) =>
                    form.setValue("participationType", v as RegistrationInput["participationType"])
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {participationType === "team" ? (
                <>
                  <Field label="Team name">
                    <Input {...form.register("teamName")} placeholder="Your team name" />
                  </Field>
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <Label>Team members (max {maxMembers} including you)</Label>
                      <Button
                        type="button"
                        variant="glass"
                        size="sm"
                        disabled={fields.length >= maxMembers - 1}
                        onClick={() => append({ name: "", role: "" })}
                      >
                        <Plus className="size-4" /> Add
                      </Button>
                    </div>
                    <div className="mt-3 space-y-3">
                      {fields.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Add your co-members — you are counted automatically.
                        </p>
                      ) : null}
                      {fields.map((f, i) => (
                        <div key={f.id} className="flex gap-2">
                          <Input
                            {...form.register(`teamMembers.${i}.name`)}
                            placeholder="Member name"
                          />
                          <Input
                            {...form.register(`teamMembers.${i}.role`)}
                            placeholder="Role (optional)"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(i)}
                            aria-label="Remove member"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </FormSection>

            <FormSection title="Attachments" step="04">
              <FileField
                id="abstract-pdf"
                label="Abstract PDF (optional)"
                accept="application/pdf"
                file={abstractFile}
                onFile={setAbstractFile}
              />
              <FileField
                id="profile-photo"
                label="Profile photo (optional)"
                accept="image/*"
                file={photoFile}
                onFile={setPhotoFile}
              />
            </FormSection>

            <Button type="submit" variant="hero" size="lg" className="mt-8 w-full" disabled={busy}>
              {busy ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Submitting…
                </>
              ) : (
                "Complete registration"
              )}
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              By registering you agree to present your project at {EVENT.venue} on {EVENT.dates}.
            </p>
          </form>
        </Reveal>
      </section>
    </>
  );
}

function FormSection({
  title,
  step,
  children,
}: {
  title: string;
  step: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="mt-10 first:mt-0">
      <legend className="mb-5 flex items-center gap-3">
        <span className="font-display text-xs tracking-[0.3em] text-primary-glow">{step}</span>
        <span className="text-lg font-semibold">{title}</span>
      </legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  error,
  hint,
  full,
  children,
}: {
  label: string;
  error?: string | undefined;
  hint?: string | undefined;
  full?: boolean | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-2 ${full ? "sm:col-span-2" : ""}`}>
      <Label>{label}</Label>
      {children}
      {hint && !error ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function FileField({
  id,
  label,
  accept,
  file,
  onFile,
}: {
  id: string;
  label: string;
  accept: string;
  file: File | null;
  onFile: (f: File | null) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-4 py-4 text-sm text-muted-foreground transition-colors hover:border-primary/70 hover:bg-primary/10"
      >
        <UploadCloud className="size-5 shrink-0 text-primary-glow" />
        <span className="truncate">{file ? file.name : "Choose a file"}</span>
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

function ReceiptView({ receipt }: { receipt: Receipt }) {
  return (
    <>
      <PageHeader
        eyebrow="Confirmed"
        title="You're registered"
        description="Save or print this receipt. Show the QR code at the registration desk for instant check-in."
      />
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <Reveal>
          <div id="receipt" className="glass rounded-3xl p-8 text-center sm:p-10">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-primary-glow">
              {EVENT.name}
            </p>
            <p className="mt-4 font-display text-3xl font-bold text-gradient">
              {receipt.registration_id}
            </p>

            <img
              src={receipt.qr}
              alt={`QR check-in code for ${receipt.registration_id}`}
              width={220}
              height={220}
              className="mx-auto mt-6 size-52 rounded-xl bg-white p-3"
            />

            <dl className="mt-8 space-y-3 text-left text-sm">
              <Row label="Name" value={receipt.full_name} />
              <Row label="Email" value={receipt.email} />
              <Row label="Project" value={receipt.projectTitle} />
              <Row label="Category" value={receipt.category} />
              <Row label="Status" value={receipt.status} />
              <Row label="Venue" value={`${EVENT.venue} · ${EVENT.dates}`} />
            </dl>

            <div className="mt-8 flex flex-wrap justify-center gap-3 print:hidden">
              <Button variant="hero" onClick={() => window.print()}>
                <Download className="size-4" /> Download receipt
              </Button>
              <Button asChild variant="glass">
                <a href={receipt.qr} download={`${receipt.registration_id}-qr.png`}>
                  Save QR code
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/60 pb-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium capitalize">{value}</dd>
    </div>
  );
}
