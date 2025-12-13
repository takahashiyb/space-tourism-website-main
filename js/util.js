export const getJson = fetch("../data/data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return { json: data };
  });
