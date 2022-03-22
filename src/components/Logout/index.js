import React, { useEffect } from "react";
// Styles
import { Wrapper } from "./Logout.styles";

// hooks
import { useAuth } from "../../hooks/useAuth";

const Logout = () => {
  const auth = useAuth();
  useEffect(() => {
    auth.logout();
  });

  return (
    <Wrapper>
      <div>Logging out...</div>
    </Wrapper>
  );
};

export default Logout;
