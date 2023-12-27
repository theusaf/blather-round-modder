import Link from "next/link";
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main>
      <div className="m-auto min-w-96 w-9/12 rounded bg-slate-500 p-2 text-white">
        <h1 className="text-2xl">Privacy Policy</h1>
        <p className="mb-2">
          This privacy policy is for the Blather Round Editor website,
          accessible at{" "}
          <Link
            href="https://blather.theusaf.org"
            className="text-blue-300 hover:underline"
          >
            https://blather.theusaf.org
          </Link>{" "}
          (the "Service"), and governs the privacy of its users who choose to
          use it. By accessing or using the Service, you agree to this Privacy
          Policy and consent to the collection, use and disclosure of your
          information as described below.
        </p>
        <h2 className="font-bold">1. Where We Collect Information.</h2>
        <p className="mb-2"></p>
        <h2 className="font-bold">2. Information We Collect.</h2>
        <p className="mb-2"></p>
        <h2 className="font-bold">3. How We Use and Share Your Information.</h2>
        <p className="mb-2"></p>
        <h2 className="font-bold">4. Policy Regarding Children.</h2>
        <p className="mb-2"></p>
        <h2 className="font-bold">5. User Control and Retention of Data.</h2>
        <p className="mb-2"></p>
        <h2 className="font-bold">6. Security.</h2>
        <p className="mb-2"></p>
        <h2 className="font-bold">7. Third-Party Websites.</h2>
        <p className="mb-2"></p>
        <h2 className="font-bold">
          8. California Consumer Privacy Act (CCPA).
        </h2>
        <p className="mb-2"></p>
        <h2 className="font-bold">
          9. General Data Protection Regulation (GDPR).
        </h2>
        <p className="mb-2"></p>
        <h2 className="font-bold">10. Changes to This Policy.</h2>
        <p className="mb-2"></p>
        <h2 className="font-bold">11. Contacting Us.</h2>
        <p className="mb-2"></p>
      </div>
    </main>
  );
}
