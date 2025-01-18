"use client";
import React, { useEffect, useState } from "react";

const TermsAndConditions = () => {
  // Fix: Change the state type to string | null
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    // Now TypeScript knows this is valid
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        lineHeight: "1.6",
        color: "#333",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Terms and Conditions
      </h1>
      <p>
        <strong>Last Updated:</strong> {lastUpdated || "Loading..."}
      </p>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2>1. General Information</h2>
        <p>
          1.1. <strong>Eligibility</strong> <br />
          You must be at least 18 years old or have parental/guardian consent to
          use our website. By using the website, you confirm that you meet these
          requirements.
        </p>
        <p>
          1.2. <strong>Acceptance of Terms</strong> <br />
          By accessing or using our website, you agree to comply with and be
          bound by these terms. If you do not agree, please do not use our
          services.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2>2. Use of Services</h2>
        <p>
          2.1. You agree not to misuse our services for illegal purposes or to
          breach any applicable laws or regulations.
        </p>
        <p>
          2.2. We reserve the right to suspend or terminate your account if we
          suspect misuse of our platform.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2>3. Products and Services</h2>
        <p>
          3.1. All products are sourced directly from farmers to ensure
          authenticity and freshness. However, availability may vary.
        </p>
        <p>
          3.2. Pricing and product descriptions are subject to change without
          prior notice.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2>4. Limitation of Liability</h2>
        <p>
          4.1. Our liability is limited to the maximum extent permitted by law.
          We are not responsible for indirect damages arising from the use of
          our services.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2>5. Governing Law</h2>
        <p>
          5.1. These terms are governed by the laws of India. Any disputes will
          be resolved under the exclusive jurisdiction of the courts in [Your
          City].
        </p>
      </section>

      <section>
        <h2>6. Changes to the Terms</h2>
        <p>
          6.1. We reserve the right to modify these terms at any time. Changes
          will be posted on this page, and your continued use of the website
          indicates acceptance of the modified terms.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
