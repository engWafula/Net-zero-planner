'use client';
import AuthForm from "@/app/components/AuthForm";
import AuthHeader from "@/app/components/AuthHeader";


export default function RegisterPage() {
  return (
    <div>
         <AuthHeader/>
    <AuthForm type="register" />
    </div>
  );
}