import type { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Contact Us | De-chickins',
  description: 'Get in touch with De-chickins. We\'d love to hear from you!',
  openGraph: {
    title: 'Contact Us - De-chickins',
    description: 'Get in touch with us. We\'d love to hear from you!',
    url: 'https://www.de-chickins.com/contact',
    siteName: 'De-chickins',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact De-chickins'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - De-chickins',
    description: 'Get in touch with us. We\'d love to hear from you!',
    images: ['/twitter-contact.jpg'],
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3 text-amber-900">Contact Us</h1>
            <p className="text-amber-900/70 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Get in touch with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-amber-900">Send us a message</CardTitle>
                <CardDescription className="text-amber-900/70">
                  Fill out the form and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-amber-900">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="border-amber-300 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-amber-900">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="border-amber-300 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-amber-900">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What is this regarding?"
                      className="border-amber-300 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-amber-900">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      className="border-amber-300 focus:ring-amber-500"
                      rows={5}
                    />
                  </div>
                  <Button className="w-full bg-amber-700 hover:bg-amber-800 text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-xl text-amber-900">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-amber-900 mb-1">Email</h3>
                    <p className="text-amber-900/70">support@de-chickins.com</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-900 mb-1">Phone</h3>
                    <p className="text-amber-900/70">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-900 mb-1">Business Hours</h3>
                    <p className="text-amber-900/70">Monday - Friday: 9AM - 5PM</p>
                    <p className="text-amber-900/70">Saturday: 10AM - 4PM</p>
                    <p className="text-amber-900/70">Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-xl text-amber-900">Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon" className="border-amber-300 text-amber-900 hover:bg-amber-100" asChild>
                      <Link href="#">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" className="border-amber-300 text-amber-900 hover:bg-amber-100" asChild>
                      <Link href="#">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" className="border-amber-300 text-amber-900 hover:bg-amber-100" asChild>
                      <Link href="#">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}