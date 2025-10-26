import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";


// ✅ Zod schema for the complaint form
const complaintSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Please provide more details (at least 10 characters)." }),
});

export default function Complain({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(complaintSchema),
    mode: "onTouched",
  });

  // ✅ Handle form submit (with backend API integration)
  const handleFormSubmit = async (data) => {
    try {
      console.log("Complaint submitted:", data);

      // 🔥 Send data to backend (adjust your API URL if needed)
      const res = await fetch("http://localhost:7000/report/complain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("✅ Complaint submitted successfully!");
        reset(); // clear the form
      } else {
        toast.error("❌ Failed to submit complaint: " + result.message);
      }

      // If parent provided custom handler, call it
      if (onSubmit) await onSubmit(data);
    } catch (err) {
      console.error("❌ Error submitting complaint:", err);
      toast.error("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 700 }}>
      <h2 className="mb-3">Hotel Complaint Form</h2>
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your full name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name")}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        {/* Message */}
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Complaint message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Describe your complaint (what happened, when, room/booking ref if any)..."
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            {...register("message")}
          />
          {errors.message && (
            <div className="invalid-feedback">{errors.message.message}</div>
          )}
        </div>

        {/* Buttons */}
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              reset();
              toast.info("Form reset!");
            }}
            disabled={isSubmitting}
          >
            Reset
          </button>
        </div>

        {/* Optional area for global messages */}
        <div className="mt-3" aria-live="polite"></div>
      </form>

      {/* 🔔 Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
