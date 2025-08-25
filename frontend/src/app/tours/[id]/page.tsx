'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star, MapPin, Clock, Users, Calendar, ArrowLeft, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';

interface TourDetails {
  tourId: number;
  title: string;
  description: string;
  price: number;
  location: string;
  durationMinutes: number;
  imageUrl: string;
  capacity: number;
  supplier: {
    businessName: string;
    description: string;
    phoneNumber: string;
  };
  reviews: Array<{
    reviewId: number;
    rating: number;
    comment: string;
    createdAt: string;
    customerName: string;
  }>;
  averageRating: number;
  reviewCount: number;
}

export default function TourDetailsPage() {
  const params = useParams();
  const tourId = params.id as string;
  const [tour, setTour] = useState<TourDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  useEffect(() => {
    fetchTour();
  }, [tourId]);

  const fetchTour = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tours/${tourId}`);
      if (response.ok) {
        const data = await response.json();
        setTour(data);
      }
    } catch (error) {
      console.error('Error fetching tour:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleBooking = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    // Navigate to booking page with tour details
    window.location.href = `/booking/${tourId}?date=${selectedDate}&people=${numberOfPeople}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-2xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tour not found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            ← Back to tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to tours
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tour Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
          {tour.imageUrl ? (
            <img
              src={tour.imageUrl}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-orange-400 flex items-center justify-center">
              <MapPin className="w-16 h-16 text-white" />
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tour Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">
                    {tour.averageRating > 0 ? tour.averageRating.toFixed(1) : 'New'}
                  </span>
                  <span className="text-gray-500">({tour.reviewCount} reviews)</span>
                </div>
                <span className="text-sm text-blue-600 font-medium">{tour.supplier.businessName}</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{tour.title}</h1>
              
              <div className="flex flex-wrap items-center space-x-6 text-gray-600 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{formatDuration(tour.durationMinutes)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Up to {tour.capacity} people</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{tour.description}</p>
              </div>
            </div>

            {/* Supplier Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About {tour.supplier.businessName}</h2>
              <p className="text-gray-700 mb-4">{tour.supplier.description}</p>
              {tour.supplier.phoneNumber && (
                <p className="text-gray-600">
                  <span className="font-medium">Contact:</span> {tour.supplier.phoneNumber}
                </p>
              )}
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Reviews ({tour.reviewCount})
              </h2>
              
              {tour.reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet. Be the first to review this tour!</p>
              ) : (
                <div className="space-y-4">
                  {tour.reviews.map((review) => (
                    <div key={review.reviewId} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {review.customerName.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{review.customerName}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-gray-700">{review.comment}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-gray-900">${tour.price}</span>
                <span className="text-gray-600 ml-1">per person</span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={getTomorrowDate()}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of People
                  </label>
                  <select
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    {[...Array(Math.min(tour.capacity, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total ({numberOfPeople} × ${tour.price})</span>
                  <span className="text-xl font-bold text-gray-900">
                    ${(tour.price * numberOfPeople).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium"
              >
                Book Now
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                You won't be charged yet. Review your booking details on the next page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}