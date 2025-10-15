import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate } from "react-router";
import { usePost } from "../hook/usePost";
import { useAuth } from "../contexts/AuthProvider";

// ✅ Define Zod schema
const SignInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
});

function SignInForm() {

  // ✅ fixed destructure (match AuthProvider)
  const { adminUser, error: userError, loading: userLoading } = useAuth();

  if (userLoading) return <p>Loading...</p>;
if (adminUser && adminUser?.name) return <Navigate to="/" />;

  const { postData, data, error, loading } = usePost("http://localhost:7000/admin-user/signin");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    await postData(data);
    window.location.href = "/";
  };

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h4 className="card-title mb-3 text-center">Sign In</h4>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="name@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email.message}</div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label d-flex justify-content-between"
                    >
                      <span>Password</span>
                      <small className="text-muted">Min 8 chars</small>
                    </label>
                    <input
                      id="password"
                      type="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="••••••••"
                      {...register("password")}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password.message}</div>
                    )}
                  </div>

                  {/* Remember Me */}
                  <div className="mb-3 form-check">
                    <input
                      id="remember"
                      type="checkbox"
                      className="form-check-input"
                      {...register("remember")}
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                  </button>
                </form>
              </div>
            </div>

            <div className="text-center mt-3 text-muted small">
              Don’t have an account? <Link to="/sign-up">Create one</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInForm;
