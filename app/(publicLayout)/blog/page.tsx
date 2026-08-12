import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { blogs } from "@/lib/blog-data"

const BlogSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-18">
      <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
               Knowledge Base
            </div>
            <h2 className="text-4xl font-black tracking-tight text-foreground md:text-6xl">
              Maintenance <span className="italic text-primary">Tips & News</span>
            </h2>
          </div>
          <Link href="/services">
            <Button className="group h-14 rounded-2xl bg-card px-8 font-bold text-foreground border border-border hover:bg-primary hover:text-white transition-all shadow-xl shadow-primary/5">
              Explore All Services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, i) => (
            <Link href={`/blog/${blog.id}`} key={i} className="group">
              <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-[3rem] shadow-2xl transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-primary/20">
                <Image
                  src={blog.img}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-xl bg-secondary px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                      {blog.category}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-white/70 uppercase">
                      <Clock className="h-3 w-3" /> {blog.readTime}
                    </div>
                  </div>
                  <h3 className="mb-4 text-2xl font-black leading-tight text-white group-hover:text-secondary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white group-hover:text-secondary transition-all">
                    Read Article <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
export default BlogSection