import React from "react";

// Assuming comparisonResults is an object with jet names as keys and comparison values as values
interface ComparisonResultsProps {
  results: { [key: string]: string };
}

// Function to extract numeric values from strings like "575 nautical miles"
const extractNumber = (str: string) => {
  // Updated regex to capture both integers and decimals
  const match = str.match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
};

const ComparisonResults: React.FC<ComparisonResultsProps> = ({ results }) => {
  // Convert results object to an array and sort by the numeric value extracted from the comparison value
  const sortedResults = Object.entries(results).sort(
    (a, b) => extractNumber(b[1]) - extractNumber(a[1])
  );

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Comparison Results</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Rank
              </th>
              <th scope="col" className="px-6 py-3">
                Jet Name
              </th>
              <th scope="col" className="px-6 py-3">
                Comparison Value
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map(([jetName, value], index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {jetName}
                </td>
                <td className="px-6 py-4">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonResults;
