import React from "react";
import { Link } from "react-router-dom";

type Booking = {
  id: string;
  serviceId: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: string;
  notes?: string;
  totalPrice: number;
};

const BookingList = () => {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);
//   const navigate = useNavigate();

  React.useEffect(() => {
    fetch("https://selva-server.vercel.app/api/bookings/user")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      });
  }, []);

  const handleStatus = async (id: string, action: "confirm" | "cancel") => {
    await fetch(`https://selva-server.vercel.app/api/bookings/${id}/${action}`, {
      method: "PUT",
    });
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: action === "confirm" ? "confirmed" : "cancelled" }
          : b
      )
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bookings</h1>
        <Link
          to="/admin/bookings/new"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          + New Booking
        </Link>
      </div>
      <div className="grid gap-6">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded shadow p-4 flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{b.customerName}</h2>
              <div className="text-sm text-gray-500 mb-1">
                {b.customerEmail} | {b.customerPhone}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Service ID: {b.serviceId} | {b.date} {b.time}
              </div>
              <div className="mb-2">
                <span className="font-bold text-purple-700">
                  ${b.totalPrice}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-gray-400 mb-2">
                <span
                  className={
                    b.status === "confirmed"
                      ? "text-green-600"
                      : b.status === "cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </span>
                {b.status === "pending" && (
                  <>
                    <button
                      className="text-blue-600 underline"
                      onClick={() => handleStatus(b.id, "confirm")}
                    >
                      Confirm
                    </button>
                    <button
                      className="text-red-600 underline"
                      onClick={() => handleStatus(b.id, "cancel")}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
              <Link
                to={`/admin/bookings/${b.id}/edit`}
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

export default BookingList;
