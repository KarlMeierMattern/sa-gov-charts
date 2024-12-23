import axios from "axios";

const worldbankController = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.worldbank.org/v2/country/ZA/indicator/SP.POP.TOTL?format=json"
    );
    const data = await response.data;
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data from World Bank API" });
  }
};

export { worldbankController };
