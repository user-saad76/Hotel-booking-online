import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "../hook/usePost";
import { useAuth } from "../contexts/AuthProvider";
import { Navigate } from "react-router";

// ✅ Zod Schema for Validation
const signupSchema = z
  .object({
    fullname: z.string().min(3, "Full Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    phone: z
      .string()
      .min(10, "Phone must be at least 10 digits")
      .regex(/^\d+$/, "Phone must contain only numbers"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

function SignupForm() {


  const {user,error:userError,loading:userLoading} = useAuth()

   if(userLoading) return <p>Loading...</p>
   if(user && user?.fullname) return <Navigate to ='/'/>


  const {postData, data, error, loading} =  usePost('http://localhost:7000/users/signup')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async(data) => {

    await postData(data)
    console.log("Form Data:", data);
    alert("✅ Signup Successful!");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
                  {...register("fullname")}
                />
                {errors.fullname && (
                  <div className="invalid-feedback">{errors.fullname.message}</div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  {...register("email")}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  {...register("password")}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password.message}</div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label">Repeat Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  {...register("phone")}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone.message}</div>
                )}
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
