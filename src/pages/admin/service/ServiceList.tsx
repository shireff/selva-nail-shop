import React from "react";
import { Link } from "react-router-dom";

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image?: string;
  category: string;
  features: string[];
  isPopular: boolean;
};

const ServiceList = () => {
  const [services, setServices] = React.useState<Service[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <Link
          to="/admin/services/new"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          + New Service
        </Link>
      </div>
      <div className="grid gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded shadow p-4 flex flex-col md:flex-row gap-4"
          >
            {service.image && (
              <img
                src={service.image}
                alt={service.name}
                className="w-32 h-32 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{service.name}</h2>
              <p className="text-gray-600">{service.description}</p>
              <div className="text-sm text-gray-500 mt-2">
                {service.category} | {service.duration} min | ${service.price}
              </div>
              <div className="mt-2 flex gap-4 text-xs text-gray-400">
                {service.isPopular && <span>Popular</span>}
                <span>Features: {service.features.join(", ")}</span>
              </div>
              <Link
                to={`/admin/services/${service.id}/edit`}
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

export default ServiceList;
