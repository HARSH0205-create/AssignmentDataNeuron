import axios from "axios";

const ENDPOINT = "https://backend-q33h.onrender.com"
// const ENDPOINT = "http://localhost:3001"


export const getUserData = async () => {
  try {
    const response = await axios.get(ENDPOINT + "/data");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const postUserData = async (userData: any) => {
  try {
    let response = await axios.post(ENDPOINT + "/data/add", userData);
    return response.data;
  } catch (error) {
    console.error("Error adding data:", error);
  }
};

export const updateUserData = async (selectedData:any) => {
  try {
    const response = await axios.put(
      ENDPOINT + `/data/update/${selectedData._id}`,
      selectedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
  }
};
