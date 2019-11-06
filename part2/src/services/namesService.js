import axios from "axios";

const getAll = async () => {
  return await axios.get("http://localhost:3001/names");
};

const addPerson = async (newName, newNumber) => {
  return await axios
    .post("http://localhost:3001/names", {
      name: newName,
      phoneNumber: newNumber
    })
};

const deletePerson = async id => {
  await axios.delete(`http://localhost:3001/names/${id}`)
}

const updatePerson = async (id, updatedPerson) => {
  return await axios.put(`http://localhost:3001/names/${id}`, updatedPerson)
}

export default {
  getAll,
  addPerson,
  deletePerson,
  updatePerson
};
