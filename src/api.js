const API_URL =
  "https://corax-backend.onrender.com";

// =====================================
// DEFAULT HEADERS
// =====================================

const headers = {

  "Content-Type":
    "application/json"

};

// =====================================
// REGISTER USER
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

        headers,

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

      message:
        "Server error"

    };

  }

}

// =====================================
// LOGIN USER
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

        headers,

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

      message:
        "Server error"

    };

  }

}

// =====================================
// GET PROFILE
// =====================================

export async function getProfile() {

  try {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(

        `${API_URL}/profile`,

        {

          headers: {

            Authorization:
              `Bearer ${token}`

          }

        }

      );

    return await response.json();

  }

  catch (error) {

    console.log(error);

    return {

      success: false

    };

  }

}

// =====================================
// GET WALLET
// =====================================

export async function getWallet() {

  try {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(

        `${API_URL}/wallet`,

        {

          headers: {

            Authorization:
              `Bearer ${token}`

          }

        }

      );

    return await response.json();

  }

  catch (error) {

    console.log(error);

    return {

      success: false

    };

  }

}
