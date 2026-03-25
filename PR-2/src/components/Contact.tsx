import React, { useState } from "react";

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <style>{`
        .contact-section * { font-family: 'Space Grotesk', sans-serif; }
        .contact-section {
          background: #000a06;
          padding: 100px 0;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .contact-badge {
          display: inline-block;
          background: rgba(10,173,10,0.1);
          border: 1px solid rgba(10,173,10,0.25);
          border-radius: 999px; padding: 5px 16px;
          color: #0aad0a; font-size: 13px; font-weight: 500;
          margin-bottom: 16px;
        }
        .contact-title {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700; color: #fff;
          letter-spacing: -1px; margin-bottom: 12px;
        }
        .contact-subtitle {
          font-size: 15px; color: rgba(255,255,255,0.4);
          margin-bottom: 48px;
        }
        .contact-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px; padding: 40px;
        }
        .contact-label {
          display: block;
          font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.6);
          margin-bottom: 8px; letter-spacing: 0.3px;
        }
        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 13px 16px;
          font-size: 14px; color: #fff;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          font-family: 'Space Grotesk', sans-serif;
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.2); }
        .contact-input:focus {
          border-color: rgba(10,173,10,0.5);
          background: rgba(10,173,10,0.04);
        }
        .contact-submit {
          width: 100%;
          background: #0aad0a; color: #fff;
          border: none; border-radius: 999px;
          padding: 14px; font-size: 15px; font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          font-family: 'Space Grotesk', sans-serif;
          margin-top: 8px;
        }
        .contact-submit:hover {
          background: #088a08;
          box-shadow: 0 0 24px rgba(10,173,10,0.45);
          transform: translateY(-2px);
        }
      `}</style>

      <section id="contact" className="contact-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <span className="contact-badge">Get In Touch</span>
              <h2 className="contact-title">Let's Work Together</h2>
              <p className="contact-subtitle">Have a project in mind? Drop me a message.</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="contact-card">
                <div style={{ marginBottom: 20 }}>
                  <label className="contact-label">Your Name</label>
                  <input className="contact-input" type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label className="contact-label">Email Address</label>
                  <input className="contact-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label className="contact-label">Message</label>
                  <textarea className="contact-input" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." rows={5} style={{ resize: "none" }} />
                </div>
                <button className="contact-submit">Send Message →</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
