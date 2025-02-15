import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/UI/PrimaryButton";
import SecondaryButton from "@/components/UI/SecondaryButton";

const AdminPage = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (
      !userData.role ||
      (userData.role !== "Admin" && userData.role !== "SuperAdmin")
    ) {
      setIsAuthorized(false);
      router.push("/");
    } else {
      setIsAuthorized(true);
    }
  }, []);

  if (isAuthorized === null) {
    return <p>Loading...</p>;
  }

  if (!isAuthorized) {
    return <p>You are not authorized to access this page.</p>;
  }

  const handleDatasetDownload = () => {
    const datasetUrl = "/public/Dataset.csv";
    const a = document.createElement("a");
    a.href = datasetUrl;
    a.download = "dataset.zip";
    a.click();
  };
  const handleDocumnetDownload = () => {
    const datasetUrl = "/public/Document.pdf";
    const a = document.createElement("a");
    a.href = datasetUrl;
    a.download = "dataset.zip";
    a.click();
  };
  const handlemodalcode = () => {
    const datasetUrl = "/public/Model.py";
    const a = document.createElement("a");
    a.href = datasetUrl;
    a.download = "dataset.zip";
    a.click();
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 items-center gap-10">
        <div>
          <h3 className="text-[3rem] tracking-[-2.72px] leading-[4.5rem] text-center font-[500] __className_4bc053">
            Our Sample Snapshot
          </h3>
          <img src="/datasetimage" width="100%" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-10">
            <span onClick={handleDatasetDownload}>
              <PrimaryButton name="Download Dataset" />
            </span>
            <span onClick={handleDocumnetDownload}>
              <SecondaryButton name="Download Documentation" />
            </span>
            <span  onClick={handlemodalcode} >
            <PrimaryButton name="Download Modal" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
