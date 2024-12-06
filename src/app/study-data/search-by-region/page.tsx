"use client";
import HowToUse from "@/components/UI/HowToUse";
import Results from "@/components/UI/results";
import SecondaryButton from "@/components/UI/SecondaryButton";
import { Montserrat } from "next/font/google";
import React, { useEffect, useState } from "react";
const montserrat = Montserrat({ subsets: ["latin"] });
import { districts } from "@/Data/districtData";
import axios from "axios";

type DistrictData = {
  district: string;
};

export const page = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [searchresults, setSearchResults] = useState<DistrictData[]>([]);
  const [error, seterror] = useState<boolean>(Boolean);
  const [showprediction, setShowPrediction] = useState<boolean>(false);

  const findDistrict = () => {
    const matchedDistricts = districts.filter((data) =>
      data.district.toLowerCase().includes(userInput.toLowerCase())
    );
    console.log(matchedDistricts);
    setSearchResults(matchedDistricts);
  };
  useEffect(() => {
    if (userInput.length > 2) {
      findDistrict();
    }
  }, [userInput]);

  const fetchResults = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload: DistrictData = {
        district: userInput,
      };
      const response = await axios.get(
        "https://your-api-endpoint.com/resource",
        payload
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-[#F2ECDB] h-[100vh]">
      <div className="w-[800px] text-center mx-auto py-10">
        <h2
          className={`text-[3rem] tracking-[-2.72px] leading-[4.5rem] text-center font-[500] ${montserrat.className}`}
        >
          Search any Regions of Nepal
        </h2>
        <div className="relative">
          <form className="pt-10 flex gap-2" onSubmit={fetchResults}>
            <input
              type="text"
              className="w-[85%] border border-[#4C6F35] bg-transparent focus:outline-none focus:border-[#A77523] placeholder-[#4C6F35] px-4"
              value={userInput}
              placeholder="Search the regions you want to predict"
              onChange={(e) => setUserInput(e.target.value)}
            />
            <SecondaryButton name="search" />
          </form>
          {userInput.length > 1 ? (
            <>
              <div className="absolute w-[92.5%] bg-[#FAF8F2] h-[200px] overflow-auto border-[]">
                <p className="text-[#4C6F35] text-[22px] py-3">
                  Search Results :
                </p>
                {searchresults.length == 0 ? (
                  <>oops No Results found for your text try searching</>
                ) : (
                  <></>
                )}
                {searchresults.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="py-3 cursor-pointer hover:bg-[#F2ECDB]"
                    >
                      {data.district}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <HowToUse />
      </div>
    </section>
  );
};
export default page;
