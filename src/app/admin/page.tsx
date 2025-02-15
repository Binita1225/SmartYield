// app/admin/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    // You don't need client-side redirects here, it's handled by the middleware
    if (
      !userData.role ||
      (userData.role !== "Admin" && userData.role !== "SuperAdmin")
    ) {
      setIsAuthorized(false); // Optionally, show an unauthorized message
      router.push("/"); // Redirect if user is unauthorized
    } else {
      setIsAuthorized(true);
    }
  }, []);

  if (isAuthorized === null) {
    return <p>Loading...</p>; // Show loading state while checking authorization
  }

  if (!isAuthorized) {
    return <p>You are not authorized to access this page.</p>; // Show unauthorized message
  }

  return (
    <div>
      <h1>Welcome to the Admin Page</h1>
      {/* Your admin page content here */}
    </div>
  );
};

export default AdminPage;
