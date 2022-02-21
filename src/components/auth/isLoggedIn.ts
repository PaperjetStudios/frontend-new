import { useState, useEffect } from "react";

import { userState } from "../../state/user";

function useLoggedIn() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = userState.get();
    setLoggedIn(user.jwt !== undefined);
  }, []);

  return isLoggedIn;
}

export default useLoggedIn;
