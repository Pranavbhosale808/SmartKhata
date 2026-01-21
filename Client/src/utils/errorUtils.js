export const extractErrorMessage = (error) => {
  if (!error?.response?.data) return "Something went wrong";

  const data = error.response.data;

  if (data.message) return data.message;

  if (data.errors) return Object.values(data.errors).join(", ");

  return "Request failed";
};
