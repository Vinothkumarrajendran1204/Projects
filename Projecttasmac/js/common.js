/**
 * UNAKKU AVLOTHA LIMIT (UAL)
 * "Know Your Limit • Book Responsibly • Stay Safe"
 * Student / Demo Project – Not an Official TASMAC Website
 * Shared State Engine, Mock Database & UI Renderers
 */

const UAL_DB = {
  districts: [
    {
      id: "chennai",
      name: "Chennai",
      nameTamil: "சென்னை",
      cities: ["Anna Nagar", "T. Nagar", "Velachery", "Adyar", "Nungambakkam", "Ambattur", "Mylapore", "Royapettah"]
    },
    {
      id: "coimbatore",
      name: "Coimbatore",
      nameTamil: "கோயம்புத்தூர்",
      cities: ["Gandhipuram", "RS Puram", "Peelamedu", "Saibaba Colony", "Singanallur", "Saravanampatti"]
    },
    {
      id: "madurai",
      name: "Madurai",
      nameTamil: "மதுரை",
      cities: ["KK Nagar", "Anna Nagar", "Simmakkal", "Mattuthavani", "Periyar", "Goripalayam"]
    },
    {
      id: "trichy",
      name: "Tiruchirappalli",
      nameTamil: "திருச்சிராப்பள்ளி",
      cities: ["Thillai Nagar", "Cantonment", "Srirangam", "KK Nagar", "Central Bus Stand"]
    },
    {
      id: "salem",
      name: "Salem",
      nameTamil: "சேலம்",
      cities: ["Fairlands", "Salem Junction", "Hasthampatti", "Suramangalam", "Alagapuram"]
    },
    {
      id: "tirunelveli",
      name: "Tirunelveli",
      nameTamil: "திருநெல்வேலி",
      cities: ["Palayamkottai", "Tirunelveli Junction", "Vannarpettai", "Town"]
    },
    {
      id: "vellore",
      name: "Vellore",
      nameTamil: "வேலூர்",
      cities: ["Katpadi", "Gandhi Nagar", "Bagayam", "Sathuvachari"]
    }
  ],

  shops: [
    {
      id: "UAL-CHE-101",
      name: "TASMAC Elite Outlet #101 – Anna Nagar",
      district: "Chennai",
      city: "Anna Nagar",
      address: "Shop No. 42, 2nd Avenue, AB Block, Anna Nagar West, Chennai - 600040",
      landmark: "Opposite Tower Park Gate 2",
      pincode: "600040",
      phone: "044-26210101",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 0.8,
      stockStatus: "High Stock",
      timeSlots: [
        { id: "slot-1", label: "10:00 AM – 11:00 AM", capacity: 25, booked: 12 },
        { id: "slot-2", label: "11:00 AM – 12:00 PM", capacity: 25, booked: 20 },
        { id: "slot-3", label: "12:00 PM – 1:00 PM", capacity: 30, booked: 30 }, // full slot test
        { id: "slot-4", label: "1:00 PM – 2:00 PM", capacity: 30, booked: 14 },
        { id: "slot-5", label: "2:00 PM – 3:00 PM", capacity: 25, booked: 9 },
        { id: "slot-6", label: "3:00 PM – 4:00 PM", capacity: 25, booked: 15 },
        { id: "slot-7", label: "4:00 PM – 5:00 PM", capacity: 30, booked: 22 },
        { id: "slot-8", label: "5:00 PM – 6:00 PM", capacity: 30, booked: 28 },
        { id: "slot-9", label: "6:00 PM – 7:00 PM", capacity: 35, booked: 31 },
        { id: "slot-10", label: "7:00 PM – 8:00 PM", capacity: 35, booked: 26 },
        { id: "slot-11", label: "8:00 PM – 9:00 PM", capacity: 30, booked: 18 }
      ],
      inventory: {
        "HOT-01": 35, "HOT-02": 24, "HOT-03": 40, "HOT-04": 18, "HOT-05": 25, "HOT-06": 15,
        "NON-01": 70, "NON-02": 55, "NON-03": 40, "NON-04": 50, "NON-05": 30, "NON-06": 28
      }
    },
    {
      id: "UAL-CHE-205",
      name: "TASMAC Retail Outlet #205 – T. Nagar",
      district: "Chennai",
      city: "T. Nagar",
      address: "Door No. 18, South Usman Road, T. Nagar, Chennai - 600017",
      landmark: "Near Panagal Park Flyover",
      pincode: "600017",
      phone: "044-24342050",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 1.6,
      stockStatus: "Moderate Stock",
      timeSlots: [
        { id: "slot-1", label: "10:00 AM – 11:00 AM", capacity: 20, booked: 8 },
        { id: "slot-2", label: "11:00 AM – 12:00 PM", capacity: 20, booked: 15 },
        { id: "slot-3", label: "12:00 PM – 1:00 PM", capacity: 25, booked: 25 },
        { id: "slot-4", label: "1:00 PM – 2:00 PM", capacity: 25, booked: 12 },
        { id: "slot-5", label: "2:00 PM – 3:00 PM", capacity: 20, booked: 7 },
        { id: "slot-6", label: "3:00 PM – 4:00 PM", capacity: 20, booked: 11 },
        { id: "slot-7", label: "4:00 PM – 5:00 PM", capacity: 25, booked: 19 },
        { id: "slot-8", label: "5:00 PM – 6:00 PM", capacity: 25, booked: 24 },
        { id: "slot-9", label: "6:00 PM – 7:00 PM", capacity: 30, booked: 27 },
        { id: "slot-10", label: "7:00 PM – 8:00 PM", capacity: 30, booked: 21 },
        { id: "slot-11", label: "8:00 PM – 9:00 PM", capacity: 25, booked: 16 }
      ],
      inventory: {
        "HOT-01": 20, "HOT-02": 15, "HOT-03": 30, "HOT-07": 25, "HOT-08": 30,
        "NON-01": 50, "NON-02": 65, "NON-04": 35, "NON-06": 20
      }
    },
    {
      id: "UAL-CHE-309",
      name: "TASMAC Elite Store #309 – Velachery",
      district: "Chennai",
      city: "Velachery",
      address: "Basement L1, Phoenix Marketcity, Velachery Main Road, Chennai - 600042",
      landmark: "Phoenix Marketcity L1",
      pincode: "600042",
      phone: "044-43593090",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 2.7,
      stockStatus: "High Stock",
      timeSlots: [
        { id: "slot-1", label: "10:00 AM – 11:00 AM", capacity: 30, booked: 10 },
        { id: "slot-2", label: "11:00 AM – 12:00 PM", capacity: 30, booked: 18 },
        { id: "slot-3", label: "12:00 PM – 1:00 PM", capacity: 35, booked: 26 },
        { id: "slot-4", label: "1:00 PM – 2:00 PM", capacity: 35, booked: 16 },
        { id: "slot-5", label: "2:00 PM – 3:00 PM", capacity: 30, booked: 12 },
        { id: "slot-6", label: "3:00 PM – 4:00 PM", capacity: 30, booked: 15 },
        { id: "slot-7", label: "4:00 PM – 5:00 PM", capacity: 35, booked: 28 },
        { id: "slot-8", label: "5:00 PM – 6:00 PM", capacity: 35, booked: 32 },
        { id: "slot-9", label: "6:00 PM – 7:00 PM", capacity: 40, booked: 35 },
        { id: "slot-10", label: "7:00 PM – 8:00 PM", capacity: 40, booked: 30 },
        { id: "slot-11", label: "8:00 PM – 9:00 PM", capacity: 35, booked: 20 }
      ],
      inventory: {
        "HOT-01": 45, "HOT-02": 30, "HOT-03": 35, "HOT-04": 30, "HOT-05": 32, "HOT-06": 28,
        "NON-01": 90, "NON-02": 85, "NON-03": 50, "NON-04": 65, "NON-05": 40, "NON-06": 45
      }
    },
    {
      id: "UAL-CBE-412",
      name: "TASMAC Elite Store #412 – Gandhipuram",
      district: "Coimbatore",
      city: "Gandhipuram",
      address: "Cross Cut Road, 7th Street Corner, Gandhipuram, Coimbatore - 641012",
      landmark: "Behind GP Signal",
      pincode: "641012",
      phone: "0422-2494120",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 1.2,
      stockStatus: "High Stock",
      timeSlots: [
        { id: "slot-1", label: "10:00 AM – 11:00 AM", capacity: 25, booked: 6 },
        { id: "slot-2", label: "11:00 AM – 12:00 PM", capacity: 25, booked: 14 },
        { id: "slot-3", label: "12:00 PM – 1:00 PM", capacity: 30, booked: 22 },
        { id: "slot-4", label: "1:00 PM – 2:00 PM", capacity: 30, booked: 11 },
        { id: "slot-5", label: "2:00 PM – 3:00 PM", capacity: 25, booked: 8 },
        { id: "slot-6", label: "3:00 PM – 4:00 PM", capacity: 25, booked: 12 },
        { id: "slot-7", label: "4:00 PM – 5:00 PM", capacity: 30, booked: 18 },
        { id: "slot-8", label: "5:00 PM – 6:00 PM", capacity: 30, booked: 24 },
        { id: "slot-9", label: "6:00 PM – 7:00 PM", capacity: 35, booked: 28 },
        { id: "slot-10", label: "7:00 PM – 8:00 PM", capacity: 35, booked: 21 },
        { id: "slot-11", label: "8:00 PM – 9:00 PM", capacity: 30, booked: 14 }
      ],
      inventory: {
        "HOT-01": 32, "HOT-02": 22, "HOT-03": 38, "HOT-04": 19, "HOT-05": 26,
        "NON-01": 60, "NON-02": 65, "NON-03": 35, "NON-04": 48, "NON-05": 32
      }
    },
    {
      id: "UAL-MDU-505",
      name: "TASMAC Elite Store #505 – KK Nagar",
      district: "Madurai",
      city: "KK Nagar",
      address: "80 Feet Road, Near Arch, KK Nagar, Madurai - 625020",
      landmark: "Next to Apollo Hospital Link Rd",
      pincode: "625020",
      phone: "0452-2585050",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 1.5,
      stockStatus: "High Stock",
      timeSlots: [
        { id: "slot-1", label: "10:00 AM – 11:00 AM", capacity: 25, booked: 8 },
        { id: "slot-2", label: "11:00 AM – 12:00 PM", capacity: 25, booked: 13 },
        { id: "slot-3", label: "12:00 PM – 1:00 PM", capacity: 30, booked: 20 },
        { id: "slot-4", label: "1:00 PM – 2:00 PM", capacity: 30, booked: 10 },
        { id: "slot-5", label: "2:00 PM – 3:00 PM", capacity: 25, booked: 7 },
        { id: "slot-6", label: "3:00 PM – 4:00 PM", capacity: 25, booked: 11 },
        { id: "slot-7", label: "4:00 PM – 5:00 PM", capacity: 30, booked: 19 },
        { id: "slot-8", label: "5:00 PM – 6:00 PM", capacity: 30, booked: 25 },
        { id: "slot-9", label: "6:00 PM – 7:00 PM", capacity: 35, booked: 29 },
        { id: "slot-10", label: "7:00 PM – 8:00 PM", capacity: 35, booked: 23 },
        { id: "slot-11", label: "8:00 PM – 9:00 PM", capacity: 30, booked: 15 }
      ],
      inventory: {
        "HOT-01": 25, "HOT-02": 18, "HOT-03": 42, "HOT-04": 20, "HOT-07": 36,
        "NON-01": 55, "NON-02": 70, "NON-03": 25, "NON-04": 42, "NON-05": 28
      }
    }
  ],

  products: [
    // 🔥 HOT PRODUCTS (Whisky, Brandy, Rum, Vodka, Gin)
    {
      id: "HOT-01",
      name: "Antiquity Blue Ultra Premium Whisky",
      brand: "Antiquity",
      type: "HOT",
      category: "Whisky",
      size: "750ml (Bottle)",
      price: 1180,
      description: "Blend of imported Scotch malts and mature Indian grain spirits.",
      image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&auto=format&fit=crop&q=80",
      abv: "42.8%"
    },
    {
      id: "HOT-02",
      name: "Signature Premier Grain Whisky",
      brand: "Signature",
      type: "HOT",
      category: "Whisky",
      size: "750ml (Bottle)",
      price: 960,
      description: "Crafted with 8-year aged Scotch malts, charcoal filtered.",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80",
      abv: "42.8%"
    },
    {
      id: "HOT-03",
      name: "Old Monk The Legend Dark Rum",
      brand: "Old Monk",
      type: "HOT",
      category: "Rum",
      size: "750ml (Bottle)",
      price: 840,
      description: "Iconic vatted dark rum aged in oak casks with vanilla notes.",
      image: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop&q=80",
      abv: "42.8%"
    },
    {
      id: "HOT-04",
      name: "Morpheus XO Blended Premium Brandy",
      brand: "Morpheus",
      type: "HOT",
      category: "Brandy",
      size: "750ml (Bottle)",
      price: 1020,
      description: "Distilled from grapes and matured in French Limousin oak.",
      image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600&auto=format&fit=crop&q=80",
      abv: "42.8%"
    },
    {
      id: "HOT-05",
      name: "Smirnoff Triple Distilled Vodka",
      brand: "Smirnoff",
      type: "HOT",
      category: "Vodka",
      size: "750ml (Bottle)",
      price: 890,
      description: "Ten times charcoal filtered for exceptional smoothness.",
      image: "https://images.unsplash.com/photo-1550985543-f47f38aeee65?w=600&auto=format&fit=crop&q=80",
      abv: "40.0%"
    },
    {
      id: "HOT-06",
      name: "Greater Than London Dry Gin",
      brand: "Greater Than",
      type: "HOT",
      category: "Gin",
      size: "750ml (Bottle)",
      price: 1050,
      description: "Infused with Macedonian juniper, fennel, and citrus peel.",
      image: "https://images.unsplash.com/photo-1607622750671-6cd9a99eabd1?w=600&auto=format&fit=crop&q=80",
      abv: "42.8%"
    },
    {
      id: "HOT-07",
      name: "Royal Challenge Select Whisky",
      brand: "Royal Challenge",
      type: "HOT",
      category: "Whisky",
      size: "750ml (Bottle)",
      price: 790,
      description: "Distinct grain whisky blended with rich Scotch spirits.",
      image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&auto=format&fit=crop&q=80",
      abv: "42.8%"
    },
    {
      id: "HOT-08",
      name: "McDowell's No.1 Celebration Rum",
      brand: "McDowell's",
      type: "HOT",
      category: "Rum",
      size: "750ml (Bottle)",
      price: 680,
      description: "Warm caramel taste with smooth toasted molasses notes.",
      image: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop&q=80",
      abv: "42.8%"
    },

    // 🍺 NON-HOT PRODUCTS (Beer & Wine)
    {
      id: "NON-01",
      name: "Kingfisher Ultra Premium Lager",
      brand: "Kingfisher",
      type: "NON-HOT",
      category: "Beer",
      size: "650ml (Bottle)",
      price: 210,
      description: "Crisp, ultra-smooth premium lager brewed from imported malt.",
      image: "https://images.unsplash.com/photo-1608270114022-7711d9f8c634?w=600&auto=format&fit=crop&q=80",
      abv: "4.8%"
    },
    {
      id: "NON-02",
      name: "British Empire Super Strong Beer",
      brand: "British Empire",
      type: "NON-HOT",
      category: "Beer",
      size: "650ml (Bottle)",
      price: 230,
      description: "Full-bodied robust strong beer popular in Tamil Nadu.",
      image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&auto=format&fit=crop&q=80",
      abv: "7.8%"
    },
    {
      id: "NON-03",
      name: "Corona Extra Premium Imported Beer",
      brand: "Corona",
      type: "NON-HOT",
      category: "Beer",
      size: "355ml (Pint)",
      price: 260,
      description: "Refreshing imported Mexican lager, best served with lime.",
      image: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80",
      abv: "4.5%"
    },
    {
      id: "NON-04",
      name: "Heineken Silver Crisp Lager",
      brand: "Heineken",
      type: "NON-HOT",
      category: "Beer",
      size: "650ml (Bottle)",
      price: 240,
      description: "Cold-filtered at -1°C for smooth drinkability and crisp finish.",
      image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=600&auto=format&fit=crop&q=80",
      abv: "4.5%"
    },
    {
      id: "NON-05",
      name: "Sula Rasa Shiraz Reserve Red Wine",
      brand: "Sula",
      type: "NON-HOT",
      category: "Wine",
      size: "750ml (Bottle)",
      price: 1250,
      description: "Full-bodied red wine matured in French oak with peppery finish.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80",
      abv: "13.5%"
    },
    {
      id: "NON-06",
      name: "Jacob's Creek Classic Cabernet Sauvignon",
      brand: "Jacob's Creek",
      type: "NON-HOT",
      category: "Wine",
      size: "750ml (Bottle)",
      price: 1380,
      description: "Vibrant Australian red wine brimming with blackcurrant aromas.",
      image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&auto=format&fit=crop&q=80",
      abv: "13.9%"
    }
  ],

  // Mock Customers with full Aadhaar card identity & daily limit tracking details
  demoCustomers: [
    {
      aadhaarNumber: "456789012345",
      aadhaarFormatted: "4567 8901 2345",
      aadhaarMasked: "XXXX-XXXX-2345",
      customerId: "TN-DEMO-2345",
      name: "Rajesh Kannan",
      nameTamil: "ராஜேஷ் கண்ணன்",
      gender: "Male",
      dob: "1990-05-14",
      age: 34,
      careOf: "S/O K. Ramanathan",
      phone: "+91 98401 23456",
      phoneMasked: "******2345",
      address: "Door No. 42, 2nd Avenue, Block AB, Anna Nagar West, Chennai - 600040",
      district: "Chennai",
      city: "Anna Nagar",
      pincode: "600040",
      enrolmentNo: "2026/00142/08912",
      cardType: "Resident Individual (UIDAI Smart Card)",
      issuedDate: "2016-04-12",
      photo: "👤",
      qrData: "UIDAI:456789012345|NAME:Rajesh Kannan|DOB:1990-05-14|GEN:M|ADDR:Chennai-600040",
      isRestricted: false,
      restrictionStatus: "Cleared",
      restrictionCase: null,
      dailyLimits: {
        hotUsed: 0,
        hotMax: 1,
        nonHotUsed: 0,
        nonHotMax: 2,
        date: "2026-09-18"
      },
      personaNote: "Clean Customer: HOT 0/1, NON-HOT 0/2. All bookings available."
    },
    {
      aadhaarNumber: "345678901234",
      aadhaarFormatted: "3456 7890 1234",
      aadhaarMasked: "XXXX-XXXX-1234",
      customerId: "TN-DEMO-1234",
      name: "S. Murugan",
      nameTamil: "எஸ். முருகன்",
      gender: "Male",
      dob: "1985-11-22",
      age: 38,
      careOf: "S/O M. Subramanian",
      phone: "+91 94440 98765",
      phoneMasked: "******1234",
      address: "Door No. 18, South Usman Road, T. Nagar, Chennai - 600017",
      district: "Chennai",
      city: "T. Nagar",
      pincode: "600017",
      enrolmentNo: "2026/00142/07541",
      cardType: "Resident Individual (UIDAI Smart Card)",
      issuedDate: "2015-08-19",
      photo: "👤",
      qrData: "UIDAI:345678901234|NAME:S. Murugan|DOB:1985-11-22|GEN:M|ADDR:Chennai-600017",
      isRestricted: false,
      restrictionStatus: "Cleared",
      restrictionCase: null,
      dailyLimits: {
        hotUsed: 0,
        hotMax: 1,
        nonHotUsed: 1,
        nonHotMax: 2,
        date: "2026-09-18"
      },
      personaNote: "Active Customer: NON-HOT 1/2 used. Can only book 1 additional NON-HOT unit."
    },
    {
      aadhaarNumber: "901234567890",
      aadhaarFormatted: "9012 3456 7890",
      aadhaarMasked: "XXXX-XXXX-7890",
      customerId: "TN-DEMO-7890",
      name: "M. Vijay",
      nameTamil: "எம். விஜய்",
      gender: "Male",
      dob: "1992-03-08",
      age: 32,
      careOf: "S/O P. Manickam",
      phone: "+91 97910 44321",
      phoneMasked: "******7890",
      address: "Plot No. 105, 100 Feet Bypass Road, Velachery, Chennai - 600042",
      district: "Chennai",
      city: "Velachery",
      pincode: "600042",
      enrolmentNo: "2026/00142/09124",
      cardType: "Resident Individual (UIDAI Smart Card)",
      issuedDate: "2017-02-11",
      photo: "👤",
      qrData: "UIDAI:901234567890|NAME:M. Vijay|DOB:1992-03-08|GEN:M|ADDR:Chennai-600042",
      isRestricted: false,
      restrictionStatus: "Cleared",
      restrictionCase: null,
      dailyLimits: {
        hotUsed: 1,
        hotMax: 1,
        nonHotUsed: 2,
        nonHotMax: 2,
        date: "2026-09-18"
      },
      personaNote: "Limit Reached: HOT 1/1, NON-HOT 2/2. All bookings locked for today."
    },
    {
      aadhaarNumber: "789012345678",
      aadhaarFormatted: "7890 1234 5678",
      aadhaarMasked: "XXXX-XXXX-5678",
      customerId: "TN-DEMO-5678",
      name: "V. Anbarasan",
      nameTamil: "வி. அன்பரசன்",
      gender: "Male",
      dob: "1987-09-19",
      age: 37,
      careOf: "S/O T. Veluchamy",
      phone: "+91 99402 11987",
      phoneMasked: "******5678",
      address: "Flat 3B, Shanti Colony, 4th Main Road, Anna Nagar, Chennai - 600040",
      district: "Chennai",
      city: "Anna Nagar",
      pincode: "600040",
      enrolmentNo: "2026/00142/04481",
      cardType: "Resident Individual (UIDAI Smart Card)",
      issuedDate: "2015-10-04",
      photo: "👤",
      qrData: "UIDAI:789012345678|NAME:V. Anbarasan|DOB:1987-09-19|GEN:M|ADDR:Chennai-600040",
      isRestricted: true,
      restrictionStatus: "Temporarily Restricted (DUI)",
      restrictionCase: {
        category: "Drink-and-drive related restriction (Sec 185 MVA)",
        caseRef: "UAL-CASE-DUI-882",
        authority: "Traffic Investigation Wing & RTO",
        imposedDate: "2026-08-15",
        status: "Temporarily Restricted",
        notice: "Account Temporarily Restricted — Booking is currently unavailable."
      },
      dailyLimits: {
        hotUsed: 0,
        hotMax: 0,
        nonHotUsed: 0,
        nonHotMax: 0,
        date: "2026-09-18"
      },
      personaNote: "Restricted Account: Drink-and-drive case. Booking completely disabled."
    },
    {
      aadhaarNumber: "234567890123",
      aadhaarFormatted: "2345 6789 0123",
      aadhaarMasked: "XXXX-XXXX-0123",
      customerId: "TN-DEMO-0123",
      name: "K. Rahul (Minor - Age 17)",
      nameTamil: "கே. ராகுல் (சிறார் - 17 வயது)",
      gender: "Male",
      age: 17,
      dob: "2009-08-14",
      careOf: "S/O R. Krishnan",
      isUnderage: true,
      phone: "+91 98840 77123",
      phoneMasked: "******0123",
      address: "No. 15, Race Course Road, Guindy, Chennai - 600032",
      district: "Chennai",
      city: "Guindy",
      pincode: "600032",
      enrolmentNo: "2026/00142/02901",
      cardType: "Resident Individual (UIDAI Smart Card)",
      issuedDate: "2018-09-15",
      photo: "👤",
      qrData: "UIDAI:234567890123|NAME:K. Rahul|DOB:2009-08-14|GEN:M|ADDR:Chennai-600032",
      isRestricted: true,
      restrictionStatus: "Underage Minor Barred (<18)",
      restrictionCase: {
        category: "Underage Minor Prohibition (< 18 Years)",
        caseRef: "UAL-CASE-AGE-1704",
        authority: "TN Social Welfare Board & Prohibition Dept",
        imposedDate: "2026-01-01",
        status: "Temporarily Restricted",
        notice: "Statutory Restriction: Sale of alcohol to persons under 18/21 is strictly prohibited under TN Prohibition Act Sec 19."
      },
      dailyLimits: {
        hotUsed: 0,
        hotMax: 0,
        nonHotUsed: 0,
        nonHotMax: 0,
        date: "2026-09-18"
      },
      personaNote: "Underage Minor (Age 17): Prohibited under TN Prohibition Act Sec 19. All bookings locked."
    },
    {
      aadhaarNumber: "112233445566",
      aadhaarFormatted: "1122 3344 5566",
      aadhaarMasked: "XXXX-XXXX-5566",
      customerId: "TN-DEMO-5566",
      name: "P. Karthikeyan",
      nameTamil: "பி. கார்த்திகேயன்",
      gender: "Male",
      age: 34,
      dob: "1990-01-25",
      careOf: "S/O S. Perumal",
      phone: "+91 98410 99887",
      phoneMasked: "******5566",
      address: "Door No. 8, Ranganathan Street, T. Nagar, Chennai - 600017",
      district: "Chennai",
      city: "T. Nagar",
      pincode: "600017",
      enrolmentNo: "2026/00142/06633",
      cardType: "Resident Individual (UIDAI Smart Card)",
      issuedDate: "2016-12-05",
      photo: "👤",
      qrData: "UIDAI:112233445566|NAME:P. Karthikeyan|DOB:1990-01-25|GEN:M|ADDR:Chennai-600017",
      isRestricted: true,
      restrictionStatus: "Court Injunction (IPC 323/324)",
      restrictionCase: {
        category: "Court Order Injunction (Public Affray IPC 323/324)",
        caseRef: "UAL-CASE-CR-4512",
        authority: "Judicial Magistrate Court & City Police",
        imposedDate: "2026-07-10",
        status: "Temporarily Restricted",
        notice: "Court Mandated Injunction: TASMAC retail outlet restraining order."
      },
      dailyLimits: {
        hotUsed: 0,
        hotMax: 0,
        nonHotUsed: 0,
        nonHotMax: 0,
        date: "2026-09-18"
      },
      personaNote: "Court Injunction: Alcohol-related public disturbance (IPC 323/324). Booking barred."
    },
    {
      aadhaarNumber: "667788990011",
      aadhaarFormatted: "6677 8899 0011",
      aadhaarMasked: "XXXX-XXXX-0011",
      customerId: "TN-DEMO-0011",
      name: "M. Saravanan",
      nameTamil: "எம். சரவணன்",
      gender: "Male",
      age: 41,
      dob: "1983-06-12",
      careOf: "S/O D. Muthu",
      isBlacklisted: true,
      phone: "+91 97890 12345",
      phoneMasked: "******0011",
      address: "Old No. 71, Kutchery Road, Mylapore, Chennai - 600004",
      district: "Chennai",
      city: "Mylapore",
      pincode: "600004",
      enrolmentNo: "2026/00142/01198",
      cardType: "Resident Individual (UIDAI Smart Card)",
      issuedDate: "2014-03-27",
      photo: "👤",
      qrData: "UIDAI:667788990011|NAME:M. Saravanan|DOB:1983-06-12|GEN:M|ADDR:Chennai-600004",
      isRestricted: true,
      restrictionStatus: "Vigilance Blacklist (Bootlegging)",
      restrictionCase: {
        category: "Commercial Bootlegging Blacklist (TNPA Sec 4)",
        caseRef: "UAL-CASE-BLK-309",
        authority: "TASMAC State Vigilance Squad",
        imposedDate: "2026-06-01",
        status: "Temporarily Restricted",
        notice: "Vigilance Blacklist: Systemic illegal hoarding & resale under TNPA Sec 4."
      },
      dailyLimits: {
        hotUsed: 0,
        hotMax: 0,
        nonHotUsed: 0,
        nonHotMax: 0,
        date: "2026-09-18"
      },
      personaNote: "Vigilance Blacklist: Commercial bootlegging under TNPA Sec 4. Indefinitely revoked."
    },
    {
      aadhaarNumber: "999988887777",
      aadhaarFormatted: "9999 8888 7777",
      aadhaarMasked: "XXXX-XXXX-7777",
      customerId: "TN-DEMO-7777",
      name: "R. Karthik",
      nameTamil: "ஆர். கார்த்திக்",
      gender: "Male",
      age: 30,
      dob: "1994-10-04",
      careOf: "S/O G. Rajendran",
      phone: "+91 98405 67890",
      phoneMasked: "******890",
      address: "Door No. 12, 1st Main Road, Besant Nagar, Adyar, Chennai - 600090",
      district: "Chennai",
      city: "Adyar",
      pincode: "600090",
      enrolmentNo: "2026/00142/05562",
      cardType: "Resident Individual (UIDAI Smart Card)",
      issuedDate: "2016-07-22",
      photo: "👤",
      qrData: "UIDAI:999988887777|NAME:R. Karthik|DOB:1994-10-04|GEN:M|ADDR:Chennai-600090",
      isRestricted: true,
      restrictionStatus: "Temporarily Restricted (DUI Citation)",
      restrictionCase: {
        category: "Drink-and-drive violation notice (Sec 185 MVA)",
        caseRef: "UAL-CASE-DUI-9988",
        authority: "Adyar Traffic Police (TIW-South)",
        imposedDate: "2026-08-20",
        status: "Temporarily Restricted",
        notice: "Drink-and-drive violation notice. Retail quota booking suspended pending review."
      },
      dailyLimits: {
        hotUsed: 0,
        hotMax: 0,
        nonHotUsed: 0,
        nonHotMax: 0,
        date: "2026-09-18"
      },
      personaNote: "Restricted Account: Drink-and-drive notice (Sec 185 MVA). Bookings disabled."
    },
    {
      aadhaarNumber: "554433221100",
      aadhaarFormatted: "5544 3322 1100",
      aadhaarMasked: "XXXX-XXXX-1100",
      customerId: "TN-DEMO-1100",
      name: "Smt. Priya Sundaram",
      nameTamil: "திருமதி. பிரியா சுந்தரம்",
      gender: "Female",
      age: 33,
      dob: "1991-04-18",
      careOf: "W/O R. Sundaram",
      phone: "+91 98403 45678",
      phoneMasked: "******678",
      address: "Plot No. 28, Gandhi Nagar 1st Cross, Adyar, Chennai - 600020",
      district: "Chennai",
      city: "Adyar",
      pincode: "600020",
      enrolmentNo: "2026/00142/03389",
      cardType: "Resident Individual (UIDAI Smart Card)",
      issuedDate: "2015-11-30",
      photo: "👤",
      qrData: "UIDAI:554433221100|NAME:Priya Sundaram|DOB:1991-04-18|GEN:F|ADDR:Chennai-600020",
      isRestricted: false,
      restrictionStatus: "Cleared",
      restrictionCase: null,
      dailyLimits: {
        hotUsed: 0,
        hotMax: 1,
        nonHotUsed: 0,
        nonHotMax: 2,
        date: "2026-09-18"
      },
      personaNote: "Clean Customer: Wine & Beer Quota Active. Full booking availability."
    },
    {
      aadhaarNumber: "887766554433",
      aadhaarFormatted: "8877 6655 4433",
      aadhaarMasked: "XXXX-XXXX-4433",
      customerId: "TN-DEMO-4433",
      name: "A. Mohammed Farooq",
      nameTamil: "ஏ. முகமது பாரூக்",
      gender: "Male",
      age: 35,
      dob: "1989-12-05",
      careOf: "S/O K. Abdul Rahman",
      phone: "+91 94432 11223",
      phoneMasked: "******223",
      address: "Door No. 56, Cross Cut Road, Gandhipuram, Coimbatore - 641012",
      district: "Coimbatore",
      city: "Gandhipuram",
      pincode: "641012",
      enrolmentNo: "2026/00142/08871",
      cardType: "Resident Individual (UIDAI Smart Card)",
      issuedDate: "2017-06-18",
      photo: "👤",
      qrData: "UIDAI:887766554433|NAME:A. Mohammed Farooq|DOB:1989-12-05|GEN:M|ADDR:Coimbatore-641012",
      isRestricted: false,
      restrictionStatus: "Cleared",
      restrictionCase: null,
      dailyLimits: {
        hotUsed: 0,
        hotMax: 1,
        nonHotUsed: 0,
        nonHotMax: 2,
        date: "2026-09-18"
      },
      personaNote: "Clean Customer: Coimbatore District Resident. All bookings available."
    }
  ],

  initialBookings: [
    {
      id: "UAL-2026-8942",
      customerId: "TN-DEMO-2345",
      customerName: "Rajesh Kannan",
      shopId: "UAL-CHE-101",
      shopName: "TASMAC Elite Outlet #101 – Anna Nagar",
      productId: "HOT-01",
      productName: "Antiquity Blue Ultra Premium Whisky",
      category: "HOT",
      quantity: 1,
      price: 1180,
      totalAmount: 1180,
      date: "10/09/2026",
      collectionTime: "4:00 PM – 5:00 PM",
      status: "Confirmed",
      qrData: "UAL-TOKEN|ID:UAL-2026-8942|CUST:TN-DEMO-2345|SHOP:UAL-CHE-101|HOT:1|TIME:16:00",
      createdAt: "2026-09-10T11:30:00+05:30"
    },
    {
      id: "UAL-2026-7714",
      customerId: "TN-DEMO-1234",
      customerName: "S. Murugan",
      shopId: "UAL-CHE-205",
      shopName: "TASMAC Retail Outlet #205 – T. Nagar",
      productId: "NON-01",
      productName: "Kingfisher Ultra Premium Lager",
      category: "NON-HOT",
      quantity: 1,
      price: 210,
      totalAmount: 210,
      date: "10/09/2026",
      collectionTime: "6:00 PM – 7:00 PM",
      status: "Confirmed",
      qrData: "UAL-TOKEN|ID:UAL-2026-7714|CUST:TN-DEMO-1234|SHOP:UAL-CHE-205|NONHOT:1|TIME:18:00",
      createdAt: "2026-09-10T12:15:00+05:30"
    },
    {
      id: "UAL-2026-6621",
      customerId: "TN-DEMO-7890",
      customerName: "M. Vijay",
      shopId: "UAL-CHE-309",
      shopName: "TASMAC Elite Store #309 – Velachery",
      productId: "HOT-02",
      productName: "Signature Premier Grain Whisky",
      category: "HOT",
      quantity: 1,
      price: 960,
      totalAmount: 960,
      date: "09/09/2026",
      collectionTime: "7:00 PM – 8:00 PM",
      status: "Completed",
      qrData: "UAL-TOKEN|ID:UAL-2026-6621|CUST:TN-DEMO-7890|SHOP:UAL-CHE-309|HOT:1|COLLECTED",
      createdAt: "2026-09-09T14:10:00+05:30"
    }
  ],

  // Admin Officer Auth
  adminOfficer: {
    username: "admin",
    pin: "8899",
    name: "Dr. K. Rathinavel, Enforcement Officer",
    role: "System Administrator"
  }
};

/**
 * Shared Reactive Storage & Central Controller
 */
class UalStore {
  constructor() {
    this.STORAGE_KEY = "UNAKKU_AVLOTHA_LIMIT_STATE_V2";
    this.listeners = [];
    this.loadState();
  }

  loadState() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    let initial = null;
    if (saved) {
      try { initial = JSON.parse(saved); } catch (e) { console.warn("UAL reset:", e); }
    }

    this.state = {
      currentUser: initial?.currentUser || null,
      isAdmin: initial?.isAdmin || false,
      selectedDistrict: initial?.selectedDistrict || "Chennai",
      selectedCity: initial?.selectedCity || "Anna Nagar",
      selectedShopId: initial?.selectedShopId || "UAL-CHE-101",
      selectedCategory: initial?.selectedCategory || null, // "HOT" | "NON-HOT"
      selectedProductId: initial?.selectedProductId || null,
      
      shops: initial?.shops || JSON.parse(JSON.stringify(UAL_DB.shops)),
      products: initial?.products || JSON.parse(JSON.stringify(UAL_DB.products)),
      customers: initial?.customers?.length ? initial.customers : JSON.parse(JSON.stringify(UAL_DB.demoCustomers)),
      bookings: initial?.bookings || JSON.parse(JSON.stringify(UAL_DB.initialBookings))
    };

    // Ensure customers is never empty when data was deleted
    if (!this.state.customers || this.state.customers.length === 0) {
      this.state.customers = JSON.parse(JSON.stringify(UAL_DB.demoCustomers));
    }

    // Reconcile and merge demo customers
    (UAL_DB.demoCustomers || []).forEach(dc => {
      const idx = this.state.customers.findIndex(c => c.aadhaarNumber === dc.aadhaarNumber);
      if (idx === -1) {
        this.state.customers.push(JSON.parse(JSON.stringify(dc)));
      } else {
        Object.assign(this.state.customers[idx], {
          careOf: dc.careOf,
          dob: dc.dob,
          age: dc.age,
          gender: dc.gender,
          address: dc.address,
          pincode: dc.pincode,
          enrolmentNo: dc.enrolmentNo,
          cardType: dc.cardType,
          photo: dc.photo,
          qrData: dc.qrData,
          nameTamil: dc.nameTamil,
          aadhaarFormatted: dc.aadhaarFormatted,
          aadhaarMasked: dc.aadhaarMasked
        });
        this.state.customers[idx].personaNote = dc.personaNote;
        if (dc.isRestricted) {
          this.state.customers[idx].isRestricted = true;
          this.state.customers[idx].restrictionCase = dc.restrictionCase;
        }
        if (dc.isUnderage) this.state.customers[idx].isUnderage = true;
        if (dc.isBlacklisted) this.state.customers[idx].isBlacklisted = true;
      }
    });

    // Default to first demo customer if not logged in
    if (!this.state.currentUser && !this.state.isAdmin) {
      this.state.currentUser = this.state.customers[0];
    }
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        currentUser: this.state.currentUser,
        isAdmin: this.state.isAdmin,
        selectedDistrict: this.state.selectedDistrict,
        selectedCity: this.state.selectedCity,
        selectedShopId: this.state.selectedShopId,
        selectedCategory: this.state.selectedCategory,
        selectedProductId: this.state.selectedProductId,
        shops: this.state.shops,
        products: this.state.products,
        customers: this.state.customers,
        bookings: this.state.bookings
      }));
    } catch (e) {
      console.warn("Storage write failed:", e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.save();
    this.listeners.forEach(cb => {
      try { cb(this.state); } catch (e) { console.error("Listener error:", e); }
    });
  }

  // --- Monday-to-Sunday Weekly Cycle Engine ---
  // Calculates next Monday 00:00:00 AM (after Sunday ends)
  getNextMondayReset(refDate = new Date()) {
    const d = new Date(refDate);
    const day = d.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const daysUntilNextMonday = day === 0 ? 1 : (8 - day);
    d.setDate(d.getDate() + daysUntilNextMonday);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  getCurrentWeeklyCycle(refDate = new Date()) {
    const now = new Date(refDate);
    const day = now.getDay();
    const daysSinceMonday = day === 0 ? 6 : (day - 1);
    const cycleStart = new Date(now);
    cycleStart.setDate(cycleStart.getDate() - daysSinceMonday);
    cycleStart.setHours(0, 0, 0, 0);

    const cycleEnd = new Date(cycleStart);
    cycleEnd.setDate(cycleEnd.getDate() + 6);
    cycleEnd.setHours(23, 59, 59, 999);

    const nextReset = this.getNextMondayReset(now);

    return {
      cycleStart,
      cycleEnd,
      nextReset,
      cycleLabel: "Monday to Sunday",
      resetDescription: "Automatic limit reset after Sunday 11:59 PM (Monday 00:00 AM)"
    };
  }

  checkAndResetWeeklyLimits(user) {
    if (!user) return;
    const now = new Date();
    const resetDate = new Date(user.dailyLimits?.resetDate || user.weeklyQuota?.alcoholResetDate || 0);

    // If reset time passed (Monday arrived after Sunday)
    if (isNaN(resetDate.getTime()) || now >= resetDate) {
      const nextMonday = this.getNextMondayReset(now);
      if (user.dailyLimits) {
        user.dailyLimits.hotUsed = 0;
        user.dailyLimits.nonHotUsed = 0;
        user.dailyLimits.resetDate = nextMonday.toISOString();
        user.dailyLimits.date = now.toISOString().split("T")[0];
      }
      if (user.weeklyQuota) {
        user.weeklyQuota.alcoholUsedUnits = 0;
        user.weeklyQuota.highNicotineUsed = 0;
        user.weeklyQuota.lowNicotineUsed = 0;
        user.weeklyQuota.alcoholResetDate = nextMonday.toISOString();
      }
      // CRITICAL: Booking & token history (this.state.bookings) is NEVER wiped or modified on weekly reset!
      this.save();
    }
  }

  // --- Daily Limits Engine ---
  getDailyLimits(user = this.state.currentUser) {
    const cycle = this.getCurrentWeeklyCycle();

    if (!user) {
      return {
        isRestricted: false,
        cycleInfo: cycle,
        hot: { used: 0, max: 1, remaining: 1, isReached: false, percent: 0 },
        nonHot: { used: 0, max: 2, remaining: 2, isReached: false, percent: 0 }
      };
    }

    // Auto-check and apply Monday-to-Sunday weekly reset
    this.checkAndResetWeeklyLimits(user);

    const limits = user.dailyLimits || { hotUsed: 0, hotMax: 1, nonHotUsed: 0, nonHotMax: 2 };
    const isRestricted = !!user.isRestricted;

    const hotMax = isRestricted ? 0 : (limits.hotMax || 1);
    const hotUsed = isRestricted ? 0 : (limits.hotUsed || 0);
    const hotRemaining = Math.max(0, hotMax - hotUsed);
    const hotReached = isRestricted || hotRemaining <= 0;
    const hotPercent = hotMax > 0 ? Math.min(100, Math.round((hotUsed / hotMax) * 100)) : 100;

    const nonHotMax = isRestricted ? 0 : (limits.nonHotMax || 2);
    const nonHotUsed = isRestricted ? 0 : (limits.nonHotUsed || 0);
    const nonHotRemaining = Math.max(0, nonHotMax - nonHotUsed);
    const nonHotReached = isRestricted || nonHotRemaining <= 0;
    const nonHotPercent = nonHotMax > 0 ? Math.min(100, Math.round((nonHotUsed / nonHotMax) * 100)) : 100;

    return {
      isRestricted,
      restrictionStatus: user.restrictionStatus,
      restrictionCase: user.restrictionCase,
      hot: {
        used: hotUsed,
        max: hotMax,
        remaining: hotRemaining,
        isReached: hotReached,
        percent: hotPercent
      },
      nonHot: {
        used: nonHotUsed,
        max: nonHotMax,
        remaining: nonHotRemaining,
        isReached: nonHotReached,
        percent: nonHotPercent
      }
    };
  }

  // Validation before booking
  canBook(productType, quantity = 1, user = this.state.currentUser) {
    if (!user) return { allowed: false, reason: "Please log in to book a collection token." };
    if (user.isRestricted) {
      return { allowed: false, reason: "Account Temporarily Restricted — Booking is currently unavailable." };
    }

    const limits = this.getDailyLimits(user);

    if (productType === "HOT") {
      if (limits.hot.isReached) {
        return { allowed: false, reason: "Your HOT daily limit has been reached. You can book again tomorrow." };
      }
      if (quantity > limits.hot.remaining) {
        return { allowed: false, reason: `Requested quantity exceeds your remaining HOT limit (${limits.hot.remaining} unit remaining today).` };
      }
    } else if (productType === "NON-HOT") {
      if (limits.nonHot.isReached) {
        return { allowed: false, reason: "Your NON-HOT daily limit has been reached. You can book again tomorrow." };
      }
      if (quantity > limits.nonHot.remaining) {
        return { allowed: false, reason: `Requested quantity exceeds your remaining NON-HOT limit (${limits.nonHot.remaining} unit remaining today).` };
      }
    }

    return { allowed: true, reason: "" };
  }

  // Create Booking
  createBooking({ shopId, productId, quantity, date, collectionTime }) {
    if (!this.state.currentUser) throw new Error("Customer authentication required.");
    
    const product = this.state.products.find(p => p.id === productId);
    if (!product) throw new Error("Selected product not found.");

    const validation = this.canBook(product.type, quantity);
    if (!validation.allowed) throw new Error(validation.reason);

    const shop = this.state.shops.find(s => s.id === shopId);
    if (!shop) throw new Error("Selected shop not found.");

    // Check inventory
    const currentStock = shop.inventory?.[productId] ?? 0;
    if (currentStock < quantity) {
      throw new Error(`Insufficient stock at this shop. Only ${currentStock} item(s) available.`);
    }

    // Check slot capacity
    const slot = shop.timeSlots?.find(s => s.label === collectionTime);
    if (slot && slot.booked >= slot.capacity) {
      throw new Error("This collection slot is unavailable. Please select another slot.");
    }

    // Deduct stock & book slot
    shop.inventory[productId] = currentStock - quantity;
    if (slot) slot.booked += 1;

    // Deduct Customer Daily Limit
    const user = this.state.customers.find(c => c.aadhaarNumber === this.state.currentUser.aadhaarNumber);
    if (user) {
      if (product.type === "HOT") {
        user.dailyLimits.hotUsed = (user.dailyLimits.hotUsed || 0) + quantity;
      } else {
        user.dailyLimits.nonHotUsed = (user.dailyLimits.nonHotUsed || 0) + quantity;
      }
      this.state.currentUser = user;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `UAL-2026-${randomSuffix}`;

    const newBooking = {
      id: bookingId,
      customerId: user.customerId || `TN-DEMO-${user.aadhaarNumber.slice(-4)}`,
      customerName: user.name,
      customerPhone: user.phoneMasked,
      shopId: shop.id,
      shopName: shop.name,
      shopAddress: shop.address,
      productId: product.id,
      productName: product.name,
      brand: product.brand,
      category: product.type,
      size: product.size,
      quantity: quantity,
      unitPrice: product.price,
      totalAmount: product.price * quantity,
      date: date || new Date().toLocaleDateString("en-GB"),
      collectionTime: collectionTime,
      status: "Confirmed",
      qrData: `UAL-TOKEN|ID:${bookingId}|CUST:${user.customerId}|TYPE:${product.type}|QTY:${quantity}|TIME:${collectionTime}`,
      createdAt: new Date().toISOString()
    };

    this.state.bookings.unshift(newBooking);
    this.notify();
    return newBooking;
  }

  // Persona switch helper
  switchCustomer(aadhaar) {
    const cust = this.state.customers.find(c => c.aadhaarNumber === aadhaar);
    if (cust) {
      this.state.currentUser = cust;
      this.state.isAdmin = false;
      this.notify();
    }
  }

  // Admin login
  loginAdmin(pin) {
    if (pin === "8899" || pin === "ADMIN") {
      this.state.isAdmin = true;
      this.state.currentUser = null;
      this.notify();
      return true;
    }
    return false;
  }

  logout() {
    this.state.currentUser = null;
    this.state.isAdmin = false;
    this.notify();
  }

  // Toggle user restriction
  toggleRestriction(aadhaar, isRestricted, category = "Drink-and-drive related restriction") {
    const cust = this.state.customers.find(c => c.aadhaarNumber === aadhaar);
    if (!cust) return;
    cust.isRestricted = isRestricted;
    cust.restrictionStatus = isRestricted ? "Temporarily Restricted" : "Cleared";
    if (isRestricted) {
      cust.restrictionCase = {
        category: category,
        caseRef: "UAL-CASE-" + Math.floor(100 + Math.random() * 900),
        imposedDate: new Date().toISOString().split("T")[0],
        status: "Temporarily Restricted",
        notice: "Account Temporarily Restricted — Booking is currently unavailable."
      };
    } else {
      cust.restrictionCase = null;
    }
    if (this.state.currentUser?.aadhaarNumber === aadhaar) {
      this.state.currentUser = cust;
    }
    this.notify();
  }
}

// Global Store Instance
window.ualStore = new UalStore();

/**
 * Common UI Components (Navbar, Student Banner, Footer, Toasts)
 */
const UalUI = {
  renderHeader(activePage = "") {
    const user = window.ualStore.state.currentUser;
    const isAdmin = window.ualStore.state.isAdmin;

    let authPillHtml = '';
    if (isAdmin) {
      authPillHtml = `
        <div class="user-pill admin-pill">
          <span class="user-pill-avatar">🛡️</span>
          <div class="user-pill-meta">
            <span class="user-pill-name">Admin Console</span>
            <span class="user-pill-sub">Enforcement Officer</span>
          </div>
          <button class="btn-logout" onclick="ualStore.logout(); window.location.href='index.html';">Logout</button>
        </div>
      `;
    } else if (user) {
      authPillHtml = `
        <div class="user-pill" onclick="window.location.href='dashboard.html'">
          <span class="user-pill-avatar">${user.name.charAt(0)}</span>
          <div class="user-pill-meta">
            <span class="user-pill-name">${user.name}</span>
            <span class="user-pill-sub">${user.customerId}</span>
          </div>
          <button class="btn-logout" onclick="event.stopPropagation(); ualStore.logout(); window.location.href='login.html';">Logout</button>
        </div>
      `;
    } else {
      authPillHtml = `
        <a href="login.html" class="btn-nav-login">
          <span>Login (Aadhaar OTP)</span>
        </a>
      `;
    }

    return `
      <!-- Student / Demo Project Disclaimer Strip -->
      <div class="student-disclaimer-strip">
        <div class="container flex justify-between items-center">
          <div class="disclaimer-text">
            <span class="disclaimer-badge">STUDENT DEMO</span>
            <span>Unakku Avlotha Limit – Educational Prototype • Not an Official TASMAC Website</span>
          </div>
          <div class="disclaimer-links">
            <button class="btn-persona-quick" onclick="UalUI.openPersonaModal()">🎭 Switch Test Persona</button>
            <a href="admin.html" class="admin-quick-link">Admin Portal</a>
          </div>
        </div>
      </div>

      <!-- Main Navigation Bar -->
      <header class="ual-header">
        <div class="container nav-row">
          <a href="index.html" class="ual-brand">
            <!-- Custom Booking & Awareness Logo -->
            <div class="ual-logo-mark">
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Outer Token Silhouette -->
                <rect x="4" y="6" width="40" height="36" rx="8" fill="#0f5a34" stroke="#d97706" stroke-width="2"/>
                <circle cx="4" cy="24" r="4" fill="#ffffff"/>
                <circle cx="44" cy="24" r="4" fill="#ffffff"/>
                <!-- Bottle / Glass Outline inside -->
                <path d="M21 15 H27 V19 L29 23 V33 H19 V23 L21 19 Z" fill="#ffffff" opacity="0.9"/>
                <!-- Green Verification Checkmark -->
                <path d="M20 27 L23 30 L28 23" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- Tamil Nadu Inspired Arch Peak Accent -->
                <path d="M20 11 L24 8 L28 11" stroke="#d97706" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="ual-brand-text">
              <span class="ual-title">Unakku Avlotha Limit</span>
              <span class="ual-tagline">Know Your Limit • Book Responsibly • Stay Safe</span>
            </div>
          </a>

          <!-- Nav Links -->
          <nav class="ual-nav-menu">
            <a href="index.html" class="ual-nav-link ${activePage === 'home' ? 'active' : ''}">Home</a>
            <a href="index.html#about" class="ual-nav-link">About</a>
            <a href="shops.html" class="ual-nav-link ${activePage === 'shops' ? 'active' : ''}">Shops</a>
            <a href="products.html" class="ual-nav-link ${activePage === 'products' ? 'active' : ''}">Products</a>
            <a href="booking.html" class="ual-nav-link ${activePage === 'booking' ? 'active' : ''}">Booking</a>
            <a href="history.html" class="ual-nav-link ${activePage === 'history' ? 'active' : ''}">My Bookings</a>
            <a href="awareness.html" class="ual-nav-link ${activePage === 'awareness' ? 'active' : ''}">Know the Effects</a>
            <a href="awareness.html#resources" class="ual-nav-link">Help</a>
          </nav>

          <!-- Auth & Location Controls -->
          <div class="nav-actions">
            ${authPillHtml}
          </div>
        </div>
      </header>
    `;
  },

  renderFooter() {
    return `
      <footer class="ual-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <div class="flex items-center gap-2" style="margin-bottom:0.75rem;">
                <div class="ual-logo-mark" style="width:34px; height:34px;">
                  <svg viewBox="0 0 48 48" width="28" height="28" fill="none">
                    <rect x="4" y="6" width="40" height="36" rx="8" fill="#0f5a34" stroke="#d97706" stroke-width="2"/>
                    <circle cx="4" cy="24" r="4" fill="#ffffff"/>
                    <circle cx="44" cy="24" r="4" fill="#ffffff"/>
                    <path d="M21 15 H27 V19 L29 23 V33 H19 V23 L21 19 Z" fill="#ffffff" opacity="0.9"/>
                    <path d="M20 27 L23 30 L28 23" stroke="#16a34a" stroke-width="2.5"/>
                  </svg>
                </div>
                <h3 style="font-size:1.15rem; font-weight:800; color:var(--primary-dark);">Unakku Avlotha Limit</h3>
              </div>
              <p class="footer-tagline-text">“Know Your Limit • Book Responsibly • Stay Safe”</p>
              <p class="footer-desc">
                A modern student and portfolio demo project exploring disciplined advance token booking, strict HOT/NON-HOT daily limit enforcement, and public health awareness.
              </p>
              <div class="footer-disclaimer-box">
                ⚠️ <strong>Student / Demo Project – Not an Official TASMAC Website.</strong><br>
                Created strictly for educational, design, and portfolio demonstration purposes.
              </div>
            </div>

            <div>
              <h4 class="footer-heading">Platform Links</h4>
              <ul class="footer-list">
                <li><a href="index.html">Home</a></li>
                <li><a href="shops.html">Nearby Shops</a></li>
                <li><a href="products.html">Shop Products</a></li>
                <li><a href="booking.html">Book Token</a></li>
                <li><a href="awareness.html">Alcohol Awareness</a></li>
                <li><a href="history.html">My Bookings</a></li>
                <li><a href="admin.html">Admin Dashboard</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-heading">Health & Support</h4>
              <ul class="footer-list">
                <li><a href="awareness.html#know-effects">Know the Effects</a></li>
                <li><a href="awareness.html#bodymind">Body & Mind Visual</a></li>
                <li><a href="awareness.html#resources">Tele-MANAS (14416)</a></li>
                <li><a href="awareness.html#resources">National De-addiction Helpline</a></li>
                <li><a href="awareness.html#resources">IMH Kilpauk Chennai</a></li>
                <li><a href="awareness.html#resources">TTK Hospital Support</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-heading">Statutory Notice</h4>
              <div class="statutory-card">
                <p style="font-weight:700; color:var(--danger); margin-bottom:0.35rem;">⚠️ Health Warning:</p>
                <p style="font-size:0.8rem; color:var(--text-secondary); line-height:1.5;">
                  Liquor consumption is injurious to health. Be safe — do not drink and drive.
                </p>
                <p style="font-size:0.75rem; color:var(--text-muted); margin-top:0.4rem;">
                  மது அருந்துதல் உடல் நலத்திற்கு கேடு. பாதுகாப்பாய் இருங்கள் - மது அருந்திவிட்டு வாகனம் ஓட்டாதீர்கள்.
                </p>
              </div>
            </div>
          </div>

          <div class="footer-bottom-row">
            <div>
              © 2026 <strong>Unakku Avlotha Limit</strong>. All rights reserved. Built with HTML5, CSS3 & Modern JavaScript.
            </div>
            <div class="flex gap-3">
              <span>Privacy Safe Mock Prototype</span>
              <span>•</span>
              <span>Zero Build Dependency</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  },

  // Toast notifications
  toast(message, type = "info") {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const icons = { success: "✅", error: "❌", warning: "⚠️", info: "ℹ️" };
    toast.innerHTML = `<span>${icons[type] || "ℹ️"}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(20px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  // 1-Click Persona Switcher Modal
  openPersonaModal() {
    const customers = window.ualStore.state.customers;
    const currentAadhaar = window.ualStore.state.currentUser?.aadhaarNumber;

    let modal = document.getElementById("personaModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "personaModal";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-overlay" onclick="if(event.target === this) this.remove()">
        <div class="modal-dialog wide">
          <div class="modal-header">
            <h3 class="modal-title">🎭 Select Demo Persona</h3>
            <button class="modal-close-btn" onclick="this.closest('.modal-overlay').remove()">✕</button>
          </div>
          <div class="modal-body">
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.25rem;">
              Quickly test different daily limit and restriction scenarios for your presentation:
            </p>

            <div class="flex flex-col gap-2">
              ${customers.map(c => {
                const limits = window.ualStore.getDailyLimits(c);
                const isSelected = c.aadhaarNumber === currentAadhaar;
                return `
                  <div class="persona-row ${c.isRestricted ? 'restricted' : ''} ${isSelected ? 'active-persona' : ''}" onclick="UalUI.selectPersona('${c.aadhaarNumber}')">
                    <div style="flex:1;">
                      <div class="flex items-center gap-2">
                        <strong>${c.name}</strong>
                        <span class="badge ${c.isRestricted ? 'badge-danger' : limits.hot.isReached ? 'badge-warning' : 'badge-success'}">
                          ${c.isRestricted ? (c.isUnderage ? 'Minor (<18)' : c.isBlacklisted ? 'Blacklisted' : 'Restricted') : limits.hot.isReached ? 'Limit Reached' : 'Clean'}
                        </span>
                        <span class="mono-text">${c.customerId}</span>
                      </div>
                      <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.25rem;">${c.personaNote}</div>
                      <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;">
                        🔥 HOT: <strong>${limits.hot.used}/${limits.hot.max}</strong> | 🍺 NON-HOT: <strong>${limits.nonHot.used}/${limits.nonHot.max}</strong>
                      </div>
                    </div>
                    <button class="btn-primary" style="padding:0.4rem 0.8rem; font-size:0.8rem;">Select</button>
                  </div>
                `;
              }).join('')}

              <div class="persona-row admin-persona-row" onclick="UalUI.selectAdmin()">
                <div style="flex:1;">
                  <div class="flex items-center gap-2">
                    <strong style="color:#ffffff;">Dr. K. Rathinavel</strong>
                    <span class="badge" style="background:#38bdf8; color:#0f172a;">Administrator</span>
                  </div>
                  <div style="font-size:0.8rem; color:#cbd5e1; margin-top:0.25rem;">
                    Full access to Shop Management, Inventory Adjustments, Canvas Charts, and Customer Restriction Module.
                  </div>
                </div>
                <button class="btn-primary" style="background:#38bdf8; color:#0f172a; padding:0.4rem 0.8rem; font-size:0.8rem;">Open Admin</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  selectPersona(aadhaar) {
    window.ualStore.switchCustomer(aadhaar);
    const modal = document.getElementById("personaModal");
    if (modal) modal.innerHTML = "";
    UalUI.toast(`Switched to customer: ${window.ualStore.state.currentUser.name}`, "success");
    setTimeout(() => window.location.reload(), 400);
  },

  selectAdmin() {
    window.ualStore.loginAdmin("8899");
    const modal = document.getElementById("personaModal");
    if (modal) modal.innerHTML = "";
    UalUI.toast("Logged in as Administrator", "success");
    window.location.href = "admin.html";
  },

  // View Official UIDAI Dummy Aadhaar Card Modal
  openAadhaarCardModal(aadhaarNumber) {
    const targetAadhaar = aadhaarNumber || window.ualStore.state.currentUser?.aadhaarNumber;
    const clean = String(targetAadhaar || "").replace(/\s+/g, "");
    const customer = window.ualStore.state.customers.find(c => c.aadhaarNumber.replace(/\s+/g, "") === clean) || window.ualStore.state.currentUser;
    if (!customer) return;

    let modal = document.getElementById("aadhaarCardModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "aadhaarCardModal";
      document.body.appendChild(modal);
    }

    const formattedAadhaar = customer.aadhaarFormatted || customer.aadhaarNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
    const dob = customer.dob || "1990-05-14";
    const gender = customer.gender || "Male";
    const careOf = customer.careOf || "S/O K. Ramanathan";
    const address = customer.address || `${customer.city}, ${customer.district} - ${customer.pincode || "600040"}`;
    const nameTamil = customer.nameTamil || "";

    modal.innerHTML = `
      <div class="modal-overlay" onclick="if(event.target === this) this.remove()">
        <div class="modal-dialog" style="max-width:540px; padding:0; overflow:hidden; border-radius:18px; border:2px solid #cbd5e1; box-shadow:var(--shadow-xl);">
          
          <!-- UIDAI Official Card Header -->
          <div style="background:linear-gradient(135deg, #ea580c 0%, #ffffff 50%, #16a34a 100%); padding:4px 0;"></div>
          <div style="background:#ffffff; padding:1.2rem 1.5rem 0.8rem; border-bottom:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <div style="font-size:1.8rem; line-height:1;">🏛️</div>
              <div>
                <div style="font-size:0.7rem; font-weight:800; color:#b45309; text-transform:uppercase; letter-spacing:0.05em;">இந்திய தனித்துவ அடையாள ஆணையம்</div>
                <div style="font-size:0.85rem; font-weight:900; color:#0f172a;">Unique Identification Authority of India</div>
                <div style="font-size:0.68rem; color:#64748b;">Government of India • Demo Simulation Card</div>
              </div>
            </div>
            <button class="modal-close-btn" style="position:static; padding:0.25rem 0.6rem;" onclick="this.closest('.modal-overlay').remove()">✕</button>
          </div>

          <!-- Card Body -->
          <div style="background:#ffffff; padding:1.5rem; position:relative;">
            <!-- Watermark -->
            <div style="position:absolute; right:15%; top:25%; opacity:0.04; font-size:9rem; pointer-events:none; font-weight:900;">UIDAI</div>

            <div style="display:grid; grid-template-columns:110px 1fr; gap:1.25rem; align-items:start;">
              <!-- Photo Frame -->
              <div style="text-align:center;">
                <div style="width:105px; height:125px; border:2px solid #cbd5e1; border-radius:8px; background:#f1f5f9; display:flex; flex-direction:column; align-items:center; justify-content:center; overflow:hidden; box-shadow:inset 0 2px 4px rgba(0,0,0,0.05);">
                  <span style="font-size:3.2rem;">${customer.photo || "👤"}</span>
                  <span style="font-size:0.6rem; color:#64748b; font-weight:700; margin-top:2px;">MOCK CITIZEN</span>
                </div>
                <div style="font-size:0.65rem; color:#64748b; margin-top:0.4rem; font-family:monospace;">
                  ${customer.customerId || "TN-DEMO"}
                </div>
              </div>

              <!-- Citizen Details -->
              <div>
                <div style="margin-bottom:0.75rem;">
                  <div style="font-size:1.2rem; font-weight:900; color:#0f172a;">${customer.name}</div>
                  ${nameTamil ? `<div style="font-size:0.85rem; font-weight:700; color:#0f5a34;">${nameTamil}</div>` : ''}
                </div>

                <div style="font-size:0.82rem; color:#334155; line-height:1.6;">
                  <div><strong style="color:#64748b;">DOB:</strong> <span style="font-weight:700;">${dob}</span> (Age: ${customer.age || 34})</div>
                  <div><strong style="color:#64748b;">Gender:</strong> <span style="font-weight:700;">${gender}</span></div>
                  <div><strong style="color:#64748b;">C/O:</strong> <span>${careOf}</span></div>
                  <div><strong style="color:#64748b;">Mobile:</strong> <span style="font-family:monospace; font-weight:700;">${customer.phone || ("+91 " + customer.phoneMasked)}</span></div>
                </div>
              </div>
            </div>

            <!-- Address Block -->
            <div style="margin-top:1.2rem; padding:0.75rem 1rem; background:#f8fafc; border-radius:8px; border:1px solid #e2e8f0; font-size:0.8rem; color:#334155;">
              <strong style="color:#64748b; display:block; font-size:0.72rem; text-transform:uppercase; margin-bottom:0.2rem;">Residential Address</strong>
              <div>${address}</div>
            </div>

            <!-- Aadhaar Number Large Banner -->
            <div style="margin-top:1.25rem; text-align:center; padding:0.75rem; background:#fef3c7; border:1.5px solid #fde68a; border-radius:10px;">
              <div style="font-size:0.7rem; color:#92400e; font-weight:800; letter-spacing:0.08em; text-transform:uppercase;">ஆதார் எண் / Aadhaar Number</div>
              <div style="font-size:1.5rem; font-weight:900; color:#0f172a; font-family:monospace; letter-spacing:0.18em; margin-top:0.2rem;">
                ${formattedAadhaar}
              </div>
              <div style="font-size:0.72rem; color:#b45309; margin-top:0.2rem; font-weight:700;">
                ஆதார் - சாதாரண மனிதனின் உரிமை
              </div>
            </div>

            <!-- Footer Meta with QR and Verification -->
            <div style="margin-top:1.25rem; display:flex; justify-content:space-between; align-items:center; border-top:1px dashed #cbd5e1; padding-top:1rem;">
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <div id="aadhaarQrBox" style="width:64px; height:64px; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:6px; display:flex; align-items:center; justify-content:center;"></div>
                <div style="font-size:0.72rem; color:#64748b;">
                  <div>Secure QR Verified</div>
                  <strong style="color:#0f5a34;">UIDAI Mock Database</strong>
                </div>
              </div>

              <div style="text-align:right;">
                <span class="badge ${customer.isRestricted ? 'badge-danger' : 'badge-success'}" style="font-size:0.78rem;">
                  ${customer.isRestricted ? (customer.restrictionStatus || 'Temporarily Restricted') : 'Verified Citizen Profile'}
                </span>
                <div style="font-size:0.7rem; color:#64748b; margin-top:0.25rem;">Quota Engine: Active</div>
              </div>
            </div>

            <div style="margin-top:1rem; display:flex; gap:0.5rem; justify-content:flex-end;">
              <button class="btn-outline" onclick="window.print()" style="font-size:0.8rem; padding:0.4rem 0.85rem;">🖨️ Print Card</button>
              <button class="btn-primary" onclick="this.closest('.modal-overlay').remove()" style="font-size:0.8rem; padding:0.4rem 0.85rem;">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const qrTarget = document.getElementById("aadhaarQrBox");
      if (qrTarget && window.QRCode) {
        qrTarget.innerHTML = "";
        new QRCode(qrTarget, {
          text: customer.qrData || `UIDAI:${customer.aadhaarNumber}|NAME:${customer.name}`,
          width: 60,
          height: 60,
          colorDark: "#0f5a34",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.M
        });
      }
    }, 50);
  }
};

// Global QR Pass Modal accessible on any page
window.openQrPassModal = function(bookingId) {
  const booking = window.ualStore.state.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  let modal = document.getElementById("qrModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "qrModal";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-overlay" onclick="if(event.target === this) this.remove()">
      <div class="modal-dialog">
        <div class="token-pass-header">
          <div class="flex items-center gap-2">
            <span style="font-size:1.2rem;">🎫</span>
            <strong style="font-size:1.05rem;">Official Digital Token</strong>
          </div>
          <button class="modal-close-btn" style="color:#ffffff;" onclick="this.closest('.modal-overlay').remove()">✕</button>
        </div>
        <div class="token-pass-body">
          <span class="badge ${booking.status === 'Confirmed' ? 'badge-success' : 'badge-info'}" style="font-size:0.8rem;">
            ${booking.status.toUpperCase()} RESERVATION
          </span>
          <h2 style="font-size:1.6rem; font-weight:900; color:#0f5a34; margin:0.35rem 0;">${booking.id}</h2>
          <p style="font-size:0.82rem; color:var(--text-secondary);">
            Present this scannable QR pass at the physical TASMAC retail counter.
          </p>

          <div class="qr-code-frame" id="globalQrContainer"></div>

          <div class="token-pass-meta-grid">
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Customer</span>
              <strong>${booking.customerName}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Customer ID</span>
              <strong class="mono-text">${booking.customerId}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Outlet</span>
              <strong>${booking.shopName}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Time Slot</span>
              <strong style="color:#b45309;">${booking.collectionTime}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Item</span>
              <strong>${booking.productName} (${booking.quantity} Unit)</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Pay at Outlet</span>
              <strong style="color:#0f5a34;">₹${booking.totalAmount}</strong>
            </div>
          </div>

          <div style="margin-top:1.25rem; display:flex; gap:0.5rem; justify-content:center;">
            <button class="btn-primary" onclick="window.print()" style="font-size:0.85rem; padding:0.5rem 1.25rem;">
              🖨️ Print Pass
            </button>
            <button class="btn-outline" onclick="this.closest('.modal-overlay').remove()" style="font-size:0.85rem; padding:0.5rem 1.25rem;">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const qrTarget = document.getElementById("globalQrContainer");
    if (qrTarget && window.QRCode) {
      qrTarget.innerHTML = "";
      new QRCode(qrTarget, {
        text: booking.qrData || `UAL-PASS|${booking.id}`,
        width: 170,
        height: 170,
        colorDark: "#0f5a34",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  }, 50);
};

window.UalUI = UalUI;

