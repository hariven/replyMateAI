// import React from "react";
// import { Navigate } from "react-router-dom";

// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const isLoggedIn = !!localStorage.getItem("token"); // Check if the user is logged in

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// };

// export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface PrivateRouteProps {
  children: React.ReactNode;
}

interface DecodedToken {
  exp: number; // expiry timestamp (seconds since epoch)
  id?: number;
  email?: string;
}

const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded: DecodedToken = jwtDecode(token);

    // check expiry
    if (decoded.exp && decoded.exp * 1000 > Date.now()) {
      return true;
    } else {
      // expired token → cleanup
      localStorage.removeItem("token");
      return false;
    }
  } catch (error) {
    console.error("Token decode failed:", error);
    localStorage.removeItem("token");
    return false;
  }
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = isTokenValid();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;