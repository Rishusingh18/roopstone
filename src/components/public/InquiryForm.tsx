"use client";

import { FormEvent, useMemo, useState } from "react";
import type { LeadSource } from "@/lib/public-data";

type FormVariant = "consultation" | "quote" | "contact";

interface InquiryFormProps {
  variant: FormVariant;
  source: LeadSource;
  title?: string;
  intro?: string;
  product?: string;
  includeProduct?: boolean;
  includeDate?: boolean;
}

const testIdByVariant: Record<FormVariant, string> = {
  consultation: "contact-form-consultation",
  quote: "contact-form-quote",
  contact: "contact-form-contact",
};

export default function InquiryForm({
  variant,
  source,
  title = "Begin Your Story",
  intro = "Share your vision. Our consultants will guide you from sketch to sanctum.",
  product = "",
  includeProduct = false,
  includeDate = false,
}: InquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const submitLabel = useMemo(() => {
    if (status === "loading") return "Sending...";
    if (variant === "contact") return "Send Message";
    if (variant === "quote") return "Request Quote";
    return "Submit Enquiry";
  }, [status, variant]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const context = [
      includeProduct ? `Product: ${form.get("product") || product}` : "",
      includeDate ? `Preferred date: ${form.get("date") || "Not specified"}` : "",
      form.get("message") ? `Message: ${form.get("message")}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          city: form.get("city"),
          message: context || undefined,
          source,
        }),
      });

      if (!response.ok) throw new Error("Lead submission failed");

      setStatus("success");
      setMessage("Thank you. Our heritage specialists will reach out shortly.");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("We could not send this right now. Please use WhatsApp or try again.");
    }
  }

  return (
    <div
      data-testid={testIdByVariant[variant]}
      className="motif-corner"
      style={{
        position: "relative",
        padding: "3.5rem",
        borderRadius: 24,
        background: "var(--color-surface-lowest)",
        boxShadow: "0 30px 80px rgba(30, 28, 18, 0.06)",
      }}
    >
      <p className="brand-subtitle" style={{ color: "var(--color-royal)", marginBottom: "0.6rem" }}>
        Bespoke Enquiry
      </p>
      <h3 style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>{title}</h3>
      <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: "2rem" }}>{intro}</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
        <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.6rem" }}>
          <div className="field">
            <label>Your Name</label>
            <input data-testid="form-name" required placeholder="Full name" name="name" />
          </div>
          <div className="field">
            <label>Phone</label>
            <input data-testid="form-phone" required placeholder="+91" name="phone" />
          </div>
        </div>
        <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.6rem" }}>
          <div className="field">
            <label>Email</label>
            <input data-testid="form-email" type="email" placeholder="you@mail.com" name="email" />
          </div>
          <div className="field">
            <label>City</label>
            <input data-testid="form-city" placeholder="Your city" name="city" />
          </div>
        </div>
        {(includeProduct || includeDate) && (
          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.6rem" }}>
            {includeProduct && (
              <div className="field">
                <label>Product</label>
                <input data-testid="form-product" defaultValue={product} placeholder="Mandir, IRA, Jaali..." name="product" />
              </div>
            )}
            {includeDate && (
              <div className="field">
                <label>Preferred Date</label>
                <input data-testid="form-date" type="date" name="date" />
              </div>
            )}
          </div>
        )}
        <div className="field">
          <label>Message</label>
          <textarea data-testid="form-message" name="message" placeholder="Tell us about your space or vision" />
        </div>
        <button data-testid="form-submit" type="submit" className="btn-primary" style={{ alignSelf: "flex-start", marginTop: "0.6rem" }}>
          {submitLabel}
          <span className="arrow">→</span>
        </button>
        {message && (
          <p style={{ color: status === "error" ? "var(--color-royal)" : "var(--color-jade)", lineHeight: 1.5 }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
