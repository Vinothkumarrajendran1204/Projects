/**
 * Tamil Nadu TASMAC Smart Booking & Limit Management System
 * Central Reactive State Store & Business Logic Engine
 */

class TasmacStore {
  constructor() {
    this.STORAGE_KEY = "TASMAC_SMART_PORTAL_STATE_V1";
    this.AADHAAR_DB_KEY = "TASMAC_DUMMY_AADHAAR_DB_V1";
    this.listeners = [];
    this.loadState();
  }

  loadState() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    let initial = null;
    if (saved) {
      try {
        initial = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved TASMAC state, resetting.", e);
      }
    }

    const data = window.TASMAC_DATA || {};

    this.state = {
      currentUser: initial?.currentUser || null,
      isAdmin: initial?.isAdmin || false,
      adminUser: data.adminAccount || null,
      selectedDistrict: initial?.selectedDistrict || "Chennai",
      selectedCity: initial?.selectedCity || "All",
      selectedShopId: initial?.selectedShopId || null,
      searchQuery: "",
      selectedCategory: "All",
      selectedBrand: "All",
      maxPrice: 2000,
      availabilityFilter: "all", // "all" | "in-stock"
      activeView: "home", // "home" | "shops" | "shop-detail" | "limits" | "my-bookings" | "history" | "admin"
      
      // Core dynamic datasets
      districts: data.districts || [],
      shops: initial?.shops || JSON.parse(JSON.stringify(data.shops || [])),
      products: initial?.products || JSON.parse(JSON.stringify(data.products || [])),
      users: initial?.users || JSON.parse(JSON.stringify(data.demoUsers || [])),
      bookings: initial?.bookings || JSON.parse(JSON.stringify(data.initialBookings || [])),
      purchases: initial?.purchases || JSON.parse(JSON.stringify(data.initialPurchases || [])),
      legalRestrictions: initial?.legalRestrictions || JSON.parse(JSON.stringify(data.legalRestrictions || []))
    };

    // Ensure users array is never empty when data is reset or deleted
    if (!this.state.users || this.state.users.length === 0) {
      this.state.users = JSON.parse(JSON.stringify(data.demoUsers || []));
    }

    // Reconcile and merge all demo personas into state.users
    (data.demoUsers || []).forEach(demoUser => {
      const idx = this.state.users.findIndex(u => u.aadhaarNumber === demoUser.aadhaarNumber);
      if (idx === -1) {
        this.state.users.push(JSON.parse(JSON.stringify(demoUser)));
      } else {
        if (demoUser.isRestricted && !this.state.users[idx].isRestricted) {
          this.state.users[idx].isRestricted = true;
          this.state.users[idx].restrictionDetails = JSON.parse(JSON.stringify(demoUser.restrictionDetails));
        }
        this.state.users[idx].personaBadge = demoUser.personaBadge;
        this.state.users[idx].personaDescription = demoUser.personaDescription;
        if (demoUser.isUnderage) this.state.users[idx].isUnderage = true;
        if (demoUser.isBlacklisted) this.state.users[idx].isBlacklisted = true;
        if (demoUser.age) this.state.users[idx].age = demoUser.age;
        if (demoUser.dob) this.state.users[idx].dob = demoUser.dob;
        if (demoUser.gender) this.state.users[idx].gender = demoUser.gender;
        if (demoUser.careOf) this.state.users[idx].careOf = demoUser.careOf;
        if (demoUser.address) this.state.users[idx].address = demoUser.address;
        if (demoUser.pincode) this.state.users[idx].pincode = demoUser.pincode;
        if (demoUser.nameTamil) this.state.users[idx].nameTamil = demoUser.nameTamil;
        if (demoUser.qrData) this.state.users[idx].qrData = demoUser.qrData;
        if (demoUser.cardType) this.state.users[idx].cardType = demoUser.cardType;
        if (demoUser.dailyLimits) this.state.users[idx].dailyLimits = demoUser.dailyLimits;
      }
    });

    // Reconcile legal restrictions
    (data.legalRestrictions || []).forEach(leg => {
      if (!this.state.legalRestrictions.some(r => r.caseId === leg.caseId)) {
        this.state.legalRestrictions.push(JSON.parse(JSON.stringify(leg)));
      }
    });

    // Reconcile product images and data from window.TASMAC_DATA
    if (data.products && this.state.products) {
      data.products.forEach(dp => {
        const prod = this.state.products.find(p => p.id === dp.id);
        if (prod) {
          prod.image = dp.image;
        } else {
          this.state.products.push(JSON.parse(JSON.stringify(dp)));
        }
      });
    }

    // Reconcile dummy Aadhaar database records safely (auto-seeding on delete)
    const existingAadhaar = this.getDummyAadhaarRecords();
    const missingAadhaar = (data.demoUsers || []).filter(u => !existingAadhaar.some(r => r.aadhaarNumber === u.aadhaarNumber)).map(u => ({
      aadhaarNumber: u.aadhaarNumber,
      aadhaarFormatted: u.aadhaarFormatted || u.aadhaarNumber.replace(/(\d{4})(?=\d)/g, "$1 "),
      aadhaarMasked: u.aadhaarMasked || "XXXX-XXXX-" + u.aadhaarNumber.slice(-4),
      name: u.name,
      nameTamil: u.nameTamil || "",
      gender: u.gender || "Male",
      dob: u.dob || "1990-01-01",
      age: u.age || 30,
      careOf: u.careOf || "S/O Government of TN",
      address: u.address || (u.city + ", " + u.district),
      mobile: (u.phone || "").replace(/\D/g, "").slice(-10) || "9840123456",
      phoneMasked: u.phoneMasked || ("+91 ******" + u.aadhaarNumber.slice(-4)),
      district: u.district || "Chennai",
      city: u.city || "Anna Nagar",
      pincode: u.pincode || "600040",
      photo: u.photo || "👤",
      cardType: u.cardType || "Resident Individual (UIDAI Smart Card)",
      qrData: u.qrData || `UIDAI:${u.aadhaarNumber}|NAME:${u.name}|ADDR:${u.district}`
    }));
    if (existingAadhaar.length === 0 || missingAadhaar.length > 0) {
      try {
        localStorage.setItem(this.AADHAAR_DB_KEY, JSON.stringify([...existingAadhaar, ...missingAadhaar]));
      } catch (err) {
        console.warn("Storage write error for Aadhaar DB:", err);
      }
    }

    // Seed dummy records immediately and preserve only sessions from this login flow.
    this.state.currentUser = initial?.authVersion === 2
      ? this.state.users.find(user => user.aadhaarNumber === initial.currentUser?.aadhaarNumber) || null
      : null;
    try {
      if (this.state.currentUser && !this.getDummyAadhaarRecords().some(record => record.aadhaarNumber === this.state.currentUser.aadhaarNumber)) this.state.currentUser = null;
    } catch { this.state.currentUser = null; }
    this.pendingOtp = null;
    this.saveState();
  }

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        authVersion: 2,
        currentUser: this.state.currentUser,
        isAdmin: this.state.isAdmin,
        selectedDistrict: this.state.selectedDistrict,
        selectedCity: this.state.selectedCity,
        selectedShopId: this.state.selectedShopId,
        shops: this.state.shops,
        products: this.state.products,
        users: this.state.users,
        bookings: this.state.bookings,
        purchases: this.state.purchases,
        legalRestrictions: this.state.legalRestrictions
      }));
    } catch (e) {
      console.warn("Storage save failed:", e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.saveState();
    this.listeners.forEach(cb => {
      try {
        cb(this.state);
      } catch (e) {
        console.error("Listener error:", e);
      }
    });
  }

  getState() {
    return this.state;
  }

  // Navigation
  setView(view, shopId = null) {
    this.state.activeView = view;
    if (shopId) {
      this.state.selectedShopId = shopId;
    }
    this.notify();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Location filter
  setLocation(district, city = "All") {
    this.state.selectedDistrict = district;
    this.state.selectedCity = city;
    this.notify();
  }

  getDummyAadhaarRecords() {
    try {
      const raw = localStorage.getItem(this.AADHAAR_DB_KEY);
      if (!raw) {
        return this.seedDummyAadhaarRecords();
      }
      const records = JSON.parse(raw);
      if (!Array.isArray(records) || records.length === 0 || records.some(record => !record ||
        !/^\d{12}$/.test(record.aadhaarNumber) || !/^\d{10}$/.test(record.mobile) ||
        typeof record.name !== "string" || !record.name.trim() || /[<>&"']/.test(record.name))) {
        return this.seedDummyAadhaarRecords();
      }
      return records;
    } catch {
      return this.seedDummyAadhaarRecords();
    }
  }

  seedDummyAadhaarRecords() {
    const data = window.TASMAC_DATA || {};
    const defaultRecords = (data.demoUsers || []).map(u => ({
      aadhaarNumber: u.aadhaarNumber,
      aadhaarFormatted: u.aadhaarFormatted || u.aadhaarNumber.replace(/(\d{4})(?=\d)/g, "$1 "),
      aadhaarMasked: u.aadhaarMasked || "XXXX-XXXX-" + u.aadhaarNumber.slice(-4),
      name: u.name,
      nameTamil: u.nameTamil || "",
      gender: u.gender || "Male",
      dob: u.dob || "1990-01-01",
      age: u.age || 30,
      careOf: u.careOf || "S/O Government of TN",
      address: u.address || (u.city + ", " + u.district),
      mobile: (u.phone || "").replace(/\D/g, "").slice(-10) || "9840123456",
      phoneMasked: u.phoneMasked || ("+91 ******" + u.aadhaarNumber.slice(-4)),
      district: u.district || "Chennai",
      city: u.city || "Anna Nagar",
      pincode: u.pincode || "600040",
      photo: u.photo || "👤",
      cardType: u.cardType || "Resident Individual (UIDAI Smart Card)",
      qrData: u.qrData || `UIDAI:${u.aadhaarNumber}|NAME:${u.name}|ADDR:${u.district}`
    }));
    try {
      localStorage.setItem(this.AADHAAR_DB_KEY, JSON.stringify(defaultRecords));
    } catch (err) {
      console.warn("Storage seed write error:", err);
    }
    return defaultRecords;
  }

  getAadhaarCard(aadhaarNumber) {
    const clean = String(aadhaarNumber || "").replace(/\s+/g, "");
    const records = this.getDummyAadhaarRecords();
    return records.find(r => r.aadhaarNumber === clean) || null;
  }

  addDummyAadhaarRecord({ aadhaarNumber, name, mobile, district, city, address, dob, gender, careOf }) {
    aadhaarNumber = String(aadhaarNumber).replace(/\s+/g, "");
    mobile = String(mobile).replace(/\s+/g, "");
    name = String(name).trim();
    if (!/^\d{12}$/.test(aadhaarNumber)) throw new Error("Dummy Aadhaar must contain exactly 12 digits.");
    if (!/^\d{10}$/.test(mobile)) throw new Error("Linked mobile must contain exactly 10 digits.");
    if (name.length < 2 || name.length > 80 || /[<>&"']/.test(name)) throw new Error("Enter a name between 2 and 80 characters using letters, spaces or periods.");
    const records = this.getDummyAadhaarRecords();
    if (records.some(record => record.aadhaarNumber === aadhaarNumber)) throw new Error("This Aadhaar already exists in the dummy database.");
    const record = {
      aadhaarNumber,
      aadhaarFormatted: aadhaarNumber.replace(/(\d{4})(?=\d)/g, "$1 "),
      aadhaarMasked: "XXXX-XXXX-" + aadhaarNumber.slice(-4),
      name,
      nameTamil: "",
      gender: gender || "Male",
      dob: dob || "1992-01-01",
      age: 32,
      careOf: careOf || "S/O Demo Guardian",
      address: address || `${city || "Central"}, ${district || this.state.selectedDistrict}`,
      mobile,
      phoneMasked: "+91 ******" + mobile.slice(-4),
      district: district || this.state.selectedDistrict,
      city: city || (this.state.selectedCity === "All" ? "Central" : this.state.selectedCity),
      pincode: "600001",
      photo: "👤",
      cardType: "Resident Individual (UIDAI Smart Card)",
      qrData: `UIDAI:${aadhaarNumber}|NAME:${name}|ADDR:${district || "Chennai"}`
    };
    records.push(record);
    try {
      localStorage.setItem(this.AADHAAR_DB_KEY, JSON.stringify(records));
    } catch (err) {
      console.warn("Could not save new dummy record:", err);
    }
    return record;
  }

  // User Auth & Persona switching
  requestLoginOtp(aadhaarNumber) {
    this.pendingOtp = null;
    const clean = String(aadhaarNumber).replace(/\s+/g, "");
    if (!/^\d{12}$/.test(clean)) throw new Error("Enter a 12-digit dummy Aadhaar number.");
    const user = this.getDummyAadhaarRecords().find(record => record.aadhaarNumber === clean);
    if (!user) throw new Error("Aadhaar not found in the demo records. No OTP generated. Choose a registered dummy card below.");
    const random = new Uint32Array(1);
    crypto.getRandomValues(random);
    const code = String(100000 + random[0] % 900000);
    this.pendingOtp = { aadhaar: clean, mobile: user.mobile, name: user.name, code, expiresAt: Date.now() + 60000, attempts: 0 };
    return { ...this.pendingOtp, phoneMasked: "+91 ******" + user.mobile.slice(-4) };
  }

  loginUser(aadhaarNumber, otp) {
    const clean = String(aadhaarNumber).replace(/\s+/g, "");
    const pending = this.pendingOtp;
    if (!pending || pending.aadhaar !== clean) throw new Error("Request a demo OTP for this Aadhaar first.");
    if (Date.now() >= pending.expiresAt) {
      this.pendingOtp = null;
      throw new Error("OTP expired. Please request a new OTP.");
    }
    if (otp !== pending.code) {
      pending.attempts++;
      if (pending.attempts >= 5) {
        this.pendingOtp = null;
        throw new Error("Too many incorrect attempts. Request a new OTP.");
      }
      throw new Error("Incorrect OTP. Check the demo code and try again.");
    }
    const record = this.getDummyAadhaarRecords().find(record => record.aadhaarNumber === clean);
    if (!record || record.mobile !== pending.mobile || record.name !== pending.name) {
      this.pendingOtp = null;
      throw new Error("The linked Aadhaar record changed or was removed. Request a new OTP.");
    }
    let user = this.state.users.find(user => user.aadhaarNumber === clean);
    if (!user) {
      user = {
        aadhaarNumber: clean, isRestricted: false, restrictionDetails: null,
        weeklyQuota: { alcoholUsedUnits: 0, maxAlcoholUnits: 1, highNicotineUsed: 0, lowNicotineUsed: 0, alcoholResetDate: new Date(Date.now() + 7 * 86400000).toISOString() },
        personaBadge: "Registered Demo Citizen", personaDescription: "Verified using the separate dummy Aadhaar database."
      };
      this.state.users.push(user);
    }
    Object.assign(user, {
      name: record.name,
      nameTamil: record.nameTamil || user.nameTamil || "",
      phone: "+91 " + record.mobile,
      phoneMasked: "+91 ******" + record.mobile.slice(-4),
      district: record.district,
      city: record.city,
      address: record.address || user.address,
      careOf: record.careOf || user.careOf,
      dob: record.dob || user.dob,
      age: record.age || user.age,
      gender: record.gender || user.gender,
      pincode: record.pincode || user.pincode,
      photo: record.photo || user.photo || "👤",
      cardType: record.cardType || user.cardType,
      qrData: record.qrData || user.qrData,
      aadhaarFormatted: record.aadhaarFormatted || clean.replace(/(\d{4})(?=\d)/g, "$1 "),
      aadhaarMasked: record.aadhaarMasked || "XXXX-XXXX-" + clean.slice(-4)
    });
    this.pendingOtp = null;
    this.state.currentUser = user;
    this.state.isAdmin = false;
    this.notify();
    return user;
  }

  loginAdmin(pin) {
    if (pin === "8899" || pin === "ADMIN") {
      this.state.isAdmin = true;
      this.state.currentUser = null;
      this.state.activeView = "admin";
      this.notify();
      return true;
    }
    return false;
  }

  logout() {
    this.pendingOtp = null;
    this.state.currentUser = null;
    this.state.isAdmin = false;
    this.state.activeView = "home";
    this.notify();
  }

  switchPersona(aadhaarNumber) {
    const user = this.state.users.find(u => u.aadhaarNumber === aadhaarNumber);
    if (user) {
      this.state.currentUser = user;
      this.state.isAdmin = false;
      this.notify();
    }
  }

  // --- Monday-to-Sunday Weekly Cycle Engine ---
  // Calculates next Monday at 00:00:00 (exact moment Sunday ends and new week starts)
  getNextMondayReset(refDate = new Date()) {
    const d = new Date(refDate);
    const day = d.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    // Monday to Sunday cycle:
    // If today is Sunday (0), next day is Monday (1 day away).
    // If today is Monday (1), next Monday is 7 days away.
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
      resetDescription: "Automatic reset after Sunday 11:59 PM (Monday 00:00 AM)"
    };
  }

  checkAndResetWeeklyLimits(user) {
    if (!user || !user.weeklyQuota) return;
    const now = new Date();
    const resetDate = new Date(user.weeklyQuota.alcoholResetDate || 0);

    // If cycle expired (now is past Sunday 23:59:59 into Monday or later)
    if (isNaN(resetDate.getTime()) || now >= resetDate) {
      const nextMonday = this.getNextMondayReset(now);

      // Reset consumption counters for the new week
      user.weeklyQuota.alcoholUsedUnits = 0;
      user.weeklyQuota.highNicotineUsed = 0;
      user.weeklyQuota.lowNicotineUsed = 0;
      user.weeklyQuota.alcoholResetDate = nextMonday.toISOString();

      if (user.dailyLimits) {
        user.dailyLimits.hotUsed = 0;
        user.dailyLimits.nonHotUsed = 0;
        user.dailyLimits.date = now.toISOString().split("T")[0];
      }

      // NOTE: History (this.state.purchases and this.state.bookings) is NEVER deleted!
      // Past bookings and receipts are stored permanently.
      this.saveState();
    }
  }

  // Limit & Quota Calculations
  getUserLimits(user = this.state.currentUser) {
    const cycle = this.getCurrentWeeklyCycle();

    if (!user) {
      return {
        isRestricted: false,
        isUnderage: false,
        isBlacklisted: false,
        cycleInfo: cycle,
        alcohol: { max: 1.0, used: 0, remaining: 1.0, percent: 0, isReached: false, resetDate: cycle.nextReset.toISOString() },
        cigarettes: {
          hasAlcoholUsed: false,
          high: { max: 5, used: 0, remaining: 5, percent: 0, isReached: false },
          low: { max: 10, used: 0, remaining: 10, percent: 0, isReached: false }
        }
      };
    }

    // Auto-check and trigger weekly reset if Sunday has passed
    this.checkAndResetWeeklyLimits(user);

    const quota = user.weeklyQuota || {
      alcoholUsedUnits: 0,
      maxAlcoholUnits: 1.0,
      highNicotineUsed: 0,
      lowNicotineUsed: 0,
      alcoholResetDate: cycle.nextReset.toISOString()
    };

    const isRestricted = !!user.isRestricted;
    const isUnderage = isRestricted && (!!user.isUnderage || (user.age !== undefined && user.age < 18) || !!user.restrictionDetails?.isUnderage || (typeof user.restrictionDetails?.offenceType === 'string' && user.restrictionDetails.offenceType.includes("Underage")));
    const isBlacklisted = isRestricted && (!!user.isBlacklisted || !!user.restrictionDetails?.isBlacklisted || (typeof user.restrictionDetails?.offenceType === 'string' && user.restrictionDetails.offenceType.includes("Bootlegging")));

    const maxAlcohol = isRestricted ? 0 : 1.0;
    const alcoholUsed = isRestricted ? 0 : quota.alcoholUsedUnits;
    const alcoholRemaining = isRestricted ? 0 : Math.max(0, Math.round((maxAlcohol - alcoholUsed) * 10) / 10);
    const alcoholPercent = maxAlcohol > 0 ? Math.min(100, Math.round((alcoholUsed / maxAlcohol) * 100)) : 100;
    const isAlcoholReached = isRestricted || alcoholRemaining <= 0;

    // Cigarette Quota Rules:
    // If citizen is Underage or Blacklisted: Cigarette limits are strictly 0/0!
    // If user has NOT used alcohol (used === 0): High: 5, Low: 10
    // If user HAS used alcohol (used > 0): High: 3, Low: 6
    const hasAlcoholUsed = alcoholUsed > 0;
    let maxHigh = (isUnderage || isBlacklisted) ? 0 : (hasAlcoholUsed ? 3 : 5);
    let maxLow = (isUnderage || isBlacklisted) ? 0 : (hasAlcoholUsed ? 6 : 10);

    const highUsed = Math.min(maxHigh, (isUnderage || isBlacklisted) ? 0 : (quota.highNicotineUsed || 0));
    const lowUsed = Math.min(maxLow, (isUnderage || isBlacklisted) ? 0 : (quota.lowNicotineUsed || 0));

    const highRemaining = Math.max(0, maxHigh - highUsed);
    const lowRemaining = Math.max(0, maxLow - lowUsed);

    const highPercent = maxHigh > 0 ? Math.min(100, Math.round((highUsed / maxHigh) * 100)) : 100;
    const lowPercent = maxLow > 0 ? Math.min(100, Math.round((lowUsed / maxLow) * 100)) : 100;

    return {
      isRestricted,
      isUnderage,
      isBlacklisted,
      restrictionType: isUnderage ? 'underage' : isBlacklisted ? 'bootlegging' : user.restrictionDetails?.offenceType?.includes("Violence") ? 'violence' : 'dui',
      restrictionDetails: user.restrictionDetails,
      alcohol: {
        max: maxAlcohol,
        used: alcoholUsed,
        remaining: alcoholRemaining,
        percent: alcoholPercent,
        isReached: isAlcoholReached,
        resetDate: quota.alcoholResetDate || "2026-09-14T00:00:00+05:30"
      },
      cigarettes: {
        hasAlcoholUsed,
        high: {
          max: maxHigh,
          used: highUsed,
          remaining: highRemaining,
          percent: highPercent,
          isReached: (isUnderage || isBlacklisted || highRemaining <= 0)
        },
        low: {
          max: maxLow,
          used: lowUsed,
          remaining: lowRemaining,
          percent: lowPercent,
          isReached: (isUnderage || isBlacklisted || lowRemaining <= 0)
        }
      }
    };
  }

  // Can user book this product?
  canBookProduct(productId, quantity = 1, user = this.state.currentUser) {
    if (!user) return { allowed: false, reason: "Please log in to book products." };

    const product = this.state.products.find(p => p.id === productId);
    if (!product) return { allowed: false, reason: "Product not found." };

    const limits = this.getUserLimits(user);

    if (user.isRestricted) {
      if (limits.isUnderage) {
        return { 
          allowed: false, 
          reason: "Account Blocked (Under 18 Minor): Citizen is 17 years old. Sale of alcohol (<21) and tobacco (<18) is strictly prohibited by Tamil Nadu Prohibition Act (Sec 19) and COTPA 2003 (Sec 6)." 
        };
      }
      if (limits.isBlacklisted) {
        return { 
          allowed: false, 
          reason: "Account Barred (Blacklist): Blacklisted by TASMAC State Vigilance under TNPA Sec 4 for commercial bootlegging and unauthorized resale." 
        };
      }
      // For DUI or Public Violence: alcohol is barred
      if (product.category === "Hard Liquor" || product.category === "Beer" || product.category === "Wine") {
        return { 
          allowed: false, 
          reason: user.restrictionDetails?.statusNote || "Account Restricted: Legal prohibition recorded. Alcohol booking is suspended by Government Order." 
        };
      }
    }

    if (product.category === "Hard Liquor") {
      if (limits.alcohol.isReached) {
        return { 
          allowed: false, 
          reason: "Weekly alcohol limit reached. You can purchase again after the limit resets." 
        };
      }
      if (quantity * (product.quotaCost || 1.0) > limits.alcohol.remaining) {
        return {
          allowed: false,
          reason: `Requested quantity exceeds your remaining alcohol quota (${limits.alcohol.remaining} unit remaining). Maximum 1 full bottle per week.`
        };
      }
    } else if (product.category === "Beer" || product.category === "Wine") {
      if (limits.alcohol.isReached) {
        return { 
          allowed: false, 
          reason: "Weekly alcohol limit reached. You can purchase again after the limit resets." 
        };
      }
      const costPerItem = product.quotaCost || 0.5;
      if (quantity * costPerItem > limits.alcohol.remaining) {
        const bottlesLeft = Math.floor(limits.alcohol.remaining / costPerItem);
        return {
          allowed: false,
          reason: `Exceeds remaining quota. You have quota for ${bottlesLeft} more ${product.category} bottle(s) this week.`
        };
      }
    } else if (product.category === "Cigarettes") {
      const isHigh = product.nicotineType === "high";
      const cigLimits = isHigh ? limits.cigarettes.high : limits.cigarettes.low;
      if (cigLimits.isReached) {
        return {
          allowed: false,
          reason: `Weekly ${isHigh ? "High" : "Low"} Nicotine cigarette quota reached (${cigLimits.max} packs max per week).`
        };
      }
      if (quantity > cigLimits.remaining) {
        return {
          allowed: false,
          reason: `You can only book up to ${cigLimits.remaining} pack(s) of this cigarette category this week.`
        };
      }
    }

    return { allowed: true, reason: "" };
  }

  // Create Booking
  createBooking({ shopId, productId, quantity, date, timeSlot }) {
    if (!this.state.currentUser) {
      throw new Error("Citizen authentication required.");
    }

    const check = this.canBookProduct(productId, quantity);
    if (!check.allowed) {
      throw new Error(check.reason);
    }

    const shop = this.state.shops.find(s => s.id === shopId);
    if (!shop) throw new Error("Selected shop not found.");

    const product = this.state.products.find(p => p.id === productId);
    if (!product) throw new Error("Selected product not found.");

    // Check inventory
    const currentStock = shop.inventory?.[productId] ?? 0;
    if (currentStock < quantity) {
      throw new Error(`Insufficient stock at this shop. Only ${currentStock} item(s) available.`);
    }

    // Deduct stock
    shop.inventory[productId] = currentStock - quantity;

    // Deduct user quota
    const user = this.state.users.find(u => u.aadhaarNumber === this.state.currentUser.aadhaarNumber);
    if (user) {
      if (product.category === "Hard Liquor") {
        user.weeklyQuota.alcoholUsedUnits += (product.quotaCost || 1.0) * quantity;
      } else if (product.category === "Beer" || product.category === "Wine") {
        user.weeklyQuota.alcoholUsedUnits += (product.quotaCost || 0.5) * quantity;
      } else if (product.category === "Cigarettes") {
        if (product.nicotineType === "high") {
          user.weeklyQuota.highNicotineUsed = (user.weeklyQuota.highNicotineUsed || 0) + quantity;
        } else {
          user.weeklyQuota.lowNicotineUsed = (user.weeklyQuota.lowNicotineUsed || 0) + quantity;
        }
      }
      // Update currentUser session reference
      this.state.currentUser = user;
    }

    // Generate unique ID
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const distCode = shop.district.substring(0, 3).toUpperCase();
    const bookingId = `TASMAC-2026-${distCode}-${randomSuffix}`;

    const qrData = `TASMAC-TOKEN|ID:${bookingId}|SHOP:${shop.id}|CITIZEN:${user.aadhaarNumber.slice(-4)}|PROD:${product.name}|QTY:${quantity}|DATE:${date}|SLOT:${timeSlot}`;

    const newBooking = {
      id: bookingId,
      userId: user.aadhaarNumber,
      userName: user.name,
      userAadhaarMasked: "XXXX-XXXX-" + user.aadhaarNumber.slice(-4),
      shopId: shop.id,
      shopName: shop.name,
      shopAddress: shop.address,
      shopPhone: shop.phone,
      productId: product.id,
      productName: product.name,
      productCategory: product.category,
      quantity: quantity,
      size: product.size,
      unitPrice: product.price,
      totalAmount: product.price * quantity,
      date: date,
      timeSlot: timeSlot,
      status: "Confirmed", // Confirmed, Ready for Collection, Collected, Cancelled, Expired
      qrData: qrData,
      createdAt: new Date().toISOString(),
      notes: "Customer must visit the selected shop during the declared time slot to collect the order. Valid Govt photo ID required."
    };

    this.state.bookings.unshift(newBooking);
    this.notify();
    return newBooking;
  }

  // Cancel Booking (Citizen initiated)
  cancelBooking(bookingId) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (!booking) throw new Error("Booking not found");
    if (booking.status !== "Confirmed" && booking.status !== "Ready for Collection") {
      throw new Error("Only active bookings can be cancelled.");
    }

    booking.status = "Cancelled";
    booking.cancelledAt = new Date().toISOString();

    // Restock
    const shop = this.state.shops.find(s => s.id === booking.shopId);
    if (shop && shop.inventory && shop.inventory[booking.productId] !== undefined) {
      shop.inventory[booking.productId] += booking.quantity;
    }

    // Refund quota
    const user = this.state.users.find(u => u.aadhaarNumber === booking.userId);
    if (user && user.weeklyQuota) {
      const product = this.state.products.find(p => p.id === booking.productId);
      if (product) {
        if (product.category === "Hard Liquor") {
          user.weeklyQuota.alcoholUsedUnits = Math.max(0, user.weeklyQuota.alcoholUsedUnits - (product.quotaCost || 1.0) * booking.quantity);
        } else if (product.category === "Beer" || product.category === "Wine") {
          user.weeklyQuota.alcoholUsedUnits = Math.max(0, user.weeklyQuota.alcoholUsedUnits - (product.quotaCost || 0.5) * booking.quantity);
        } else if (product.category === "Cigarettes") {
          if (product.nicotineType === "high") {
            user.weeklyQuota.highNicotineUsed = Math.max(0, user.weeklyQuota.highNicotineUsed - booking.quantity);
          } else {
            user.weeklyQuota.lowNicotineUsed = Math.max(0, user.weeklyQuota.lowNicotineUsed - booking.quantity);
          }
        }
      }
      if (this.state.currentUser?.aadhaarNumber === user.aadhaarNumber) {
        this.state.currentUser = user;
      }
    }

    this.notify();
    return true;
  }

  // Admin Updates Booking Status
  updateBookingStatus(bookingId, newStatus) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (!booking) throw new Error("Booking not found");

    const oldStatus = booking.status;
    booking.status = newStatus;

    if (newStatus === "Collected" && oldStatus !== "Collected") {
      booking.collectedAt = new Date().toISOString();
      // Record purchase in secure purchase history
      const newPurchase = {
        id: "PUR-2026-" + Math.floor(1000 + Math.random() * 9000),
        bookingId: booking.id,
        userId: booking.userId,
        shopId: booking.shopId,
        shopName: booking.shopName,
        productName: booking.productName,
        category: booking.productCategory,
        quantity: booking.quantity,
        amount: booking.totalAmount,
        date: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        status: "Completed",
        paymentMethod: "TASMAC Smart Token / POS"
      };
      this.state.purchases.unshift(newPurchase);
    }

    this.notify();
    return booking;
  }

  // Account Restriction Controls (Admin Only)
  toggleUserRestriction(aadhaarNumber, isRestricted, restrictionData = null) {
    const user = this.state.users.find(u => u.aadhaarNumber === aadhaarNumber);
    if (!user) throw new Error("User not found");

    user.isRestricted = isRestricted;
    if (isRestricted) {
      user.restrictionDetails = restrictionData || {
        caseNumber: "TN-POL-2026-DUI-" + Math.floor(1000 + Math.random() * 9000),
        policeStation: "Chennai Traffic Investigation Wing (TIW)",
        offenceType: "Drunk Driving (Sec 185 Motor Vehicles Act)",
        bloodAlcoholLevel: "92 mg / 100 ml",
        imposedDate: new Date().toISOString().split("T")[0],
        reviewDate: "2026-12-31",
        sanctionAuthority: "Regional Transport Office & TASMAC Prohibition Wing",
        statusNote: "License suspended. Mandatory alcohol counseling pending.",
        canAppeal: true
      };
      user.isUnderage = !!(user.restrictionDetails.isUnderage || user.restrictionDetails.offenceType?.includes("Underage"));
      user.isBlacklisted = !!(user.restrictionDetails.isBlacklisted || user.restrictionDetails.offenceType?.includes("Bootlegging"));

      // Record in legal restrictions log
      const existing = this.state.legalRestrictions.find(r => r.aadhaarNumber === aadhaarNumber);
      if (!existing) {
        this.state.legalRestrictions.unshift({
          caseId: "LEG-2026-" + Math.floor(100 + Math.random() * 900),
          userAadhaarMasked: "XXXX-XXXX-" + aadhaarNumber.slice(-4),
          aadhaarNumber: aadhaarNumber,
          citizenName: user.name,
          offence: user.restrictionDetails.offenceType,
          caseNumber: user.restrictionDetails.caseNumber,
          authority: user.restrictionDetails.policeStation,
          imposedDate: user.restrictionDetails.imposedDate,
          expiryDate: user.restrictionDetails.reviewDate,
          status: "Active",
          severity: "High",
          remarks: user.restrictionDetails.statusNote
        });
      } else {
        existing.status = "Active";
        existing.offence = user.restrictionDetails.offenceType;
        existing.caseNumber = user.restrictionDetails.caseNumber;
      }
    } else {
      user.restrictionDetails = null;
      user.isUnderage = false;
      user.isBlacklisted = false;
      // Mark resolved in legal restrictions log
      const rec = this.state.legalRestrictions.find(r => r.aadhaarNumber === aadhaarNumber);
      if (rec) {
        rec.status = "Cleared / Revoked";
      }
    }

    if (this.state.currentUser?.aadhaarNumber === aadhaarNumber) {
      this.state.currentUser = user;
    }

    this.notify();
    return user;
  }

  // Reset Quotas (Admin or weekly auto-reset)
  resetUserLimits(aadhaarNumber) {
    const user = this.state.users.find(u => u.aadhaarNumber === aadhaarNumber);
    if (!user) throw new Error("User not found");

    const nextMonday = this.getNextMondayReset();
    user.weeklyQuota = {
      alcoholUsedUnits: 0,
      maxAlcoholUnits: 1.0,
      alcoholResetDate: nextMonday.toISOString(),
      highNicotineUsed: 0,
      lowNicotineUsed: 0
    };
    if (user.dailyLimits) {
      user.dailyLimits.hotUsed = 0;
      user.dailyLimits.nonHotUsed = 0;
      user.dailyLimits.date = new Date().toISOString().split("T")[0];
    }

    if (this.state.currentUser?.aadhaarNumber === aadhaarNumber) {
      this.state.currentUser = user;
    }

    // Historical purchases and bookings remain stored permanently!
    this.notify();
    return user;
  }

  // Admin Shop & Inventory Updates
  updateShopInventory(shopId, productId, newStock) {
    const shop = this.state.shops.find(s => s.id === shopId);
    if (!shop) throw new Error("Shop not found");
    if (!shop.inventory) shop.inventory = {};
    shop.inventory[productId] = Math.max(0, parseInt(newStock) || 0);
    this.notify();
  }

  toggleShopStatus(shopId) {
    const shop = this.state.shops.find(s => s.id === shopId);
    if (!shop) throw new Error("Shop not found");
    shop.isOpen = !shop.isOpen;
    this.notify();
  }

  // Filter Getters
  getFilteredShops() {
    return this.state.shops.filter(shop => {
      // District match
      if (this.state.selectedDistrict && shop.district.toLowerCase() !== this.state.selectedDistrict.toLowerCase()) {
        return false;
      }
      // City match
      if (this.state.selectedCity && this.state.selectedCity !== "All" && shop.city.toLowerCase() !== this.state.selectedCity.toLowerCase()) {
        return false;
      }
      // Text search
      if (this.state.searchQuery) {
        const q = this.state.searchQuery.toLowerCase();
        const matchName = shop.name.toLowerCase().includes(q);
        const matchId = shop.id.toLowerCase().includes(q);
        const matchAddr = shop.address.toLowerCase().includes(q);
        const matchCity = shop.city.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchAddr && !matchCity) return false;
      }
      return true;
    });
  }

  getFilteredProducts(shopId = this.state.selectedShopId) {
    const shop = shopId ? this.state.shops.find(s => s.id === shopId) : null;

    return this.state.products.filter(product => {
      // Category match
      if (this.state.selectedCategory !== "All" && product.category !== this.state.selectedCategory) {
        return false;
      }
      // Brand match
      if (this.state.selectedBrand !== "All" && product.brand !== this.state.selectedBrand) {
        return false;
      }
      // Price filter
      if (product.price > this.state.maxPrice) {
        return false;
      }
      // Shop inventory check if a shop is selected
      if (shop) {
        const inStock = (shop.inventory?.[product.id] || 0);
        if (this.state.availabilityFilter === "in-stock" && inStock <= 0) {
          return false;
        }
      }
      // Search query
      if (this.state.searchQuery) {
        const q = this.state.searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchCategory = product.category.toLowerCase().includes(q);
        const matchSub = (product.subCategory || "").toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchCategory && !matchSub) return false;
      }
      return true;
    });
  }

  // Get current user's purchase history (Strictly private)
  getUserPurchases(userId = this.state.currentUser?.aadhaarNumber) {
    if (!userId && !this.state.isAdmin) return [];
    if (this.state.isAdmin) return this.state.purchases;
    return this.state.purchases.filter(p => p.userId === userId);
  }

  // Get current user's bookings
  getUserBookings(userId = this.state.currentUser?.aadhaarNumber) {
    if (!userId && !this.state.isAdmin) return [];
    if (this.state.isAdmin) return this.state.bookings;
    return this.state.bookings.filter(b => b.userId === userId);
  }
}

// Global store instance
window.tasmacStore = new TasmacStore();
