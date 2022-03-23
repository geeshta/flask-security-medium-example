document.addEventListener("DOMContentLoaded", () => {
  // Grab the input form and the output div from the DOM
  const form = document.querySelector("#greeter-form");
  const greetBox = document.querySelector("#greet-box");

  // Listen to the form submission and prevent redirect
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Convert the form to an object
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    const response = await apiCall("/greet", "POST", formObject);

    if (response !== null) {
      // If the request was successful, output the greeting into the output div
      console.log(response);
      greetBox.innerHTML = `${response.greeting}`;
    }
  });
});

const getCSRFToken = () => {
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    // it there are cookies available, iterate over them
    for (let cookie of cookies) {
      cookie = cookie.trim();
      let [cookieName, cookieValue] = cookie.split("=");
      // if a cookies named "csrftoken" is found, return its value
      if (cookieName == "csrftoken") return cookieValue;
    }
  }
  return null;
};

/* Wrapper around fetch. If an error occurs, the response is not successful
or the response is body is not a JSON, print an error and return null
otherwise, return the response body */
const apiCall = async (url, method = "GET", body = null) => {
  const request = {
    method,
    headers: {
      Accept: "application/json"
    }
  };
  if (body) {
    request.headers["Content-Type"] = "application/json";
    request.body = JSON.stringify(body);
  }
  // If the request uses an insecure method, include the CSRF token in a header
  if (["post", "patch", "put", "delete"].includes(request.method.toLowerCase())) {
    request.headers["X-CSRFToken"] = getCSRFToken();
  }
  console.log(request);
  try {
    const response = await fetch(url, request);
    const contentType = response.headers.get("Content-Type");
    if (contentType === "application/json") {
      responseJson = await response.json();
      if (response.ok) {
        return responseJson;
      } else {
        console.error(responseJson);
        return null;
      }
    } else {
      responseText = await response.text();
      console.error(responseText);
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
