'use client';

import { useState } from 'react';
import { author } from '@/data/content';
import { Send, Mail, Linkedin, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Contact</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto"></div>
          <p className="mt-6 text-lg text-slate-600">Get in touch with us</p>
        </header>

        {submitted && (
          <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <p className="text-emerald-800 font-medium">Thank you for your message. We'll get back to you soon!</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50 transition-all resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-6">Alternative Contact Methods</h3>
              <div className="space-y-4">
                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className="flex items-center gap-4 p-4 rounded-lg bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Email</div>
                      <div className="text-sm text-slate-600">{author.email}</div>
                    </div>
                  </a>
                )}
                {author.linkedin && (
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Linkedin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">LinkedIn</div>
                      <div className="text-sm text-slate-600">Connect on LinkedIn</div>
                    </div>
                  </a>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-6 h-6 text-amber-600" />
                <h4 className="font-semibold text-slate-900">Response Time</h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                We typically respond to inquiries within 2-3 business days. For urgent matters, please use the contact form above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
