import React from 'react'
import Link from 'next/link'

const faqs = [
  {
    question: "How can I customize my hitme.to page?",
    answer: "You can easily customize your hitme.to page through our user-friendly dashboard. Add your profile picture, bio, services, and social media links. You can also choose from various themes and color schemes to match your personal brand."
  },
  {
    question: "Is hitme.to free to use?",
    answer: "We offer a free basic plan that allows you to create your personal landing page. For advanced features like custom domains and analytics, we have affordable premium plans. Check our pricing page for more details."
  },
  {
    question: "Can I use my own domain with hitme.to?",
    answer: "Yes, our premium plans allow you to use your own custom domain. This feature helps you maintain a consistent brand across all your online presence. We provide easy-to-follow instructions to set up your custom domain."
  }
]

export default function FAQSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Support</h2>
          <h3 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently asked questions
          </h3>
          <p className="mt-4 text-lg text-gray-500">
            Have a different question and can`&ldquo;`t find the answer you`&ldquo;`re looking for? Reach out to our
            support team by{' '}
            <Link href="/contact" className="font-medium text-blue-600 hover:text-blue-500">
              sending us an email
            </Link>{' '}
            and we`&ldquo;`ll get back to you as soon as we can.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-8">
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                {faq.question}
              </h4>
              <p className="text-base text-gray-500">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}