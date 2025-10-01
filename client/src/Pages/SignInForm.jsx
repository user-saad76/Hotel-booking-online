import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "../hook/usePost";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import { Navigate } from "react-router";

// ✅ Zod Schema for Login Validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


function SignInForm() {

   const {user,error:userError,loading:userLoading} = useAuth()

   if(userLoading) return <p>Loading...</p>
   if(user && user?.fullname) return <Navigate to ='/'/>



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });


  const navigate = useNavigate()
 const {postData, data, error, loading} =  usePost('http://localhost:7000/users/signin')


 console.log(data);
 

  const onSubmit = async(data) => {
    console.log("Login Data:", data);
    alert("✅ Logged in successfully!");
    await postData(data)
   // navigate('/');
    window.location.href='/'
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

              {/* Submit */}
              <button type="submit" className="btn btn-primary w-100">
                Sign In
              </button>

              {/* Extra links */}
              <div className="mt-3 text-center">
                <a href="/forgot-password" className="small">
                  Forgot Password?
                </a>
                <br />
                <a href="/sign-up" className="small">
                  Create an Account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
