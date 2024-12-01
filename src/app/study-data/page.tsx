"use client";
import React, { useEffect, useState } from "react";
import { wheatData } from "@/Data/wheatData";
import axios from "axios";
import { Montserrat } from "next/font/google";
import PrimaryButton from "@/components/UI/PrimaryButton";
import SecondaryButton from "@/components/UI/SecondaryButton";
import Results from "@/components/UI/results";
const montserrat = Montserrat({ subsets: ["latin"] });

type DistrictData = {
  name: string;
};

const page = () => {
  const [searchresults, setSearchResults] = useState<DistrictData[]>([]);
  const [searchbyInput, setSearchbyInput] = useState<boolean>();
  const [showprediction, setShowPrediction] = useState<boolean>(false);
  const [latestSearch, setLatestSearch] = useState<string>("");
  const [hideResults, setHideResults] = useState<boolean>();
  const [userInput, setUserInput] = useState<string>("");
  const [rainfall, setRainfall] = useState<number | string>("");
  const [avgTemp, setAvgTemp] = useState<number | string>("");
  const [relativeHumidity, setRelativeHumidity] = useState<number | string>("");
  const [phLevel, setPhLevel] = useState<number | string>("");
  const [phosohorus, setPhosohorus] = useState<number | string>("");
  const [potassium, setPotassium] = useState<number | string>("");
  const [clay, setClay] = useState<number | string>("");
  const [sand, setSand] = useState<number | string>("");
  const [response, setResponse] = useState<number | string>("");
  const [error, seterror] = useState<boolean>(Boolean);

  useEffect(() => {
    if (userInput.length > 1) {
      findDistrictName();
    }
  }, [userInput]);

  const findDistrictName = () => {
    const searchedData = wheatData.filter((data) =>
      data.name.toLowerCase().includes(userInput.toLowerCase())
    );
    setSearchResults(searchedData || []);
  };
  console.log(error);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const finddistrict = wheatData.find(
      (data) => data.name.toLowerCase() == userInput.toLowerCase()
    );
    if (!finddistrict) {
      seterror(true);
      setShowPrediction(false);
      setUserInput("");
      return;
    }
    seterror(false);

      const {
        Rainfall,
        AvgTemp,
        RelativeHumidity,
        PHLevel,
        Phosphorus,
        Potassium,
        Clay,
        Sand,
      } = finddistrict?.data || {};
      setLatestSearch(userInput);
      setUserInput("");
      setShowPrediction(true);
      try {
        const responsedata = await axios.post(
          "http://10.200.10.25:5000/predict",
          {
            rainfall: Rainfall,
            avgTemp: AvgTemp,
            relativeHumidity: RelativeHumidity,
            sand: Sand,
            phLevel: PHLevel,
            phosohorus: Phosphorus,
            potassium: Potassium,
            clay: Clay,
          }
        );
        setResponse(responsedata.data.prediction);
      } catch (error) {
        console.error("Error during request:", error);
      }
  };

  return (
    <>
      <section className="bg-[#F2ECDB]">
        <div className="w-[800px] text-center mx-auto py-10">
          <h2
            className={`text-[3rem] tracking-[-2.72px] leading-[4.5rem] text-center font-[500] ${montserrat.className}`}
          >
            {searchbyInput ? (
              <>Search any Regions of Nepal</>
            ) : (
              <> Analyze the Data with Us</>
            )}
          </h2>
          {!searchbyInput ? (
            <>
              <div className="">
                <p className="text-md mt-10 text-[#3b3f44]">
                  Dive into the data and unlock valuable insights! Whether
                  you’re analyzing regional trends or predicting wheat yields,
                  we help you make sense of key agricultural factors like
                  rainfall, temperature, soil quality, and more.
                </p>
                <p className="text-md mb-6 text-[#3b3f44]">
                  With our interactive tools, you can easily explore and
                  understand how different conditions impact wheat production in
                  various districts. Empower your farming decisions with
                  accurate data and predictive analysis!
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
          {!searchbyInput ? (
            <>
              <div className="flex gap-3 items-center justify-center">
                <div
                  onClick={() => {
                    setSearchbyInput(true);
                  }}
                >
                  <PrimaryButton name="Explore Region Data" />
                </div>
                <div>
                  <SecondaryButton name="Custom Data Implementation" />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {searchbyInput ? (
            <div className="relative">
              <form className="pt-10 flex gap-2 " onSubmit={handleSubmit}>
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
                          onClick={(e) => {
                            setUserInput(data.name);
                            handleSubmit(e);
                          }}
                        >
                          {data.name}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <></>
              )}
              {error ? (
                <div className="py-10 bg-[url('/grunge_bg.jpg')] bg-cover bg-center my-5">
                  No districts found from your input please search correct
                  district.you can also take help form suggestions
                </div>
              ) : (
                <>
                  {showprediction && !error ? (
                    <div className="py-10 bg-[url('/grunge_bg.jpg')] bg-cover bg-center my-5">
                      <h6
                        className={`text-[1.5rem] leading-[4.5rem] text-center font-[500] ${montserrat.className}`}
                      >
                        Showing Wheat Predicton for {latestSearch}
                      </h6>
                      <div>
                        <Results response={response} />
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          ) : (
            <></>
          )}
          <div className="py-10">
            <h3
              className={`text-[2.5rem] tracking-[-2.2px] leading-[4.5rem] text-center font-[500] ${montserrat.className}`}
            >
              HOW TO USE
            </h3>
            <p>
              There are Two way for analyzing your data. Exploring the Region
              data or custom data implementation.
            </p>
            <h6
              className={`text-[1.2rem] leading-[4.2rem] text-[#3b3f44] text-start font-[500] ${montserrat.className}`}
            >
              For Exploring Region Data
            </h6>
            <p className="text-left text-[#3b3f44]">
              Press the button to explore regional data and enter the name of
              any region to predict wheat cultivation trends in Nepal. You can
              search for district names or specific region names, providing
              valuable insights into wheat production across the country. Please
              note that this tool is exclusively designed for Nepal, and the
              predictions are based on regional agricultural data specific to
              this area. Start your search now to understand the cultivation
              patterns and plan effectively for the upcoming season.
            </p>
            <h6
              className={`text-[1.2rem] leading-[4.2rem] text-[#3b3f44] text-start font-[500] ${montserrat.className}`}
            >
              For Custom Data Implementation
            </h6>
            <p className="text-left text-[#3b3f44]">
              You can easily enter the required data in the input fields
              provided. Simply add the accurate information for any location
              around the world, and our system will generate a prediction
              tailored to that specific region. Whether you’re tracking weather
              patterns, soil conditions, or other vital factors, you’ll receive
              an accurate forecast to help make informed decisions. Get started
              now to see how data-driven insights can assist with your
              agricultural planning or research!
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
