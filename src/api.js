const API_URL =
  "https://corax-backend.onrender.com";

// =====================================
// REGISTER
// =====================================

export async function registerUser(
  username,
  email,
  password
) {

  try {

    const response = await fetch(

      `${API_URL}/register`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          username,
          email,
          password
        })

      }

    );

    return await response.json();

  }

  catch (error) {

    console.log(error);

    return {
      success: false,
      message: "Server error"
    };

  }

}

// =====================================
// LOGIN
// =====================================

export async function loginUser(
  email,
  password
) {

  try {

    const response = await fetch(

      `${API_URL}/login`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })

      }

    );

    return await response.json();

  }

  catch (error) {

    console.log(error);

    return {
      success: false,
      message: "Server error"
    };

  }

}
