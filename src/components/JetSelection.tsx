import React, { useState, useEffect } from "react";
import axios from "axios";
import ComparisonResults from "./ComparisonResults";
import { Jet } from "@/types/jet";

const comparisonCategories = ["Top Speed", "Fuel Efficiency", "Maximum Seats"];

const JetSelection: React.FC = () => {
  const [jets, setJets] = useState<Jet[]>([]);
  const [selectedJets, setSelectedJets] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [comparisonResults, setComparisonResults] = useState<any>(null);

  useEffect(() => {
    const fetchJets = async () => {
      try {
        const { data } = await axios.get("/api/jets");
        setJets(data);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    fetchJets();
  }, []);

  const toggleJetSelection = (id: number) => {
    setSelectedJets((prevSelectedJets) =>
      prevSelectedJets.includes(id)
        ? prevSelectedJets.filter((jetId) => jetId !== id)
        : [...prevSelectedJets, id]
    );
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const compareSelectedJets = async () => {
    if (selectedJets.length && selectedCategory) {
      try {
        const selectedJetNames = selectedJets
          .map((jetId) => jets.find((jet) => jet.id === jetId)?.name)
          .filter((name): name is string => !!name); // This line ensures undefined values are removed and TypeScript understands the resulting array contains only strings.
        const { data } = await axios.post("/api/jets/compare", {
          jets: selectedJetNames,
          category: selectedCategory,
        });
        setComparisonResults(data); // Update state with the comparison results
      } catch (error) {
        console.error("Failed to compare jets:", error);
      }
    } else {
      // Handle the case where not enough data is selected (no jets or no category selected)
      console.warn("Please select at least one jet and a comparison category.");
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <h2 className="text-xl font-semibold my-4">Top 10 Charter Jets</h2>
        <table className="min-w-full table-auto text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Select
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Wingspan (ft)
              </th>
              <th scope="col" className="px-6 py-3">
                Number of Engines
              </th>
              <th scope="col" className="px-6 py-3">
                Manufacturing Year
              </th>
            </tr>
          </thead>
          <tbody>
            {jets.map((jet) => (
              <tr key={jet.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="text-blue-600 focus:ring-blue-500"
                    checked={selectedJets.includes(jet.id)}
                    onChange={() => toggleJetSelection(jet.id)}
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {jet.name}
                </td>
                <td className="px-6 py-4">{jet.wingspan}</td>
                <td className="px-6 py-4">{jet.numberOfEngines}</td>
                <td className="px-6 py-4">{jet.manufacturingYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-4 flex items-center">
        <label
          htmlFor="category-select"
          className="text-sm font-medium text-gray-900 mr-2"
        >
          Compare By:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 p-1.5" // Adjusted padding and removed block width
        >
          <option value="">Select a Category</option>
          {comparisonCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={compareSelectedJets}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          disabled={!selectedJets.length || !selectedCategory} // Disable the button if no jets or no category is selected
        >
          Compare Selected Jets
        </button>
      </div>
      {comparisonResults && <ComparisonResults results={comparisonResults} />}
    </div>
  );
};

export default JetSelection;
