/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CreditCard,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format, addDays, isSameDay, startOfDay } from "date-fns";
import { AppDispatch, RootState } from "../store/store";
import { fetchServices } from "../store/slices/servicesSlice";
import {
  setCurrentBooking,
  updateCurrentBooking,
  fetchAvailableSlots,
  createBooking,
  confirmBooking,
} from "../store/slices/bookingSlice";
import toast from "react-hot-toast";

interface BookingForm {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
}

const Booking = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { services } = useSelector((state: RootState) => state.services);
  const { currentBooking, availableSlots, isLoading } = useSelector(
    (state: RootState) => state.booking
  );
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingForm>();

  useEffect(() => {
    dispatch(fetchServices() as any);
  }, [dispatch]);

  useEffect(() => {
    if (selectedService && selectedDate) {
      dispatch(
        fetchAvailableSlots({
          serviceId: selectedService,
          date: format(selectedDate, "yyyy-MM-dd"),
        }) as any
      );
    }
  }, [dispatch, selectedService, selectedDate]);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    dispatch(setCurrentBooking({ serviceId }) as any);
    setStep(2);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime("");
    dispatch(
      updateCurrentBooking({
        date: format(date, "yyyy-MM-dd"),
      }) as any
    );
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    dispatch(updateCurrentBooking({ time }) as any);
    setStep(3);
  };

  const onSubmit = async (data: BookingForm) => {
    if (!selectedService || !selectedDate || !selectedTime) {
      toast.error("Please complete all booking details");
      return;
    }

    const service = services.find((s) => s.id === selectedService);
    if (!service) return;

    const bookingData = {
      serviceId: selectedService,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      notes: data.notes,
      totalPrice: service.price,
    };

    try {
      const resultAction = await dispatch(createBooking(bookingData) as any);
      const createdBooking = resultAction.payload;

      setStep(4);
      if (createdBooking && createdBooking.id) {
        await dispatch(confirmBooking(createdBooking.id) as any);
      }
      toast.success("Booking confirmed!");
    } catch (error) {
      toast.error("Failed to create booking");
    }
  };

  const generateDateOptions = () => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      dates.push(addDays(new Date(), i));
    }
    return dates;
  };

  const selectedServiceData = services.find((s) => s.id === selectedService);
  const dateSlots = selectedDate
    ? availableSlots[format(selectedDate, "yyyy-MM-dd")] || []
    : [];

  return (
    <>
      <Helmet>
        <title>Book Appointment - Selva Hard Gel Nail Shop</title>
        <meta
          name="description"
          content="Book your nail appointment online. Choose your service, select a convenient time, and secure your spot with our easy booking system."
        />
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
              Book Your Appointment
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Schedule your nail care session in just a few simple steps. Choose
              your service, pick a time, and we'll take care of the rest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4 mb-8">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= stepNumber
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step > stepNumber ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  {stepNumber < 4 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        step > stepNumber ? "bg-purple-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-8 text-sm text-gray-600">
              <span className={step >= 1 ? "text-purple-600 font-medium" : ""}>
                Service
              </span>
              <span className={step >= 2 ? "text-purple-600 font-medium" : ""}>
                Date & Time
              </span>
              <span className={step >= 3 ? "text-purple-600 font-medium" : ""}>
                Details
              </span>
              <span className={step >= 4 ? "text-purple-600 font-medium" : ""}>
                Confirmation
              </span>
            </div>
          </div>

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                Choose Your Service
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    className="border border-gray-200 rounded-2xl p-6 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-purple-600">
                            £{service.price}
                          </span>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">
                              {service.duration} min
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Date & Time Selection */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span>Back to Services</span>
                </button>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Select Date & Time
                </h2>
                <div></div>
              </div>

              {selectedServiceData && (
                <div className="bg-purple-50 rounded-lg p-4 mb-8">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedServiceData.image}
                      alt={selectedServiceData.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {selectedServiceData.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>£{selectedServiceData.price}</span>
                        <span>{selectedServiceData.duration} minutes</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Choose Date
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {generateDateOptions().map((date) => (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateSelect(date)}
                      className={`p-3 rounded-lg text-center transition-colors ${
                        isSameDay(date, selectedDate)
                          ? "bg-purple-600 text-white"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="text-sm font-medium">
                        {format(date, "EEE")}
                      </div>
                      <div className="text-lg font-bold">
                        {format(date, "d")}
                      </div>
                      <div className="text-xs">{format(date, "MMM")}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Choose Time
                  </h3>
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                      <p className="text-gray-600 mt-2">
                        Loading available times...
                      </p>
                    </div>
                  ) : dateSlots.length > 0 ? (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {dateSlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => handleTimeSelect(slot.time)}
                          disabled={!slot.available}
                          className={`p-3 rounded-lg text-center font-medium transition-colors ${
                            selectedTime === slot.time
                              ? "bg-purple-600 text-white"
                              : slot.available
                              ? "bg-gray-50 hover:bg-gray-100 text-gray-900"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-600">
                      No available times for this date. Please select another
                      date.
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Customer Details */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span>Back to Date & Time</span>
                </button>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Your Details
                </h2>
                <div></div>
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Booking Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">
                      {selectedServiceData?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">
                      {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">
                      {selectedServiceData?.duration} minutes
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>£{selectedServiceData?.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        {...register("customerName", {
                          required: "Name is required",
                        })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.customerName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.customerName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="tel"
                        {...register("customerPhone", {
                          required: "Phone number is required",
                        })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.customerPhone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.customerPhone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      {...register("customerEmail", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.customerEmail && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.customerEmail.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    {...register("notes")}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Any special requests or notes for your appointment..."
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the{" "}
                    <a
                      href="/terms"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>{isLoading ? "Processing..." : "Confirm Booking"}</span>
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Booking Confirmed!
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for choosing Selva. We've sent a confirmation email
                with all the details.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Appointment Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">
                      {selectedServiceData?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">
                      {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-medium">
                      £{selectedServiceData?.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setStep(1);
                    setSelectedService("");
                    setSelectedDate(new Date());
                    setSelectedTime("");
                  }}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Book Another Appointment
                </button>
                <div>
                  <a
                    href="/"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Return to Home
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Booking;
