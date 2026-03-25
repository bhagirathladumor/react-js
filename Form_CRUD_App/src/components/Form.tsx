import { useState } from 'react'

export default function StudentForm() {

  const [fName, setFName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [hobby, setHobby] = useState<string[]>([]);
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");







  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Student Profile</h2>
          <p className="mt-2 text-sm text-gray-500">Please fill in your details to complete your registration.</p>
        </div>

        <form className="space-y-6">
          {/* Name Row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
              <input 
                type="text" 
                name="f_name" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Rahul"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
              <input 
                type="text" 
                name="l_name" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Sharma"
              />
            </div>
          </div>

          {/* Contact Row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                name="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="rahul@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
              <input 
                type="tel" 
                name="phone" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          {/* Gender - Custom Radio Buttons */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Gender</label>
            <div className="flex gap-4">
              {['Male', 'Female', 'Other'].map((item) => (
                <label key={item} className="flex items-center space-x-2 cursor-pointer group">
                  <input type="radio" name="gender" value={item.toLowerCase()} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                  <span className="text-gray-600 group-hover:text-blue-600 transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Hobbies - Grid Layout */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Hobbies</label>
            <div className="grid grid-cols-2 gap-3">
              {['Reading', 'Gaming', 'Coding', 'GTA 5'].map((hobby) => (
                <label key={hobby} className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-blue-50 cursor-pointer transition-all">
                  <input type="checkbox" name="hobby" value={hobby} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                  <span className="ml-3 text-sm text-gray-600 font-medium">{hobby}</span>
                </label>
              ))}
            </div>
          </div>

          {/* City Select */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
            <select name="city" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white">
              <option value="Surat">Surat</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Pune">Pune</option>
              <option value="Banglore">Banglore</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
            <textarea 
              name="address" 
              rows="4" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Tell us your address..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-95"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  )
}