import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageCircle, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Header />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-amber-900">Contact Us</h1>
            <p className="text-lg sm:text-xl text-amber-900/80 text-pretty max-w-2xl mx-auto">
              Get in touch with us for orders, support, or any questions you may have.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* WhatsApp Ordering */}
            <Card className="border-amber-300 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-900">
                  <MessageCircle className="w-5 h-5 text-amber-700" />
                  Order via WhatsApp
                </CardTitle>
                <CardDescription className="text-amber-900/70">The fastest way to place your order and get instant support.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-amber-100 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-amber-900">How it works:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-amber-900/80">
                    <li>Click the WhatsApp button below</li>
                    <li>Tell us which product you're interested in</li>
                    <li>We'll send you payment details and delivery info</li>
                    <li>Complete your order in minutes!</li>
                  </ol>
                </div>
                <Button size="lg" className="w-full text-base bg-amber-700 hover:bg-amber-800 text-white" asChild>
                  <a
                    href="https://wa.me/1234567890?text=Hi! I'd like to place an order."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start WhatsApp Chat
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-amber-900">Send us a Message</CardTitle>
                <CardDescription className="text-amber-900/70">Have a question? Fill out the form below and we'll get back to you.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-amber-900">Name</Label>
                      <Input id="name" placeholder="Your name" className="border-amber-300 focus:ring-amber-500" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-amber-900">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" className="border-amber-300 focus:ring-amber-500" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-amber-900">Subject</Label>
                    <Input id="subject" placeholder="What's this about?" className="border-amber-300 focus:ring-amber-500" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-amber-900">Message</Label>
                    <Textarea id="message" placeholder="Tell us more..." className="min-h-[120px] border-amber-300 focus:ring-amber-500" />
                  </div>
                  <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-amber-800" />
              </div>
              <h3 className="font-semibold mb-2 text-amber-900">Phone</h3>
              <p className="text-amber-900/70 text-sm sm:text-base">+1 (234) 567-8900</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-amber-800" />
              </div>
              <h3 className="font-semibold mb-2 text-amber-900">Email</h3>
              <p className="text-amber-900/70 text-sm sm:text-base">hello@dcchickin.com</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-amber-800" />
              </div>
              <h3 className="font-semibold mb-2 text-amber-900">Business Hours</h3>
              <p className="text-amber-900/70 text-sm sm:text-base">Mon-Fri: 9AM-6PM</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-amber-900">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg text-amber-900">How do I place an order?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-900/70 text-sm sm:text-base">
                    Simply click on any "Order via WhatsApp" button on our products. We'll guide you through the entire
                    process on WhatsApp.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg text-amber-900">What payment methods do you accept?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-900/70 text-sm sm:text-base">
                    We accept bank transfers, mobile money, and cash on delivery. Payment details will be shared via
                    WhatsApp.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg text-amber-900">How long does delivery take?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-900/70 text-sm sm:text-base">
                    Delivery typically takes 2-5 business days depending on your location. We'll provide tracking
                    information via WhatsApp.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg text-amber-900">Do you offer exchanges?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-900/70 text-sm sm:text-base">
                    Yes! We offer exchanges within 14 days of purchase. Contact us on WhatsApp for exchange requests
                    and support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}