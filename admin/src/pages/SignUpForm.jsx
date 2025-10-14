import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "../hook/usePost";

// ✅ Zod schema for validation
const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long")
    .trim(),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (val) => /[0-9]/.test(val) && /[A-Za-z]/.test(val),
      "Password must contain at least one letter and one number"
    ),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long")
    .refine((val) => /^[0-9]+$/.test(val), "Phone must contain only digits"),
  cnic: z.string().refine(
    (val) =>
      /^\d{13}$/.test(val) || /^\d{5}-\d{7}-\d{1}$/.test(val),
    "CNIC must be 13 digits or formatted like 12345-1234567-1"
  ),
});

function SignUpForm() {


   const {postData,data,error,loading} = usePost('http://localhost:7000/admin-user/sign-up');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      cnic: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("✅ Valid form data:", data);
    await postData(data);
  };

  const inputClass = (fieldError) =>
    `form-control ${fieldError ? "is-invalid" : ""}`;

  return (
    <div className="container py-4" style={{ maxWidth: 640 }}>
      <h3 className="mb-3">Sign Up</h3>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your full name"
            className={inputClass(errors.name)}
            {...register("name")}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={inputClass(errors.email)}
            {...register("email")}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              className={inputClass(errors.password)}
              {...register("password")}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword((s) => !s)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <div className="invalid-feedback d-block">
              {errors.password.message}
            </div>
          )}
          <div className="form-text">
            Use at least 8 characters, include letters & numbers.
          </div>
        </div>

        {/* Phone (Simple Digits Only) */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            className={inputClass(errors.phone)}
            {...register("phone")}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone.message}</div>
          )}
        </div>

        {/* CNIC */}
        <div className="mb-4">
          <label htmlFor="cnic" className="form-label">
            CNIC
          </label>
          <input
            id="cnic"
            type="text"
            placeholder="12345-1234567-1 or 1312312345671"
            className={inputClass(errors.cnic)}
            {...register("cnic")}
          />
          {errors.cnic && (
            <div className="invalid-feedback">{errors.cnic.message}</div>
          )}
          <div className="form-text">
            Enter 13 digits or formatted like 12345-1234567-1
          </div>
        </div>

        {/* Submit Button */}
        <div className="d-grid">
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
