"use server";

import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/content/site";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address."),
  message: z.string().trim().min(10, "Message should be at least 10 characters.").max(5000),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof contactSchema>, string[]>>;
  fields?: Record<string, string>;
};

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field.
  if (formData.get("company")) return { status: "success", message: "Thanks! Your message has been sent." };

  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", errors: z.flattenError(parsed.error).fieldErrors, fields: raw };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.");
    return { status: "error", message: "The contact form isn't available right now.", fields: raw };
  }

  const { name, email, message } = parsed.data;
  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? `${site.name} Portfolio <onboarding@resend.dev>`,
    to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return { status: "error", message: "Something went wrong sending your message. Please try again.", fields: raw };
  }
  return { status: "success", message: "Thanks! Your message has been sent - I'll get back to you soon." };
}
