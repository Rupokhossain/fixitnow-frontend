import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-black text-gray-200">404</h1>
      <p className="text-2xl font-bold text-gray-800 mt-4">Oops! Page not found.</p>
      <p className="text-gray-500 mt-2">The page you are looking for doesn&apos;t exist.</p>
      <Link href="/"><Button className="mt-6">Back to Home</Button></Link>
    </div>
  );
}