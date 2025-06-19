import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronDown, 
  Search, 
  HelpCircle,
  Clock,
  CreditCard,
  Scissors,
  Shield,
  Users,
  Calendar
} from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'booking', name: 'Booking & Appointments', icon: Calendar },
    { id: 'services', name: 'Services & Treatments', icon: Scissors },
    { id: 'pricing', name: 'Pricing & Payment', icon: CreditCard },
    { id: 'policies', name: 'Policies & Guidelines', icon: Shield },
    { id: 'aftercare', name: 'Aftercare & Maintenance', icon: Clock },
    { id: 'general', name: 'General Information', icon: Users }
  ];

  const faqs = [
    {
      id: 1,
      category: 'booking',
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment through our online booking system on our website, by calling us directly at +20 123 456 7890, or by visiting our salon in person. Our online system is available 24/7 for your convenience.'
    },
    {
      id: 2,
      category: 'booking',
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 1-2 weeks in advance, especially for weekend appointments and popular services. However, we often have same-day availability for weekday appointments.'
    },
    {
      id: 3,
      category: 'booking',
      question: 'Can I reschedule or cancel my appointment?',
      answer: 'Yes, you can reschedule or cancel your appointment up to 24 hours in advance without any penalty. Cancellations made less than 24 hours before your appointment may be subject to a cancellation fee.'
    },
    {
      id: 4,
      category: 'services',
      question: 'What is hard gel and how is it different from regular polish?',
      answer: 'Hard gel is a durable nail enhancement that provides strength and longevity. Unlike regular polish, hard gel is cured under UV/LED light, lasts 2-3 weeks without chipping, and provides better protection for your natural nails.'
    },
    {
      id: 5,
      category: 'services',
      question: 'How long do hard gel nails last?',
      answer: 'Hard gel manicures typically last 2-3 weeks, depending on your lifestyle and nail growth rate. With proper care, some clients can extend this to 4 weeks.'
    },
    {
      id: 6,
      category: 'services',
      question: 'Do you offer nail art and custom designs?',
      answer: 'Yes! We offer a wide range of nail art services, from simple designs to intricate custom artwork. Our skilled technicians can create personalized designs based on your preferences.'
    },
    {
      id: 7,
      category: 'pricing',
      question: 'What are your prices for services?',
      answer: 'Our prices vary depending on the service. Basic hard gel manicures start at £35, while more complex services with nail art can range from £50-£80. Please check our services page for detailed pricing.'
    },
    {
      id: 8,
      category: 'pricing',
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, all major credit cards, and InstaPay for your convenience. Payment is due at the time of service.'
    },
    {
      id: 9,
      category: 'pricing',
      question: 'Do you offer any discounts or packages?',
      answer: 'Yes, we offer various promotions throughout the year, loyalty rewards for regular clients, and package deals for multiple services. Follow us on social media to stay updated on current offers.'
    },
    {
      id: 10,
      category: 'policies',
      question: 'What is your hygiene and safety protocol?',
      answer: 'We follow strict hygiene protocols including sterilizing all tools between clients, using disposable items where possible, and maintaining a clean environment. All our technicians are trained in proper sanitation procedures.'
    },
    {
      id: 11,
      category: 'policies',
      question: 'Do you accept walk-ins?',
      answer: 'While we prefer appointments to ensure the best service, we do accept walk-ins based on availability. We recommend calling ahead to check our current availability.'
    },
    {
      id: 12,
      category: 'aftercare',
      question: 'How do I care for my hard gel nails?',
      answer: 'To maintain your hard gel nails: avoid using them as tools, wear gloves when cleaning, moisturize your cuticles daily, and book regular maintenance appointments every 2-3 weeks.'
    },
    {
      id: 13,
      category: 'aftercare',
      question: 'What should I do if a nail breaks or chips?',
      answer: 'If you experience any damage within the first week of your appointment, contact us immediately. We offer complimentary repairs for manufacturing defects. For damage after one week, we provide repair services at a reduced rate.'
    },
    {
      id: 14,
      category: 'aftercare',
      question: 'Can I remove hard gel nails at home?',
      answer: 'We strongly recommend professional removal to avoid damaging your natural nails. However, if necessary, soak nails in acetone and gently push off the softened gel. Never force or peel off hard gel.'
    },
    {
      id: 15,
      category: 'general',
      question: 'What are your operating hours?',
      answer: 'We are open Monday through Friday from 9:00 AM to 8:00 PM, and weekends from 10:00 AM to 6:00 PM. Holiday hours may vary.'
    },
    {
      id: 16,
      category: 'general',
      question: 'Where are you located?',
      answer: 'We are located at 123 Beauty Street, New Cairo, Egypt. We have ample parking available and are easily accessible by public transportation.'
    },
    {
      id: 17,
      category: 'general',
      question: 'Do you have gift certificates available?',
      answer: 'Yes, we offer gift certificates in various denominations. They make perfect gifts for birthdays, holidays, or special occasions. Gift certificates can be purchased in-salon or online.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <Helmet>
        <title>FAQ - Selva Hard Gel Nail Shop | Frequently Asked Questions</title>
        <meta name="description" content="Find answers to frequently asked questions about our nail services, booking process, pricing, and policies. Get the information you need about Selva nail salon." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 to-rosegold-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Find quick answers to common questions about our services, policies, and procedures.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openItems.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Can't find what you're looking for? Our friendly team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="tel:+201234567890"
                className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors"
              >
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Quick Tips for First-Time Visitors
            </h2>
            <p className="text-xl text-gray-600">
              Make the most of your first visit to Selva
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: 'Book in Advance',
                tip: 'Schedule your appointment 1-2 weeks ahead, especially for weekends and popular services.'
              },
              {
                icon: Clock,
                title: 'Arrive Early',
                tip: 'Come 10-15 minutes before your appointment to complete any necessary paperwork and relax.'
              },
              {
                icon: Scissors,
                title: 'Discuss Your Preferences',
                tip: 'Share your nail goals, lifestyle, and any concerns with your technician for the best results.'
              },
              {
                icon: CreditCard,
                title: 'Payment Options',
                tip: 'We accept cash, cards, and InstaPay. Consider our loyalty program for regular visits.'
              },
              {
                icon: Shield,
                title: 'Aftercare Instructions',
                tip: 'Follow the aftercare advice provided to maintain your nails and extend the life of your service.'
              },
              {
                icon: Users,
                title: 'Ask Questions',
                tip: 'Don\'t hesitate to ask about our services, products, or nail care tips. We\'re here to help!'
              }
            ].map((tip, index) => (
              <motion.div
                key={tip.title}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <tip.icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{tip.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;