import { z } from "zod";

/** Validation schema shared by the registration form and the server function. */
export const teamMemberSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  role: z.string().trim().max(80).optional().or(z.literal("")),
});

export const registrationSchema = z.object({
  fullName: z.string().trim().min(3, "Please enter your full name").max(120),
  institution: z.string().trim().min(2, "Required").max(160),
  faculty: z.string().trim().max(160).optional().or(z.literal("")),
  department: z.string().trim().max(160).optional().or(z.literal("")),
  studentId: z.string().trim().max(60).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .min(9, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Digits and + - ( ) only"),
  category: z.enum(["school", "undergraduate", "industrial", "open"], {
    message: "Please select a category",
  }),
  track: z.enum(["web-mobile", "iot-robotics"], { message: "Please select a track" }),
  domain: z.enum(["Agriculture", "Education", "Medical", "Industrial", "Others"], {
    message: "Please select a domain",
  }),
  projectTitle: z.string().trim().min(4, "Give your project a title").max(180),
  projectAbstract: z
    .string()
    .trim()
    .min(50, "Please write at least 50 characters")
    .max(2000, "Keep the abstract under 2000 characters"),
  participationType: z.enum(["individual", "team"]),
  teamName: z.string().trim().max(120).optional().or(z.literal("")),
  teamMembers: z.array(teamMemberSchema).max(6).default([]),
  abstractPdfPath: z.string().trim().max(400).optional().or(z.literal("")),
  profilePhotoPath: z.string().trim().max(400).optional().or(z.literal("")),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
