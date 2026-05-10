// =========================================
// CORΛX API.JS
// Frontend API Engine
// =========================================

// =========================================
// API URL
// =========================================

const API_URL =
    "https://corax-backend-92zg.onrender.com";

// =========================================
// REGISTER
// =========================================

async function registerUser(email,password){

    try{

        const response =
            await fetch(

                `${API_URL}/register`,

                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/json"

                    },

                    body:JSON.stringify({

                        email,
                        password

                    })

                }

            );

        const data =
            await response.json();

        return data;

    } catch(error){

        console.error(error);

        return {

            error:true,
            message:"Connection error"

        };

    }

}

// =========================================
// LOGIN
// =========================================

async function loginUser(email,password){

    try{

        const response =
            await fetch(

                `${API_URL}/login`,

                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/json"

                    },

                    body:JSON.stringify({

                        email,
                        password

                    })

                }

            );

        const data =
            await response.json();

        return data;

    } catch(error){

        console.error(error);

        return {

            error:true,
            message:"Connection error"

        };

    }

}

// =========================================
// SAVE TOKEN
// =========================================

function saveToken(token){

    localStorage.setItem(

        "corax_token",

        token

    );

}

// =========================================
// GET TOKEN
// =========================================

function getToken(){

    return localStorage.getItem(

        "corax_token"

    );

}

// =========================================
// LOGOUT
// =========================================

function logout(){

    localStorage.removeItem(

        "corax_token"

    );

    localStorage.removeItem(

        "corax_user"

    );

    window.location.href =
        "index.html";

}

// =========================================
// AUTH CHECK
// =========================================

function isAuthenticated(){

    return !!getToken();

}

// =========================================
// PROTECTED FETCH
// =========================================

async function protectedRequest(endpoint){

    try{

        const response =
            await fetch(

                `${API_URL}${endpoint}`,

                {

                    headers:{

                        Authorization:
                        `Bearer ${getToken()}`

                    }

                }

            );

        return await response.json();

    } catch(error){

        console.error(error);

    }

}

// =========================================
// READY
// =========================================

console.log(
    "CORΛX API Engine Connected 🌐"
);
