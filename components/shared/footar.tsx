import { Wrench, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative  overflow-hidden bg-background ">
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="relative overflow-hidden  backdrop-blur-md p-10 md:p-16 ">
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 relative z-10">
            
            {/* Brand Section */}
            <div className="space-y-6 lg:col-span-2">
              <Link href="/" className="group flex items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30 transition-transform group-hover:rotate-12">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tighter italic text-foreground">
                  FIXIT<span className="NOT-italic text-primary">NOW</span>
                </span>
              </Link>
              <p className="max-w-sm text-sm font-medium leading-relaxed text-muted-foreground">
                The world&apos;s most trusted marketplace for professional home
                services. We connect you with background-checked experts for all
                your repair and maintenance needs.
              </p>
              
              <div className="flex items-center gap-3 pt-2">
                {[
                  { icon: FaFacebook, href: "#", color: "hover:bg-blue-600" },
                  { icon: FaTwitter, href: "#", color: "hover:bg-sky-500" },
                  { icon: FaInstagram, href: "#", color: "hover:bg-pink-600" },
                  { icon: FaLinkedin, href: "#", color: "hover:bg-indigo-700" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background shadow-sm transition-all hover:scale-110 hover:text-white ${social.color} text-muted-foreground`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-6">
              <h4 className="text-sm font-black  tracking-wide text-primary uppercase">
                Expertise
              </h4>
              <ul className="space-y-3">
                {["Plumbing", "Electrical", "Cleaning", "HVAC", "Painting"].map((item) => (
                  <li key={item}>
                    <Link href="/services" className="group flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-primary">
                      <div className="h-1.5 w-1.5 rounded-full bg-secondary opacity-0 transition-all group-hover:opacity-100" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-6">
              <h4 className="text-sm font-black  tracking-wide text-primary uppercase">
                Platform
              </h4>
              <ul className="space-y-3 text-sm font-bold text-muted-foreground">
                {["About Us", "Contact", "Privacy Policy", "Terms", "FAQ"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-primary transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column (Section 2 Requirement) */}
            <div className="space-y-6">
              <h4 className="text-sm font-black tracking-wide text-primary uppercase">
                Get In Touch
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                  <span className="text-xs font-bold leading-relaxed text-muted-foreground">
                    123 Service Lane, Dhaka - 1212
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-secondary" />
                  <span className="text-xs font-bold text-muted-foreground">+880 1234 567 890</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-secondary" />
                  <span className="text-xs font-bold text-muted-foreground">help@fixitnow.com</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 3. Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
          <p className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
            © {currentYear} FIXITNOW • PROFESSIONAL SERVICE MARKETPLACE
          </p>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1 text-[10px] font-black text-muted-foreground uppercase border border-border">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Platform Live
            </div>

          </div>
        </div>

      </div>
    </footer>
  )
}