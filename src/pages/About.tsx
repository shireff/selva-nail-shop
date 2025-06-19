import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Award, 
  Users, 
  Heart, 
  Star, 
  Shield, 
  Clock,
  Sparkles,
  CheckCircle
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Excellence',
      description: 'We are passionate about delivering exceptional nail care services that exceed your expectations.'
    },
    {
      icon: Shield,
      title: 'Quality & Safety',
      description: 'We use only premium products and maintain the highest standards of hygiene and safety.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We listen, understand, and deliver personalized experiences.'
    },
    {
      icon: Award,
      title: 'Professional Expertise',
      description: 'Our certified technicians bring years of experience and continuous learning to every service.'
    }
  ];

  const team = [
    {
      name: 'Sarah Ahmed',
      role: 'Founder & Lead Technician',
      image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
      experience: '8+ years',
      specialties: ['Hard Gel Extensions', 'Nail Art', 'French Manicure']
    },
    {
      name: 'Maya Hassan',
      role: 'Senior Nail Technician',
      image: 'https://images.pexels.com/photos/3762806/pexels-photo-3762806.jpeg',
      experience: '6+ years',
      specialties: ['Pedicure Specialist', 'Nail Health', 'Color Matching']
    },
    {
      name: 'Layla Mohamed',
      role: 'Nail Artist',
      image: 'https://images.pexels.com/photos/3762811/pexels-photo-3762811.jpeg',
      experience: '4+ years',
      specialties: ['Creative Designs', 'Seasonal Art', 'Custom Patterns']
    },
    {
      name: 'Nour Ali',
      role: 'Junior Technician',
      image: 'https://images.pexels.com/photos/3762795/pexels-photo-3762795.jpeg',
      experience: '2+ years',
      specialties: ['Basic Manicure', 'Nail Care', 'Customer Service']
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '15+', label: 'Expert Technicians' },
    { number: '5', label: 'Years of Excellence' },
    { number: '98%', label: 'Customer Satisfaction' }
  ];

  const certifications = [
    'Certified Nail Technician Program',
    'Hard Gel Application Specialist',
    'Nail Health & Safety Certification',
    'Advanced Nail Art Techniques',
    'Hygiene & Sanitation Standards'
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Selva Hard Gel Nail Shop | Our Story & Team</title>
        <meta name="description" content="Learn about Selva's journey, our expert team, and our commitment to providing exceptional hard gel nail services. Discover what makes us Egypt's premier nail salon." />
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
              About Selva
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover the story behind Egypt's premier hard gel nail salon, 
              where passion meets expertise to create beautiful, lasting results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3997390/pexels-photo-3997390.jpeg"
                  alt="Selva nail salon interior"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-purple-600 text-white p-6 rounded-2xl">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="h-6 w-6 text-purple-600" />
                <span className="text-purple-600 font-semibold">Our Story</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                Crafting Beauty, One Nail at a Time
              </h2>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2019, Selva began as a dream to bring professional-grade hard gel 
                  nail services to Egypt. What started as a small studio has grown into a 
                  trusted destination for nail care excellence.
                </p>
                
                <p>
                  Our founder, Sarah Ahmed, recognized the need for high-quality nail services 
                  that combine international standards with personalized care. With over 8 years 
                  of experience in the beauty industry, she assembled a team of passionate 
                  professionals dedicated to the art of nail care.
                </p>
                
                <p>
                  Today, Selva stands as a testament to our commitment to quality, innovation, 
                  and customer satisfaction. We continue to evolve, incorporating the latest 
                  techniques and products to ensure every client leaves feeling confident and beautiful.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">10,000+</div>
                  <div className="text-sm text-gray-600">Satisfied Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and shape the experience we create for our clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6 group-hover:bg-purple-200 transition-colors">
                  <value.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our certified professionals bring passion, expertise, and creativity to every service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 mb-3">{member.experience} Experience</p>
                
                <div className="space-y-1">
                  {member.specialties.map((specialty, i) => (
                    <div key={i} className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block mr-1 mb-1">
                      {specialty}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-purple-200 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Professional Certifications
            </h2>
            <p className="text-xl text-gray-600">
              Our team maintains the highest professional standards through continuous education and certification
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-rosegold-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Experience the Selva Difference
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of satisfied clients who trust us with their nail care. 
              Book your appointment today and discover why we're Egypt's premier nail salon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Book Your Appointment
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;