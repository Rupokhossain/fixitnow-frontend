import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center bg-background px-4 py-12 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]" />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] -z-20" />

      <div className="w-full max-w-lg animate-in fade-in zoom-in duration-500">
        <RegisterForm />
      </div>
    </div>
  );
}