import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin — BWV™",
};

export default function AdminLoginPage() {
  return <LoginForm />;
}
