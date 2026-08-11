"use client"

import { useParams } from "next/navigation"
import { Calendar, Clock, User, ArrowLeft, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { FaFacebook, FaTwitter } from "react-icons/fa"
import { blogs } from "@/lib/blog-data"

export default function BlogDetailsPage() {
  const params = useParams()
  const blogId = params.id

  const blog = blogs.find((b) => b.id === blogId)

  if (!blog) {
    return (
      <div className="flex h-screen items-center justify-center font-bold">
        Article Not Found!
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* 1. Article Hero - Dynamic Image & Title */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={blog.img}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl space-y-6 px-4 text-center">
            <Link href="/blog">
              <Button
                variant="ghost"
                className="mb-4 gap-2 text-xs font-bold tracking-widest text-white uppercase hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft size={16} /> Back to blog
              </Button>
            </Link>
            <h1 className="text-4xl leading-tight font-black tracking-tighter text-white uppercase italic md:text-6xl">
              {blog.title.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="NOT-italic text-secondary">
                {blog.title.split(" ").slice(-2).join(" ")}
              </span>
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold tracking-widest text-slate-300 uppercase">
              <div className="flex items-center gap-2">
                <User size={16} className="text-primary" /> {blog.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" /> {blog.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary" /> {blog.readTime}{" "}
                Read
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Article Content */}
      <section className="relative z-20 mt-12 mx-auto max-w-4xl px-4">
        <div className="bg-card space-y-8 rounded-4xl border border-border p-8 shadow-2xl md:p-16">
          <p className="border-l-4 border-primary pl-6 text-xl leading-relaxed font-bold text-foreground italic">
            {blog.desc}
          </p>

          <div className="space-y-6 text-lg leading-relaxed font-medium text-muted-foreground">
            <h2 className="text-3xl font-black tracking-tight text-foreground italic">
              Expert Insights & Guide
            </h2>
            <p>{blog.content}</p>

            {/* Secondary Dynamic Image Inside Content */}
            <div className="relative my-12 h-[450px] w-full overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={blog?.secondaryImg}
                fill
                alt="Service Detail"
                className="object-cover"
              />
            </div>

            <p>
              Beyond the basics, maintaining your home requires consistent
              attention to detail. Our certified professionals at FixItNow are
              always ready to help you with these complex tasks.
            </p>
          </div>

          {/* Social Share */}
          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border pt-12">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black tracking-widest text-muted-foreground uppercase">
                Share Article:
              </span>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-xl transition-all hover:bg-blue-600 hover:text-white"
                >
                  <FaFacebook size={18} />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-xl transition-all hover:bg-sky-500 hover:text-white"
                >
                  <FaTwitter size={18} />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-xl transition-all hover:bg-primary hover:text-white"
                >
                  <Link2 size={18} />
                </Button>
              </div>
            </div>
            <Link href="/services">
              <Button className="h-14 rounded-2xl bg-secondary px-8 font-black tracking-widest uppercase shadow-lg shadow-secondary/20 transition-all hover:bg-secondary/90 active:scale-95">
                Book {blog.category} Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Reusable Newsletter Section */}
      <section className="mx-auto mt-20 max-w-4xl px-4">
        <div className="relative overflow-hidden rounded-4xl bg-primary p-12 text-center text-white shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <h3 className="mb-4 text-3xl font-black tracking-wide uppercase">
            Never miss a tip!
          </h3>
          <p className="mb-8 font-medium text-indigo-100 italic">
            Join 5,000+ homeowners for weekly expert advice.
          </p>
          <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              className="h-14 flex-1 rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-white outline-none placeholder:text-indigo-200 focus:ring-2 focus:ring-secondary"
              placeholder="Enter your email"
            />
            <Button className="h-14 rounded-xl bg-white px-6 py-4 font-black tracking-widest text-primary uppercase transition-all hover:bg-slate-100">
              Join
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}
