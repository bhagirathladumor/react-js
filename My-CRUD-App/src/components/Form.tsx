import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { studentType } from "../utils/global";

type propsType = {
  allStudents: studentType[];
  setAllStudents: (value: React.SetStateAction<studentType[]>) => void;
  editStudent: studentType | undefined;
  editIndex: number | null;
  setEditIndex: (value: React.SetStateAction<number | null>) => void;
};

interface FormErrors {
  fname?: string;
  lname?: string;
  email?: string;
  phone?: string;
  gender?: string;
  hobby?: string;
  city?: string;
  address?: string;
}

export default function Form({
  allStudents,
  setAllStudents,
  editStudent,
  editIndex,
  setEditIndex,
}: propsType) {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    gender: "",
    hobby: [] as string[],
    city: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allHobby = ["Reading", "Gaming", "Sports", "Music", "Other"];
  const allCity = ["Surat", "Rajkot", "Mumbai", "Delhi", "Bangalore"];

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(allStudents));
  }, [allStudents]);

  useEffect(() => {
    if (editStudent) {
      setFormData({
        fName: editStudent.fName,
        lName: editStudent.lName,
        email: editStudent.email,
        phone: editStudent.phone,
        gender: editStudent.gender,
        hobby: editStudent.hobby,
        city: editStudent.city,
        address: editStudent.address,
      });
    }
  }, [editStudent]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
    if (errors.gender) {
      setErrors((prev) => ({ ...prev, gender: undefined }));
    }
  };

  const handleHobbyChange = (hobbyValue: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({ ...prev, hobby: [...prev.hobby, hobbyValue] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        hobby: prev.hobby.filter((h) => h !== hobbyValue),
      }));
    }
    if (errors.hobby) {
      setErrors((prev) => ({ ...prev, hobby: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[6-9]\d{9}$/;

    if (!formData.fName.trim()) {
      newErrors.fname = "First name is required";
    } else if (formData.fName.length < 2) {
      newErrors.fname = "First name must be at least 2 characters";
    }

    if (!formData.lName.trim()) {
      newErrors.lname = "Last name is required";
    } else if (formData.lName.length < 2) {
      newErrors.lname = "Last name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    if (formData.hobby.length === 0) {
      newErrors.hobby = "Please select at least one hobby";
    }

    if (!formData.city) {
      newErrors.city = "Please select a city";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.length < 10) {
      newErrors.address = "Minimum 10 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editIndex !== null && editIndex >= 0) {
        const updatedStudents = [...allStudents];
        updatedStudents[editIndex] = formData;
        setAllStudents(updatedStudents);
        setEditIndex(null);
        toast.success("Student updated successfully! 🎉");
      } else {
        setAllStudents((prev) => [...prev, formData]);
        toast.success("Student added successfully! 🎉");
      }

      setFormData({
        fName: "",
        lName: "",
        email: "",
        phone: "",
        gender: "",
        hobby: [],
        city: "",
        address: "",
      });
      setErrors({});
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Form submission error:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      fName: "",
      lName: "",
      email: "",
      phone: "",
      gender: "",
      hobby: [],
      city: "",
      address: "",
    });
    setErrors({});
    setEditIndex(null);
    toast.info("Form has been reset");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-900/10 mb-4 transition-transform hover:scale-105 duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.263 15.541A1.749 1.749 0 0 1 3.03 12.54l6.813-6.814a1.75 1.75 0 0 1 2.474 0l6.814 6.813a1.749 1.749 0 0 1-1.232 3.003H4.263Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.25v13.5m0 0H7.5m4.5 0h4.5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
          Student Registration
        </h1>
        <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Manage and deploy comprehensive academic student profiling records.
        </p>
      </div>

      {/* Main Card Wrapper */}
      <div className="bg-white rounded-3xl border border-slate-150/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
        {/* Banner/Header Info */}
        <div className="bg-slate-50/70 border-b border-slate-100 px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {editIndex !== null ? "Modify Profile Identity" : "Create New Profile"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {editIndex !== null ? "Editing existing operational state data variables." : "All fields marked with an asterisk are required inputs."}
            </p>
          </div>
          {editIndex !== null && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/60 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Edit Active
            </span>
          )}
        </div>

        {/* Interactive Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">

          {/* Identity Matrix Grid */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Primary Metadata</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                  First Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    name="fName"
                    value={formData.fName}
                    onChange={handleInputChange}
                    placeholder="e.g. John"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 outline-none ${errors.fname
                      ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-4 focus:ring-rose-50"
                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
                      }`}
                  />
                </div>
                {errors.fname && <p className="text-xs font-medium text-rose-500 mt-1 flex items-center gap-1">{errors.fname}</p>}
              </div>

              {/* Last Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                  Last Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="lName"
                  value={formData.lName}
                  onChange={handleInputChange}
                  placeholder="e.g. Doe"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 outline-none ${errors.lname
                    ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-4 focus:ring-rose-50"
                    : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
                    }`}
                />
                {errors.lname && <p className="text-xs font-medium text-rose-500 mt-1 flex items-center gap-1">{errors.lname}</p>}
              </div>
            </div>

            {/* Contact Infrastructure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="johndoe@example.com"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 outline-none ${errors.email
                    ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-4 focus:ring-rose-50"
                    : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
                    }`}
                />
                {errors.email && <p className="text-xs font-medium text-rose-500 mt-1 flex items-center gap-1">{errors.email}</p>}
              </div>

              {/* Phone Architecture */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength={10}
                  placeholder="Enter 10-digit primary contact"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 outline-none ${errors.phone
                    ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-4 focus:ring-rose-50"
                    : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
                    }`}
                />
                {errors.phone && <p className="text-xs font-medium text-rose-500 mt-1 flex items-center gap-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Core Segmentation Filters */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Demographics & Attributes</h3>

            {/* Custom Modern Radio Segment for Gender */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                Gender Selection <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["Male", "Female", "Other"].map((option) => {
                  const isChecked = formData.gender === option;
                  return (
                    <label
                      key={option}
                      className={`flex items-center justify-center px-4 py-3 border rounded-xl cursor-pointer text-sm font-semibold transition-all duration-150 select-none ${isChecked
                        ? "border-slate-900 bg-slate-900 text-white shadow-md shadow-slate-900/10"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                        }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={isChecked}
                        onChange={(e) => handleGenderChange(e.target.value)}
                        className="sr-only"
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
              {errors.gender && <p className="text-xs font-medium text-rose-500 mt-1">{errors.gender}</p>}
            </div>

            {/* Custom Pill-styled Checkboxes for Hobbies */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                Interests / Hobbies <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {allHobby.map((hobby) => {
                  const isChecked = formData.hobby.includes(hobby);
                  return (
                    <label
                      key={hobby}
                      className={`flex items-center gap-2 px-3.5 py-1.5 border rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 select-none ${isChecked
                        ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                    >
                      <input
                        type="checkbox"
                        value={hobby}
                        checked={isChecked}
                        onChange={(e) => handleHobbyChange(hobby, e.target.checked)}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-400 border-slate-300 transition-all"
                      />
                      {hobby}
                    </label>
                  );
                })}
              </div>
              {errors.hobby && <p className="text-xs font-medium text-rose-500 mt-1">{errors.hobby}</p>}
            </div>

            {/* City Geometry Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                City / Location <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full appearance-none px-4 py-2.5 rounded-xl border text-sm font-medium bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-100 transition-all duration-200 outline-none cursor-pointer ${errors.city ? "border-rose-400 focus:border-rose-500 focus:ring-rose-50" : "border-slate-200"
                    }`}
                >
                  <option value="" className="text-slate-400">Select institutional operational city</option>
                  {allCity.map((city) => (
                    <option key={city} value={city} className="text-slate-800 font-medium">
                      {city}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
              {errors.city && <p className="text-xs font-medium text-rose-500 mt-1">{errors.city}</p>}
            </div>

            {/* Address Area */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                Full Physical Address <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter comprehensive geographical residency address details..."
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 outline-none resize-none ${errors.address
                  ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-4 focus:ring-rose-50"
                  : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
                  }`}
              />
              {errors.address && <p className="text-xs font-medium text-rose-500 mt-1">{errors.address}</p>}
            </div>
          </div>

          {/* Action Triggering Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 sm:order-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 select-none shadow-sm ${editIndex !== null
                ? "bg-amber-600 hover:bg-amber-700 text-white active:scale-[0.99]"
                : "bg-slate-900 hover:bg-slate-800 text-white active:scale-[0.99]"
                } disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none`}
            >
              {isSubmitting ? (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : editIndex !== null ? (
                "Save Modifications"
              ) : (
                "Register Student Identity"
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="py-3 px-5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 hover:text-slate-800 active:scale-[0.99] transition-all duration-150 select-none"
            >
              Reset Interface
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}