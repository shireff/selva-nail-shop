import React from "react";
import { Link } from "react-router-dom";

type Service = {
  _id: string;
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
    fetch("https://selva-server.vercel.app/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (!confirmDelete) return;

    fetch(`https://selva-server.vercel.app/api/services/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Service deleted successfully") {
          setServices((prevServices) =>
            prevServices.filter((service) => service._id !== id)
          );
        } else {
          alert("Error deleting service");
        }
      })
      .catch((error) => {
        alert("Error deleting service");
        console.error(error);
      });
  };

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
            key={service._id}
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
              <div className="mt-2 flex gap-4">
                <Link
                  to={`/admin/services/${service._id}/edit`}
                  className="inline-block text-purple-700 underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
