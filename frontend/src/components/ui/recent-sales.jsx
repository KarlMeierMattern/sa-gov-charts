import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import axios from "axios";

export function RecentSales() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/gov/sarb-all"); // fetch from the backend
        setResponse(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const privateCon =
    response.find(
      (item) => item.sector === "Private consumption expenditure (sa)"
    )?.currentValue || 0;

  const conGov =
    response.find(
      (item) =>
        item.sector === "Consumption expenditure by general government (sa)"
    )?.currentValue || 0;

  const fixInv =
    response.find(
      (item) => item.sector === "Gross domestic fixed investment (sa)"
    )?.currentValue || 0;

  const changeInv =
    response.find((item) => item.sector === "Change in inventories (sa)")
      ?.currentValue || 0;

  const exports =
    response.find(
      (item) => item.sector === "Exports of goods and non-factor services (sa)"
    )?.currentValue || 0;

  const imports =
    response.find(
      (item) => item.sector === "Imports of goods and non-factor services (sa)"
    )?.currentValue || 0;

  const residItem =
    response.find((item) => item.sector === "Residual item (sa)")
      ?.currentValue || 0;

  const gdp =
    response.find(
      (item) => item.sector === "GDP at market prices (current, sa)"
    )?.currentValue || 0;

  const quarterReported =
    response.find((item) => item.sector === "Gross domestic expenditure")
      ?.period || 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Private Consumption Expenditure{" "}
          </p>
        </div>
        <div className="ml-auto font-medium">
          R{parseFloat(privateCon).toLocaleString()}m
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>G</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Government Consumption Expenditure
          </p>
        </div>
        <div className="ml-auto font-medium">
          {" "}
          R{parseFloat(conGov).toLocaleString()}m
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>I</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Gross Domestic Fixed Investment
          </p>
        </div>
        <div className="ml-auto font-medium">
          R{parseFloat(fixInv).toLocaleString()}m
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>&Delta;I</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Change in Inventories
          </p>
        </div>
        <div className="ml-auto font-medium">
          R{parseFloat(changeInv).toLocaleString()}m
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>E</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Exports</p>
        </div>
        <div className="ml-auto font-medium">
          R{parseFloat(exports).toLocaleString()}m
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>I</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Imports</p>
        </div>
        <div className="ml-auto font-medium">
          R{parseFloat(imports).toLocaleString()}m
        </div>
      </div>
    </div>
  );
}
