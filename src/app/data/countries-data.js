import { useState, useEffect } from "react";

function countriesData() {
  // Implementation for countries function
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch countries data from an API or define it locally
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/independent?status=true&fields=name,flags");
        const data = await response.json();
        setCountries(data); 
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);
  return countries;
}
export default countriesData;