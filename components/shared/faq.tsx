import { HelpCircle, ChevronDown } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const FAQSection = () => {
  const faqs = [
    {
      q: "How do I book a professional?",
      a: "Simply browse through our services, select a professional based on their ratings and reviews, and book a time slot that suits you best.",
    },
    {
      q: "Is there any warranty on the services?",
      a: "Yes, we provide a 7-day service guarantee. If you are not satisfied with the work, we will send an expert to fix it at no extra cost.",
    },
    {
      q: "Are the technicians verified?",
      a: "Every professional on FixItNow undergoes a rigorous background check and identity verification to ensure your safety.",
    },
    {
      q: "How can I pay for the service?",
      a: "You can pay securely through our platform using credit/debit cards or mobile banking. We also offer cash-on-service for selected tasks.",
    },
  ]

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-4xl px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <HelpCircle className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Common <span className="text-primary NOT-italic">Questions</span>
          </h2>
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            Quick answers to your most asked questions.
          </p>
        </div>

        {/* Accordion List */}
        <Accordion type="single" collapsible className="w-full space-y-5 border-none shadow-md">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              // এখানে border-none এবং shadow-sm ব্যবহার করা হয়েছে কালো বর্ডার দূর করতে
              className="group border-none bg-muted/40 dark:bg-card/40 px-6 rounded-[1.5rem] transition-all duration-300 hover:bg-muted/60 dark:hover:bg-card/60"
            >
              <AccordionTrigger className="py-7 text-left text-lg font-bold text-foreground transition-all hover:no-underline group-data-[state=open]:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-7 text-base font-medium leading-relaxed text-muted-foreground/90">
                <div className="pt-2 border-t border-primary/10">
                  {faq.a}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}