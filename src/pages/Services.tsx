/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Clock, 
  Star, 
  Filter, 
  Search, 
  Calendar,
  CheckCircle 
} from 'lucide-react';
import { RootState } from '../store/store';
import { fetchServices } from '../store/slices/servicesSlice';

const Services = () => {
  const dispatch = useDispatch();
  const { services, categories, isLoading } = useSelector((state: RootState) => state.services);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    dispatch(fetchServices() as any);
  }, [dispatch]);

  const filteredServices = services
    .filter(service => 
      (selectedCategory === 'all' || service.category === selectedCategory) &&
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return a.duration - b.duration;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <>
      <Helmet>
        <title>Services - Selva Hard Gel Nail Shop | Professional Nail Care</title>
        <meta name="description" content="Explore our comprehensive range of professional nail services including hard gel manicures, pedicures, nail art, and more. Expert care for beautiful nails." />
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
              Our Premium Services
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover our comprehensive range of professional nail care services, 
              designed to enhance your natural beauty with expert precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <Filter className="text-gray-500 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-t-2xl" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-300 rounded" />
                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                    <div className="h-4 bg-gray-300 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow group overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Service Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {service.isPopular && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                          <Star className="h-4 w-4" />
                          <span>Popular</span>
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Includes:</h4>
                      <div className="space-y-1">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <div key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                        {service.features.length > 3 && (
                          <div className="text-sm text-purple-600 font-medium">
                            +{service.features.length - 3} more features
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price and Duration */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold text-purple-600">£{service.price}</span>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{service.duration} min</span>
                        </div>
                      </div>
                    </div>

                    {/* Book Button */}
                    <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Book This Service</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredServices.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">No services found</div>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Service Information
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our services
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How long do hard gel nails last?",
                answer: "Our hard gel manicures typically last 2-3 weeks with proper care. The longevity depends on your lifestyle and nail growth rate."
              },
              {
                question: "Can I book multiple services in one appointment?",
                answer: "Absolutely! You can combine services like manicure and pedicure. We'll adjust the appointment duration accordingly."
              },
              {
                question: "What's the difference between hard gel and regular polish?",
                answer: "Hard gel is more durable, lasts longer, and provides better protection for your natural nails compared to regular polish."
              },
              {
                question: "Do you use sterilized equipment?",
                answer: "Yes, all our tools are properly sterilized between clients. We follow strict hygiene protocols for your safety."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;