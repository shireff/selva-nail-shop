import React from "react";
import { Link } from "react-router-dom";

type Testimonial = {
  id: string;
  customerName: string;
  customerImage?: string;
  rating: number;
  review: string;
  serviceUsed: string;
  beforeImage?: string;
  afterImage?: string;
  createdAt: string;
  isApproved: boolean;
  isFeatured: boolean;
};

const TestimonialList = () => {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
  const [loading, setLoading] = React.useState(true);
//   const navigate = useNavigate();

  React.useEffect(() => {
    fetch("http://localhost:5000/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data.testimonials);
        setLoading(false);
      });
  }, []);

  const handleApprove = async (id: string) => {
    await fetch(`http://localhost:5000/api/testimonials/${id}/approve`, {
      method: "PUT",
    });
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isApproved: true } : t))
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <Link
          to="/admin/testimonials/new"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          + New Testimonial
        </Link>
      </div>
      <div className="grid gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded shadow p-4 flex flex-col md:flex-row gap-4"
          >
            {t.customerImage && (
              <img
                src={t.customerImage}
                alt={t.customerName}
                className="w-24 h-24 object-cover rounded-full"
              />
            )}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{t.customerName}</h2>
              <div className="text-yellow-500 mb-1">
                {"★".repeat(t.rating)}
                {"☆".repeat(5 - t.rating)}
              </div>
              <p className="text-gray-600 mb-2">{t.review}</p>
              <div className="text-xs text-gray-500 mb-2">
                Service: {t.serviceUsed} |{" "}
                {new Date(t.createdAt).toLocaleDateString()}
              </div>
              <div className="flex gap-2 mb-2">
                {t.beforeImage && (
                  <img
                    src={t.beforeImage}
                    alt="Before"
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                {t.afterImage && (
                  <img
                    src={t.afterImage}
                    alt="After"
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </div>
              <div className="flex gap-4 text-xs text-gray-400">
                {t.isApproved ? (
                  <span className="text-green-600">Approved</span>
                ) : (
                  <button
                    className="text-blue-600 underline"
                    onClick={() => handleApprove(t.id)}
                  >
                    Approve
                  </button>
                )}
                {t.isFeatured && <span>Featured</span>}
              </div>
              <Link
                to={`/admin/testimonials/${t.id}/edit`}
                className="inline-block mt-2 text-purple-700 underline"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialList;
