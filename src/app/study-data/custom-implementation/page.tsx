"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { port } from "@/constants/appl.constant";
import CustomResults from "@/components/UI/CustomResults";
const Page = () => {
  const [rainfall, setRainfall] = useState("");
  const [avgTemp, setAvgTemp] = useState("");
  const [relativeHumidity, setRelativeHumidity] = useState("");
  const [soilTemp, setSoilTemp] = useState("");
  const [sand, setSand] = useState("");
  const [phLevel, setPhLevel] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [clay, setClay] = useState("");
  const [productionArea, setProductionArea] = useState("");
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    const data = {
      rainfall: parseFloat(rainfall),
      avgTemp: parseFloat(avgTemp),
      relativeHumidity: parseFloat(relativeHumidity),
      soilTemp: parseFloat(soilTemp),
      sand: parseFloat(sand),
      phLevel: parseFloat(phLevel),
      phosphorus: parseFloat(phosphorus),
      potassium: parseFloat(potassium),
      clay: parseFloat(clay),
      productionArea: parseInt(productionArea, 10),
    };

    try {
      const response = await axios.post(`${port}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      setResults(response.data.data);
      setLoading(false)
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center pt-10 bg-[#F2ECDB]">
        <Link href="/study-data">
          <button className=" bg-red-500  text-white px-5 py-2 rounded-md font-semibold transition-all duration-300 hover:bg-red-600 hover:text-white">
            Go Back
          </button>
        </Link>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-[#F2ECDB]">
        <div className="bg-[#FAF8F2] shadow-md rounded-lg p-8 max-w-lg w-full my-5">
          <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
            Custom Data Implementation
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rainfall (mm)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={rainfall}
                  onChange={(e) => setRainfall(e.target.value)}
                  style={{
                    appearance: "textfield",
                    MozAppearance: "textfield",
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Average Temperature (°C)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={avgTemp}
                  onChange={(e) => setAvgTemp(e.target.value)}
                  style={{
                    appearance: "textfield",
                    MozAppearance: "textfield",
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Relative Humidity (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={relativeHumidity}
                  style={{
                    appearance: "textfield",
                    MozAppearance: "textfield",
                  }}
                  onChange={(e) => setRelativeHumidity(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Soil Temperature (°C)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={soilTemp}
                  style={{
                    appearance: "textfield",
                    MozAppearance: "textfield",
                  }}
                  onChange={(e) => setSoilTemp(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sand Content (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={sand}
                  style={{
                    appearance: "textfield",
                    MozAppearance: "textfield",
                  }}
                  onChange={(e) => setSand(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  pH Level
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={phLevel}
                  style={{
                    appearance: "textfield",
                    MozAppearance: "textfield",
                  }}
                  onChange={(e) => setPhLevel(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phosphorus (mg/kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={phosphorus}
                  style={{
                    appearance: "textfield",
                    MozAppearance: "textfield",
                  }}
                  onChange={(e) => setPhosphorus(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Potassium (mg/kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={potassium}
                  style={{
                    appearance: "textfield",
                    MozAppearance: "textfield",
                  }}
                  onChange={(e) => setPotassium(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Clay Content (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={clay}
                  onChange={(e) => setClay(e.target.value)}
                  style={{
                    appearance: "textfield",
                    MozAppearance: "textfield",
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Production Area (sqm)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={productionArea}
                  onChange={(e) => setProductionArea(e.target.value)}
                  style={{
                    appearance: "textfield",
                    MozAppearance: "textfield",
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-indigo-600 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
          {loading ? <>Loading</> : null}
          {Object.keys(results).length > 0 ? (
            <div>
              <CustomResults response={results} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Page;
