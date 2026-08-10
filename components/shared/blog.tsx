import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import Image from "next/image"

export const BlogSection = () => {
  const blogs = [
    {
      title: "5 Signs Your Home Plumbing Needs Urgent Attention",
      desc: "Don't wait for a flood. Learn how to spot early warning signs of pipe leaks...",
      date: "Oct 24, 2024",
      readTime: "5 min read",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGx1bWJpbmd8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "How to Prepare Your AC for the Upcoming Summer",
      desc: "Simple maintenance tips that can save you hundreds in repair costs this season...",
      date: "Oct 20, 2024",
      readTime: "8 min read",
      img: "https://plus.unsplash.com/premium_photo-1683134512538-7b390d0adc9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWMlMjByZXBhaXJ8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Choosing the Right Expert for Home Renovation",
      desc: "A complete guide on what to check before hiring a professional for your home...",
      date: "Oct 15, 2024",
      readTime: "6 min read",
      img: "https://images.unsplash.com/flagged/photo-1573168710465-7f7da9a23a15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZSUyMHJlbm92YXRpb258ZW58MHx8MHx8fDA%3D",
    },
  ]

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="mb-3 text-xs font-extrabold tracking-[0.3em] text-primary uppercase">
              Knowledge Base
            </h2>
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Home Maintenance Tips
            </h2>
          </div>
          <Button
            variant="ghost"
            className="rounded-full font-bold text-primary hover:bg-primary/10"
          >
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative mb-6 h-64 w-full overflow-hidden rounded-[2rem]">
                <Image
                  src={blog.img}
                  alt={blog.title}
                  fill
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-primary uppercase backdrop-blur-md">
                  {blog.readTime}
                </div>
              </div>
              <div className="mb-3 flex items-center gap-4 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {blog.date}
                </div>
                <div className="flex items-center gap-1 text-secondary">
                  <Clock className="h-3 w-3" /> {blog.readTime}
                </div>
              </div>
              <h3 className="mb-3 line-clamp-2 text-xl font-black text-foreground transition-colors group-hover:text-primary">
                {blog.title}
              </h3>
              <p className="line-clamp-2 text-sm font-medium text-muted-foreground">
                {blog.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
