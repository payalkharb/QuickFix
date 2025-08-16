// FAQ.jsx
import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const faqs = [
  {
    question: "How do I book a service on ABC Solutions?",
    answer:
      "You can easily book a service via our app or website. Choose a service, select a time slot, confirm your location, and pay online or choose cash payment at checkout.",
  },
  {
    question: "Can I pay after service is completed?",
    answer:
      "Yes — we support online payment as well as cash on delivery. Note: In rare cases, due to high demand or safety protocols for new users, online payment may be required.",
  },
  {
    question: "What if I face any damage during service?",
    answer:
      "All services booked and paid online are covered under our Insurance Protection Plan, providing up to ₹10,000 insurance on eligible services.",
  },
  {
    question: "How is the pricing disclosed?",
    answer:
      "We display the full rate card before confirming your booking — so you know the cost upfront with no hidden charges.",
  },
  {
    question: "Can I rebook the same service provider?",
    answer:
      "Yes, you can rebook the same technician or helper from your booking history — subject to their availability.",
  },
  {
    question: "What is our cancellation and refund policy?",
    answer:
      "If you cancel within a few minutes of booking, you’ll get a full refund. Beyond that window, partial refunds are considered based on service type and provider status.",
  },
];

export default function FAQ() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Frequently Asked Questions
        </h2>
        <dl className="space-y-4">
          {faqs.map((item, idx) => (
            <Disclosure key={idx} defaultOpen={idx === 0}>
              {({ open }) => (
                <div className="bg-blue-50 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 rounded-lg shadow p-5">
                  <dt>
                    <Disclosure.Button className="flex w-full justify-between text-left text-lg font-semibold hover:text-blue-800 focus:outline-none">
                      <span>{item.question}</span>
                      <ChevronDownIcon
                        className={`w-6 h-6 text-blue-800 transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-3 text-gray-700">
                    {item.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </section>
  );
}
