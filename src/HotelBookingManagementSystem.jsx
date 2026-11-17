import React, { useState, useEffect } from "react";
import "./HotelBookingManagementSystem.css";

const initialRoomsData = [
  {
    id: 1,
    name: "Sea View Royal Suite",
    destination: "Visakhapatnam",
    hotelName: "Novotel",
    category: "Suite",
    pricePerNight: 12999,
    maxGuests: 4,
    available: true,
    image:
      "https://fusionresorts.com/danang/wp-content/uploads/2024/07/THUMBNAIL-Ocean-view-suite-1-1024x683.webp",
    amenities: ["Sea View", "Private Balcony", "Free Breakfast", "King Size Bed", "High-Speed Wi-Fi"],
    description:
      "Private sun deck, endless ocean horizons, a marble bath, and a daily complimentary breakfast spread."
  },
  {
    id: 2,
    name: "Deluxe King",
    destination: "Hyderabad",
    hotelName: "Taj Falaknuma Palace",
    category: "Deluxe",
    pricePerNight: 8999,
    maxGuests: 2,
    available: true,
    image:
      "https://assets.oakshotels.com/image/upload/q_auto,f_auto,c_limit,w_1045/media/minor/oaks/images/china/chengdu/rooms/1_deluxe_king_room/oaks_chengdu_at_cultural-_heritage_park_guest_room_deluxe_room_king-crpd-800x556.jpg",
    amenities: ["Balcony View", "Pool Access", "Smart TV", "King Bed", "Air Conditioning"],
    description:
      "Sleek contemporary interiors accented with local Hyderabadi artistry and direct poolside access."
  },
  {
    id: 3,
    name: "Super Hills Villa",
    destination: "Alleppey",
    hotelName: "Marari Villas",
    category: "Villa",
    pricePerNight: 17999,
    maxGuests: 4,
    available: true,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    amenities: ["River Garden View", "Fireplace", "Free Parking", "Kitchenette", "Wi-Fi"],
    description:
      "Set between serene backwaters and golden sands, featuring an open-air garden bath and private dining pavilion."
  },
  {
    id: 4,
    name: "Executive Room",
    destination: "Mysuru",
    hotelName: "Radisson Blu Hotel",
    category: "Executive",
    pricePerNight: 5999,
    maxGuests: 2,
    available: true,
    image:
      "https://img.freepik.com/premium-photo/modern-luxury-hotel-room-with-city-skyline-view_825767-39650.jpg",
    amenities: ["Ergonomic Desk", "Gym Access", "Express Check-in", "Coffee Maker", "Wi-Fi"],
    description:
      "Tailored for corporate stays in Mysuru, featuring an ergonomic workspace, acoustic windows, and exclusive rooftop lounge privileges"
  },
  {
    id: 5,
    name: "Summertime",
    destination: "Goa",
    hotelName: "Taj Exotica Resort & Spa",
    category: "Villa",
    pricePerNight: 17999,
    maxGuests: 3,
    available: true,
    image:
      "https://discerning.wp-cdn.site/wp-content/uploads/2024/11/16235456/Villa-Max-View-Sitting-Room-With-Wide-Screen-Views.jpg",
    amenities: ["Beach Access", "Plunge Pool", "Free Breakfast", "Mini Bar", "Wi-Fi"],
    description:
      "Beachfront Goa with a private plunge pool, outdoor rain shower, and coastal dining perks"
  },
  {
    id: 6,
    name: "Standard Luxury Twin Room",
    destination: "Delhi",
    hotelName: "The Oberoi",
    category: "Standard",
    pricePerNight: 7899,
    maxGuests: 2,
    available: false,
    image:
      "https://mistyhills.co.za/images/2019/01/25/misty-hills-deluxe-superior-room-01-.jpg",
    amenities: ["Twin Beds", "Wi-Fi", "Room Service", "Air Conditioning"],
    description:
      "Cozy city-center accommodation close to India Gate, Khan Market, and Lodhi Gardens."
  }
];

const initialBookingsSample = [
  {
    bookingId: 1,
    roomId: 1,
    roomName: "Sea View Royal Suite",
    hotelName: "Novotel",
    destination: "Visakhapatnam",
    image:
      "https://fusionresorts.com/danang/wp-content/uploads/2024/07/THUMBNAIL-Ocean-view-suite-1-1024x683.webp",
    checkIn: "2026-11-20",
    checkOut: "2026-11-23",
    nights: 3,
    guests: 2,
    guestName: "Devapuja YugaRaja Vamsi",
    guestEmail: "vamsi@gmail.com",
    guestPhone: "+91 9876543224",
    specialRequest: "Early check-in if available",
    pricePerNight: 12999,
    taxes: 3999,
    totalPrice: 16998,
    status: "Confirmed",
    createdAt: "16-11-2026"
  }
];

const defaultProfile = {
  fullName: "",
  email: "@gmail.com",
  phone: "+91 ",
  city: "",
  preferredRoomType: "Suite",
  newsletter: true,
  smsAlerts: true
};

const getTodayDate = () => new Date().toISOString().split("T")[0];

const getFutureDate = (daysToAdd) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split("T")[0];
};

const formatDisplayDate = (isoDate) => {
  if (!isoDate) return "";
  const parts = isoDate.split("-");
  if (parts.length !== 3) return isoDate;
  const [year, month, day] = parts;
  return `${day}-${month}-${year}`;
};

export default function HotelBookingManagementSystem() {
  const [activeTab, setActiveTab] = useState("explore");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem("stayEaseRooms");
    return saved ? JSON.parse(saved) : initialRoomsData;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("stayEaseBookings");
    return saved ? JSON.parse(saved) : initialBookingsSample;
  });

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("stayEaseProfile");
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  // Search & Filter states
  const [searchDestination, setSearchDestination] = useState("");
  const [checkIn, setCheckIn] = useState(getFutureDate(1));
  const [checkOut, setCheckOut] = useState(getFutureDate(3));
  const [guestCount, setGuestCount] = useState(2);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [maxPriceFilter, setMaxPriceFilter] = useState(20000);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Room Details & Booking states
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingRoom, setBookingRoom] = useState(null);
  const [guestForm, setGuestForm] = useState({
    guestName: profile.fullName,
    guestEmail: profile.email,
    guestPhone: profile.phone,
    specialRequest: ""
  });
  const [formError, setFormError] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Admin states
  const [newRoom, setNewRoom] = useState({
    name: "",
    destination: "",
    hotelName: "",
    category: "Deluxe",
    pricePerNight: "",
    maxGuests: 2,
    image:
      "https://www.braviahotels.com/storage/all-images/panchsheel/deluxe-room/cg-00306-copy.jpg",
    amenities: "Wi-Fi, Air Conditioning, Smart TV, Free Breakfast",
    description: ""
  });
  const [adminMessage, setAdminMessage] = useState("");
  const [profileMessage, setProfileMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("stayEaseRooms", JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem("stayEaseBookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("stayEaseProfile", JSON.stringify(profile));
  }, [profile]);

  const calculateNights = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate.getTime() - startDate.getTime();
    const nights = Math.ceil(diff / (1000 * 3600 * 24));
    return nights > 0 ? nights : 0;
  };

  const nightsCount = calculateNights(checkIn, checkOut);

  const validateDatesAndGuests = (start, end, guests) => {
    const today = getTodayDate();
    if (!start || !end) {
      return "Please select both check-in and check-out dates.";
    }
    if (start < today) {
      return "Check-in date cannot be in the past.";
    }
    if (end <= start) {
      return "Check-out date must be at least 1 day after check-in.";
    }
    if (guests < 1 || guests > 8) {
      return "Guest count must be between 1 and 8.";
    }
    return "";
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const err = validateDatesAndGuests(checkIn, checkOut, guestCount);
    setSearchError(err);
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesDestination =
      room.destination.toLowerCase().includes(searchDestination.toLowerCase()) ||
      room.hotelName.toLowerCase().includes(searchDestination.toLowerCase()) ||
      room.name.toLowerCase().includes(searchDestination.toLowerCase());
    const matchesGuests = room.maxGuests >= Number(guestCount);
    const matchesCategory =
      categoryFilter === "All" || room.category === categoryFilter;
    const matchesPrice = room.pricePerNight <= Number(maxPriceFilter);
    const matchesAvailability = onlyAvailable ? room.available : true;

    return (
      matchesDestination &&
      matchesGuests &&
      matchesCategory &&
      matchesPrice &&
      matchesAvailability
    );
  });

  const handleStartBooking = (room) => {
    const err = validateDatesAndGuests(checkIn, checkOut, guestCount);
    if (err) {
      setSearchError(err);
      return;
    }
    setSearchError("");
    setSelectedRoom(null);
    setBookingRoom(room);
    setGuestForm({
      guestName: profile.fullName,
      guestEmail: profile.email,
      guestPhone: profile.phone,
      specialRequest: ""
    });
    setFormError("");
    setActiveTab("bookForm");
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const dateErr = validateDatesAndGuests(checkIn, checkOut, guestCount);
    if (dateErr) {
      setFormError(dateErr);
      return;
    }
    if (!guestForm.guestName.trim() || !guestForm.guestEmail.trim() || !guestForm.guestPhone.trim()) {
      setFormError("Please complete all required guest contact fields.");
      return;
    }
    if (!guestForm.guestEmail.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }

    const subtotal = bookingRoom.pricePerNight * nightsCount;
    const taxes = Math.round(subtotal * 0.12);
    const totalPrice = subtotal + taxes;

    const nextId =
      bookings.length > 0
        ? Math.max(...bookings.map((b) => Number(b.bookingId) || 0)) + 1
        : 1;

    const newBooking = {
      bookingId: nextId,
      roomId: bookingRoom.id,
      roomName: bookingRoom.name,
      hotelName: bookingRoom.hotelName,
      destination: bookingRoom.destination,
      image: bookingRoom.image,
      checkIn,
      checkOut,
      nights: nightsCount,
      guests: Number(guestCount),
      guestName: guestForm.guestName,
      guestEmail: guestForm.guestEmail,
      guestPhone: guestForm.guestPhone,
      specialRequest: guestForm.specialRequest || "None",
      pricePerNight: bookingRoom.pricePerNight,
      taxes,
      totalPrice,
      status: "Confirmed",
      createdAt: formatDisplayDate(getTodayDate())
    };

    setBookings([newBooking, ...bookings]);
    setConfirmedBooking(newBooking);
    setBookingRoom(null);
    setActiveTab("confirmation");
  };

  const handleCancelBooking = (bookingId) => {
    const updated = bookings.map((item) =>
      item.bookingId === bookingId ? { ...item, status: "Cancelled" } : item
    );
    setBookings(updated);
  };

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    const updated = bookings.map((item) =>
      item.bookingId === bookingId ? { ...item, status: newStatus } : item
    );
    setBookings(updated);
  };

  const handleAddRoom = (e) => {
    e.preventDefault();
    if (!newRoom.name.trim() || !newRoom.destination.trim() || !newRoom.pricePerNight) {
      setAdminMessage("Please Fill Room Name, Destination, and Price.");
      return;
    }
    const created = {
      id: Date.now(),
      name: newRoom.name,
      destination: newRoom.destination,
      hotelName: newRoom.hotelName || "Grand Stay Hotel",
      category: newRoom.category,
      pricePerNight: Number(newRoom.pricePerNight),
      maxGuests: Number(newRoom.maxGuests),
      available: true,
      image: newRoom.image,
      amenities: newRoom.amenities.split(",").map((a) => a.trim()).filter(Boolean),
      description:
        newRoom.description ||
        "Spacious modern room equipped with curated amenities for a comfortable stay."
    };

    setRooms([created, ...rooms]);
    setNewRoom({
      name: "",
      destination: "",
      hotelName: "",
      category: "Deluxe",
      pricePerNight: "",
      maxGuests: 2,
      image:
        "https://www.braviahotels.com/storage/all-images/panchsheel/deluxe-room/cg-00306-copy.jpg",
      amenities: "Wi-Fi, Air Conditioning, Smart TV, Free Breakfast",
      description: ""
    });
    setAdminMessage("New room added to catalogue successfully.");
    setTimeout(() => setAdminMessage(""), 3000);
  };

  const handlePriceUpdate = (roomId, updatedPrice) => {
    const priceNum = Number(updatedPrice);
    if (priceNum < 500) return;
    setRooms(
      rooms.map((room) =>
        room.id === roomId ? { ...room, pricePerNight: priceNum } : room
      )
    );
  };

  const handleToggleAvailability = (roomId) => {
    setRooms(
      rooms.map((room) =>
        room.id === roomId ? { ...room, available: !room.available } : room
      )
    );
  };

  const handleDeleteRoom = (roomId) => {
    setRooms(rooms.filter((room) => room.id !== roomId));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfileMessage("Profile preferences saved successfully.");
    setTimeout(() => setProfileMessage(""), 3000);
  };

  const switchNav = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const confirmedCount = bookings.filter((b) => b.status === "Confirmed").length;
  const cancelledCount = bookings.filter((b) => b.status === "Cancelled").length;
  const totalRevenue = bookings
    .filter((b) => b.status === "Confirmed")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="hotelApp">
      {/* Top Navigation */}
      <header className="navbar">
        <div className="navContainer">
          <div className="brandLogo" onClick={() => switchNav("explore")}>
            <span className="brandTitle">Booking.com</span>
          </div>

          <button
            className="mobileMenuBtn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>

          <nav className={`navigation ${mobileMenuOpen ? "navOpen" : ""}`}>
            <button
              className={`navLink ${activeTab === "explore" ? "activeLink" : ""}`}
              onClick={() => switchNav("explore")}
            >
              Explore Rooms
            </button>
            <button
              className={`navLink ${activeTab === "myBookings" ? "activeLink" : ""}`}
              onClick={() => switchNav("myBookings")}
            >
              My Bookings ({bookings.length})
            </button>
            <button
              className={`navLink ${activeTab === "dashboard" ? "activeLink" : ""}`}
              onClick={() => switchNav("dashboard")}
            >
              Booking Dashboard
            </button>
            <button
              className={`navLink ${activeTab === "admin" ? "activeLink" : ""}`}
              onClick={() => switchNav("admin")}
            >
              Admin
            </button>
            <button
              className={`navLink ${activeTab === "profile" ? "activeLink" : ""}`}
              onClick={() => switchNav("profile")}
            >
              Profile
            </button>
          </nav>
        </div>
      </header>

      {/* MODULE 1, 3, 4: Landing Page, Search & Catalogue */}
      {activeTab === "explore" && (
        <main className="mainContent">
          <section className="heroBanner">
            <div className="heroOverlay">
              <h1 className="heroTitle">Where Timeless Comfort Meets Effortless Luxury</h1>
              <p className="heroSubtitle">
                Top-Rated Airport Suites, Conference Resorts, and Business-Ready Rooms Booked in a Click.
              </p>

              <form className="searchBar" onSubmit={handleSearchSubmit}>
                <div className="searchField">
                  <label className="searchLabel">Destination or Hotel name</label>
                  <input
                    className="searchInput"
                    type="text"
                    placeholder="Ex :- Visakhapatnam, Goa, Alleppey..."
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                  />
                </div>

                <div className="searchField">
                  <label className="searchLabel">Check-In</label>
                  <input
                    className="searchInput"
                    type="date"
                    min={getTodayDate()}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>

                <div className="searchField">
                  <label className="searchLabel">Check-Out</label>
                  <input
                    className="searchInput"
                    type="date"
                    min={checkIn || getTodayDate()}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>

                <div className="searchField">
                  <label className="searchLabel">No. of Guests</label>
                  <input
                    className="searchInput"
                    type="number"
                    min="1"
                    max="8"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                  />
                </div>

                <button type="submit" className="primaryBtn searchBtn">
                  Check Availability
                </button>
              </form>

              {searchError && <p className="errorBanner">{searchError}</p>}
            </div>
          </section>

          {/* Filter Strip */}
          <section className="filterSection">
            <div className="filterGroup">
              <label className="filterLabel">Category :</label>
              <select
                className="filterSelect"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Suite">Suite</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Villa">Villa</option>
                <option value="Executive">Executive</option>
                <option value="Standard">Standard</option>
              </select>
            </div>

            <div className="filterGroup">
              <label className="filterLabel">
                Max Price : ₹{maxPriceFilter.toLocaleString()}/night
              </label>
              <input
                className="rangeSlider"
                type="range"
                min="3000"
                max="20000"
                step="500"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
              />
            </div>

            <label className="checkboxLabel">
              <input
                className="checkboxInput"
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
              />
              Available Rooms Only
            </label>

            <div className="staySummaryPill">
              {nightsCount > 0
                ? `${nightsCount} Night${nightsCount > 1 ? "s" : ""} • ${guestCount} Guest${guestCount > 1 ? "s" : ""}`
                : "Select valid dates"}
            </div>
          </section>

          {/* Room Catalogue Grid */}
          <section className="catalogueSection">
            <div className="sectionHeader">
              <h2 className="sectionTitle">Available Stays ({filteredRooms.length})</h2>
              {searchDestination && (
                <button
                  className="textBtn"
                  onClick={() => {
                    setSearchDestination("");
                    setCategoryFilter("All");
                    setMaxPriceFilter(20000);
                    setOnlyAvailable(false);
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>

            {filteredRooms.length === 0 ? (
              <div className="emptyState">
                <h3 className="emptyStateTitle">No rooms match your search criteria</h3>
                <p className="emptyStateText">
                  Try adjusting your destination, guest count, or maximum nightly budget.
                </p>
              </div>
            ) : (
              <div className="roomsGrid">
                {filteredRooms.map((room) => {
                  const estimatedStay = room.pricePerNight * (nightsCount || 1);
                  return (
                    <article key={room.id} className="roomCard">
                      <div className="roomImageWrap">
                        <img
                          className="roomCardImage"
                          src={room.image}
                          alt={room.name}
                        />
                        <span className="categoryBadge">{room.category}</span>
                        <span
                          className={`statusBadge cardStatusBadge ${
                            room.available ? "statusAvailable" : "statusSoldOut"
                          }`}
                        >
                          {room.available ? "Available" : "Sold Out"}
                        </span>
                      </div>

                      <div className="roomCardBody">
                        <div className="roomLocation">
                          {room.hotelName} • {room.destination}
                        </div>
                        <h3 className="roomCardTitle">{room.name}</h3>
                        <p className="roomDesc">{room.description}</p>

                        <div className="amenitiesList">
                          {room.amenities.slice(0, 3).map((item, idx) => (
                            <span key={idx} className="amenityTag">
                              {item}
                            </span>
                          ))}
                          {room.amenities.length > 3 && (
                            <span className="amenityTag">
                              +{room.amenities.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="roomMeta">
                          <span className="metaItem">Max {room.maxGuests} Guests</span>
                          <span className="metaItem">
                            Approx for. {nightsCount || 1} night(s) :{" "}
                            <strong className="metaHighlight">
                              ₹{estimatedStay.toLocaleString()}
                            </strong>
                          </span>
                        </div>

                        <div className="roomCardFooter">
                          <div className="priceBlock">
                            <span className="priceAmount">
                              ₹{room.pricePerNight.toLocaleString()}
                            </span>
                            <span className="priceUnit"> / night</span>
                          </div>

                          <div className="cardActions">
                            <button
                              className="secondaryBtn"
                              onClick={() => setSelectedRoom(room)}
                            >
                              Details
                            </button>
                            <button
                              className="primaryBtn"
                              disabled={!room.available}
                              onClick={() => handleStartBooking(room)}
                            >
                              {room.available ? "Book Now" : "Unavailable"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </main>
      )}

      {/* MODULE 2: Room Details Modal */}
      {selectedRoom && (
        <div className="modalBackdrop" onClick={() => setSelectedRoom(null)}>
          <div className="modalBox" onClick={(e) => e.stopPropagation()}>
            <button className="closeModalBtn" onClick={() => setSelectedRoom(null)}>
              ✕
            </button>
            <img
              src={selectedRoom.image}
              alt={selectedRoom.name}
              className="modalHeroImage"
            />
            <div className="modalBody">
              <div className="modalHeaderRow">
                <div className="modalTitleGroup">
                  <span className="categoryBadgeInline">{selectedRoom.category}</span>
                  <h2 className="modalTitle">{selectedRoom.name}</h2>
                  <p className="roomLocation">
                    {selectedRoom.hotelName}, {selectedRoom.destination}
                  </p>
                </div>
                <div className="modalPrice">
                  ₹{selectedRoom.pricePerNight.toLocaleString()}
                  <span className="modalPriceUnit">/night</span>
                </div>
              </div>

              <p className="modalDescription">{selectedRoom.description}</p>

              <h4 className="modalSubtitle">Included Amenities</h4>
              <div className="amenitiesList">
                {selectedRoom.amenities.map((amenity, idx) => (
                  <span key={idx} className="amenityTag">
                    ✓ {amenity}
                  </span>
                ))}
              </div>

              <div className="modalFooter">
                <span className="modalCapacity">
                  Capacity : Up to {selectedRoom.maxGuests} Guests
                </span>
                <button
                  className="primaryBtn"
                  disabled={!selectedRoom.available}
                  onClick={() => handleStartBooking(selectedRoom)}
                >
                  {selectedRoom.available ? "Proceed to Book" : "Currently Unavailable"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 5: Booking Details & Guest Information Form */}
      {activeTab === "bookForm" && bookingRoom && (
        <main className="mainContent">
          <button className="textBtn backBtn" onClick={() => setActiveTab("explore")}>
            ← Back to Rooms
          </button>

          <div className="bookingLayout">
            <form className="bookingFormCard" onSubmit={handleConfirmBooking}>
              <h2 className="cardHeading">Guest & Stay Information</h2>
              <p className="subText">
                Review Your Dates & Enter Your Details to Confirm Your Reservation in Advance. <br></br>
                First to Book, First to Check-In.
              </p>
            
              {formError && <p className="errorBanner">{formError}</p>}

              <div className="formRow">
                <div className="formGroup">
                  <label className="formLabel">Check-In Date</label>
                  <input
                    className="formInput"
                    type="date"
                    min={getTodayDate()}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className="formGroup">
                  <label className="formLabel">Check-Out Date</label>
                  <input
                    className="formInput"
                    type="date"
                    min={checkIn || getTodayDate()}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
                <div className="formGroup">
                  <label className="formLabel">
                    Guests (Max {bookingRoom.maxGuests})
                  </label>
                  <input
                    className="formInput"
                    type="number"
                    min="1"
                    max={bookingRoom.maxGuests}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="formGroup">
                <label className="formLabel">Full Name *</label>
                <input
                  className="formInput"
                  type="text"
                  required
                  value={guestForm.guestName}
                  onChange={(e) =>
                    setGuestForm({ ...guestForm, guestName: e.target.value })
                  }
                />
              </div>

              <div className="formRow">
                <div className="formGroup">
                  <label className="formLabel">Email Address *</label>
                  <input
                    className="formInput"
                    type="email"
                    required
                    value={guestForm.guestEmail}
                    onChange={(e) =>
                      setGuestForm({ ...guestForm, guestEmail: e.target.value })
                    }
                  />
                </div>
                <div className="formGroup">
                  <label className="formLabel">Phone Number *</label>
                  <input
                    className="formInput"
                    type="tel"
                    required
                    value={guestForm.guestPhone}
                    onChange={(e) =>
                      setGuestForm({ ...guestForm, guestPhone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="formGroup">
                <label className="formLabel">Additional Requests (Optional)</label>
                <textarea
                  className="formTextarea"
                  rows="3"
                  placeholder="Late Check-In, Floor Priority, Airport Pickup..."
                  value={guestForm.specialRequest}
                  onChange={(e) =>
                    setGuestForm({ ...guestForm, specialRequest: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="primaryBtn fullWidthBtn">
                Confirm Reservation
              </button>
            </form>

            {/* Price Breakdown Sidebar */}
            <aside className="priceSummaryCard">
              <img
                className="summaryRoomImage"
                src={bookingRoom.image}
                alt={bookingRoom.name}
              />
              <div className="summaryContent">
                <h3 className="summaryRoomTitle">{bookingRoom.name}</h3>
                <p className="roomLocation">
                  {bookingRoom.hotelName} • {bookingRoom.destination}
                </p>

                <div className="summaryDivider" />

                <div className="summaryLine">
                  <span className="summaryLabel">Check-In</span>
                  <strong className="summaryValue">{formatDisplayDate(checkIn)}</strong>
                </div>
                <div className="summaryLine">
                  <span className="summaryLabel">Check-Out</span>
                  <strong className="summaryValue">{formatDisplayDate(checkOut)}</strong>
                </div>
                <div className="summaryLine">
                  <span className="summaryLabel">Duration</span>
                  <strong className="summaryValue">{nightsCount} Night(s)</strong>
                </div>
                <div className="summaryLine">
                  <span className="summaryLabel">Guests</span>
                  <strong className="summaryValue">{guestCount} Guest(s)</strong>
                </div>

                <div className="summaryDivider" />

                <div className="summaryLine">
                  <span className="summaryLabel">
                    ₹{bookingRoom.pricePerNight.toLocaleString()} × {nightsCount} nights
                  </span>
                  <span className="summaryValue">
                    ₹{(bookingRoom.pricePerNight * nightsCount).toLocaleString()}
                  </span>
                </div>
                <div className="summaryLine">
                  <span className="summaryLabel">Taxes & Service Fee (12%)</span>
                  <span className="summaryValue">
                    ₹
                    {Math.round(
                      bookingRoom.pricePerNight * nightsCount * 0.12
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="summaryTotal">
                  <span className="totalLabel">Total Payable</span>
                  <span className="totalValue">
                    ₹
                    {Math.round(
                      bookingRoom.pricePerNight * nightsCount * 1.12
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </main>
      )}

      {/* MODULE 6: Booking Confirmation Page */}
      {activeTab === "confirmation" && confirmedBooking && (
        <main className="mainContent">
          <div className="confirmationCard">
            <div className="successIcon">✓</div>
            <h2 className="confirmationTitle">Booking Confirmed!</h2>
            <p className="confirmationMessage">
              Your reservation at{" "}
              <strong className="highlightText">{confirmedBooking.hotelName}</strong> is
              locked in. A confirmation summary has been saved to your account.
            </p>

            <div className="ticketBox">
              <div className="ticketHeader">
                <span className="ticketLabel">Booking ID</span>
                <strong className="ticketId">{confirmedBooking.bookingId}</strong>
              </div>
              <div className="ticketGrid">
                <div className="ticketCell">
                  <small className="ticketFieldLabel">Room</small>
                  <p className="ticketFieldValue">{confirmedBooking.roomName}</p>
                </div>
                <div className="ticketCell">
                  <small className="ticketFieldLabel">Destination</small>
                  <p className="ticketFieldValue">{confirmedBooking.destination}</p>
                </div>
                <div className="ticketCell">
                  <small className="ticketFieldLabel">Check-In</small>
                  <p className="ticketFieldValue">
                    {formatDisplayDate(confirmedBooking.checkIn)}
                  </p>
                </div>
                <div className="ticketCell">
                  <small className="ticketFieldLabel">Check-Out</small>
                  <p className="ticketFieldValue">
                    {formatDisplayDate(confirmedBooking.checkOut)}
                  </p>
                </div>
                <div className="ticketCell">
                  <small className="ticketFieldLabel">Guest</small>
                  <p className="ticketFieldValue">{confirmedBooking.guestName}</p>
                </div>
                <div className="ticketCell">
                  <small className="ticketFieldLabel">Total Amount</small>
                  <p className="ticketFieldValue">
                    ₹{confirmedBooking.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="confirmationActions">
              <button
                className="primaryBtn"
                onClick={() => setActiveTab("myBookings")}
              >
                View My Bookings
              </button>
              <button
                className="secondaryBtn"
                onClick={() => setActiveTab("explore")}
              >
                Book Another Stay
              </button>
            </div>
          </div>
        </main>
      )}

      {/* MODULE 7: My Bookings Page with Cancellation UI */}
      {activeTab === "myBookings" && (
        <main className="mainContent">
          <div className="sectionHeader">
            <h2 className="sectionTitle">My Reservations ({bookings.length})</h2>
            <button className="primaryBtn" onClick={() => setActiveTab("explore")}>
              + New Booking
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="emptyState">
              <h3 className="emptyStateTitle">No bookings found</h3>
              <p className="emptyStateText">
                You haven't made any hotel reservations yet.
              </p>
              <button
                className="primaryBtn emptyStateBtn"
                onClick={() => setActiveTab("explore")}
              >
                Explore Rooms
              </button>
            </div>
          ) : (
            <div className="bookingsList">
              {bookings.map((item) => (
                <div key={item.bookingId} className="bookingItemCard">
                  <img
                    className="bookingItemImage"
                    src={item.image}
                    alt={item.roomName}
                  />
                  <div className="bookingItemDetails">
                    <div className="bookingTopRow">
                      <span className="bookingRef">ID : {item.bookingId}</span>
                      <span
                        className={`statusBadge ${
                          item.status === "Confirmed"
                            ? "statusAvailable"
                            : "statusSoldOut"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3 className="bookingRoomTitle">{item.roomName}</h3>
                    <p className="roomLocation">
                      {item.hotelName}, {item.destination}
                    </p>

                    <div className="bookingDatesRow">
                      <span className="bookingDateItem">
                        <strong className="dateBold">Check-In:</strong>{" "}
                        {formatDisplayDate(item.checkIn)}
                      </span>
                      <span className="bookingDateItem">
                        <strong className="dateBold">Check-Out:</strong>{" "}
                        {formatDisplayDate(item.checkOut)}
                      </span>
                      <span className="bookingDateItem">
                        <strong className="dateBold">Duration:</strong>{" "}
                        {item.nights} Night(s) • {item.guests} Guest(s)
                      </span>
                    </div>

                    <div className="bookingBottomRow">
                      <div className="bookingPriceInfo">
                        <small className="paidLabel">Total Paid</small>
                        <div className="priceAmount">
                          ₹{item.totalPrice.toLocaleString()}
                        </div>
                      </div>

                      {item.status === "Confirmed" && (
                        <button
                          className="dangerBtn"
                          onClick={() => handleCancelBooking(item.bookingId)}
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* MODULE 9: Booking Management Dashboard */}
      {activeTab === "dashboard" && (
        <main className="mainContent">
          <h2 className="sectionTitle">Booking Management Dashboard</h2>

          <div className="statsGrid">
            <div className="statCard">
              <span className="statLabel">Total Reservations</span>
              <h3 className="statValue">{bookings.length}</h3>
            </div>
            <div className="statCard">
              <span className="statLabel">Active Confirmed</span>
              <h3 className="statValue">{confirmedCount}</h3>
            </div>
            <div className="statCard">
              <span className="statLabel">Cancelled</span>
              <h3 className="statValue">{cancelledCount}</h3>
            </div>
            <div className="statCard">
              <span className="statLabel">Confirmed Revenue</span>
              <h3 className="statValue">₹{totalRevenue.toLocaleString()}</h3>
            </div>
          </div>

          <div className="tableContainer">
            <table className="dataTable">
              <thead className="tableHead">
                <tr className="tableRow">
                  <th className="tableHeaderCell">Booking ID</th>
                  <th className="tableHeaderCell">Guest</th>
                  <th className="tableHeaderCell">Room & Destination</th>
                  <th className="tableHeaderCell">Stay Dates</th>
                  <th className="tableHeaderCell">Total</th>
                  <th className="tableHeaderCell">Status</th>
                  <th className="tableHeaderCell">Action</th>
                </tr>
              </thead>
              <tbody className="tableBody">
                {bookings.length === 0 ? (
                  <tr className="tableRow">
                    <td colSpan="7" className="emptyTableCell">
                      No reservation records available.
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.bookingId} className="tableRow">
                      <td className="tableCell">
                        <strong className="tableBold">{b.bookingId}</strong>
                      </td>
                      <td className="tableCell">
                        <div className="cellPrimary">{b.guestName}</div>
                        <small className="cellSecondary">{b.guestPhone}</small>
                      </td>
                      <td className="tableCell">
                        <div className="cellPrimary">{b.roomName}</div>
                        <small className="cellSecondary">{b.destination}</small>
                      </td>
                      <td className="tableCell">
                        {formatDisplayDate(b.checkIn)} to{" "}
                        {formatDisplayDate(b.checkOut)} ({b.nights}N)
                      </td>
                      <td className="tableCell">
                        ₹{b.totalPrice.toLocaleString()}
                      </td>
                      <td className="tableCell">
                        <span
                          className={`statusBadge ${
                            b.status === "Confirmed"
                              ? "statusAvailable"
                              : "statusSoldOut"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="tableCell">
                        <select
                          className="statusSelect"
                          value={b.status}
                          onChange={(e) =>
                            handleUpdateBookingStatus(b.bookingId, e.target.value)
                          }
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Checked-In">Checked-In</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {/* MODULE 8: Admin Room & Pricing Management */}
      {activeTab === "admin" && (
        <main className="mainContent">
          <h2 className="sectionTitle">Admin Room & Pricing Management</h2>
          {adminMessage && <div className="successBanner">{adminMessage}</div>}

          <div className="adminLayout">
            <form className="adminFormCard" onSubmit={handleAddRoom}>
              <h3 className="cardHeading">Add New Room</h3>
              <div className="formGroup">
                <label className="formLabel">Room Name *</label>
                <input
                  className="formInput"
                  type="text"
                  placeholder="Ex :- Presidential Sea Suite"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                />
              </div>

              <div className="formRow">
                <div className="formGroup">
                  <label className="formLabel">Destination *</label>
                  <input
                    className="formInput"
                    type="text"
                    placeholder="Ex :- Hyderabad"
                    value={newRoom.destination}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, destination: e.target.value })
                    }
                  />
                </div>
                <div className="formGroup">
                  <label className="formLabel">Hotel Name</label>
                  <input
                    className="formInput"
                    type="text"
                    placeholder="Ex :- Hotel Green Park"
                    value={newRoom.hotelName}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, hotelName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="formRow">
                <div className="formGroup">
                  <label className="formLabel">Category</label>
                  <select
                    className="formSelect"
                    value={newRoom.category}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, category: e.target.value })
                    }
                  >
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Executive">Executive</option>
                    <option value="Suite">Suite</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>

                <div className="formGroup">
                  <label className="formLabel">Price / Night (₹) *</label>
                  <input
                    className="formInput"
                    type="number"
                    min="500"
                    placeholder="6499"
                    value={newRoom.pricePerNight}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, pricePerNight: e.target.value })
                    }
                  />
                </div>

                <div className="formGroup">
                  <label className="formLabel">Max Guests</label>
                  <input
                    className="formInput"
                    type="number"
                    min="1"
                    max="8"
                    value={newRoom.maxGuests}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, maxGuests: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="formGroup">
                <label className="formLabel">Amenities</label>
                <input
                  className="formInput"
                  type="text"
                  value={newRoom.amenities}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, amenities: e.target.value })
                  }
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Description</label>
                <textarea
                  className="formTextarea"
                  rows="2"
                  value={newRoom.description}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, description: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="primaryBtn fullWidthBtn">
                + Add Room to Explore Room Section
              </button>
            </form>

            <div className="adminInventoryCard">
              <h3 className="cardHeading">
                Manage Existing Hotel Rooms ({rooms.length})
              </h3>
              <div className="inventoryList">
                {rooms.map((room) => (
                  <div key={room.id} className="inventoryRow">
                    <div className="inventoryInfo">
                      <strong className="inventoryTitle">{room.name}</strong>
                      <div className="roomLocation">
                        {room.hotelName} • {room.destination} ({room.category})
                      </div>
                    </div>

                    <div className="inventoryControls">
                      <label className="inlinePriceLabel">
                        ₹
                        <input
                          className="inlinePriceInput"
                          type="number"
                          min="500"
                          step="100"
                          value={room.pricePerNight}
                          onChange={(e) =>
                            handlePriceUpdate(room.id, e.target.value)
                          }
                        />
                      </label>

                      <button
                        className={
                          room.available ? "secondaryBtn" : "primaryBtn"
                        }
                        onClick={() => handleToggleAvailability(room.id)}
                      >
                        {room.available ? "Mark Sold Out" : "Mark Available"}
                      </button>

                      <button
                        className="dangerBtn"
                        onClick={() => handleDeleteRoom(room.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* MODULE 10: Customer Profile & Settings */}
      {activeTab === "profile" && (
        <main className="mainContent">
          <div className="profileCard">
            <h2 className="cardHeading">Customer Profile & Preferences</h2>
            <p className="subText">
              Enter the Details Below :
            </p>

            {profileMessage && (
              <div className="successBanner">{profileMessage}</div>
            )}

            <form className="profileForm" onSubmit={handleProfileSave}>
              <div className="formRow">
                <div className="formGroup">
                  <label className="formLabel">Full Name</label>
                  <input
                    className="formInput"
                    type="text"
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                  />
                </div>
                <div className="formGroup">
                  <label className="formLabel">Home Town City Name</label>
                  <input
                    className="formInput"
                    type="text"
                    value={profile.city}
                    onChange={(e) =>
                      setProfile({ ...profile, city: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="formRow">
                <div className="formGroup">
                  <label className="formLabel">Email Address</label>
                  <input
                    className="formInput"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </div>
                <div className="formGroup">
                  <label className="formLabel">Mobile Number</label>
                  <input
                    className="formInput"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="formGroup">
                <label className="formLabel">Preferred Room Category</label>
                <select
                  className="formSelect"
                  value={profile.preferredRoomType}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      preferredRoomType: e.target.value
                    })
                  }
                >
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Executive">Executive</option>
                  <option value="Suite">Suite</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>

              <div className="settingsToggles">
                <label className="checkboxLabel">
                  <input
                    className="checkboxInput"
                    type="checkbox"
                    checked={profile.smsAlerts}
                    onChange={(e) =>
                      setProfile({ ...profile, smsAlerts: e.target.checked })
                    }
                  />
                  Receive SMS check-in reminders
                </label>

                <label className="checkboxLabel">
                  <input
                    className="checkboxInput"
                    type="checkbox"
                    checked={profile.newsletter}
                    onChange={(e) =>
                      setProfile({ ...profile, newsletter: e.target.checked })
                    }
                  />
                  Receive seasonal resort offers
                </label>
              </div>

              <button type="submit" className="primaryBtn">
                Save Settings
              </button>
            </form>
          </div>
        </main>
      )}
    </div>
  );
}