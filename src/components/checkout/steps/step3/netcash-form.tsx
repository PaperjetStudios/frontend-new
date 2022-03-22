import { useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { cartState } from "../../../../state/cart";

import useLoggedIn from "../../../auth/isLoggedIn";
import { OrderGroup } from "../../types";

export type Props = {
  group?: OrderGroup;
};

const NetcashForm: React.FC<Props> = ({ group }) => {
  const { userId, isLoggedIn } = useLoggedIn();
  const [cart] = cartState.use();

  const parsedWalletAmount = cart.walletPayment
    ? typeof cart.walletPayment === "string"
      ? parseFloat(cart.walletPayment)
      : cart.walletPayment
    : 0;

  const fullyPaid = cart.totals.total - parsedWalletAmount === 0;

  let location = useLocation();
  useEffect(() => {
    if (group && !fullyPaid) {
      //@ts-ignore
      document.getElementById("netcash").submit();
    }
  }, [group, fullyPaid]);

  if (isLoggedIn) {
    // user
  } else {
    // guest
  }

  if (fullyPaid) {
    return <Navigate to={"/order-made"} state={{ from: location }} replace />;
  }

  return (
    <form
      id="netcash"
      target="_top"
      method="POST"
      action="https://paynow.netcash.co.za/site/paynow.aspx"
    >
      <input
        type="hidden"
        name="m1"
        value="6d1797f8-4adc-4254-8074-c0992b1c9982"
      />
      <input
        type="hidden"
        name="m2"
        value="24ade73c-98cf-47b3-99be-cc7b867b3080"
      />
      <input type="hidden" name="p2" value={group.Unique} />
      <input
        type="hidden"
        name="p3"
        value={`${"firstname"} ${"lastname"} - ${group.Unique}`}
      />
      <input type="hidden" name="p4" value={group.Total - parsedWalletAmount} />
      <input type="hidden" name="m4" value={group.Unique} />
      <input type="hidden" name="m5" value={parsedWalletAmount} />
      <input type="hidden" name="m6" value={userId} />
      <input type="hidden" name="m9" value={"kb@paperjetstudios.co.za"} />
      {/*userData.me.phone_number && (
        <input type="hidden" name="m11" value={userData.me.phone_number} />
      )*/}
    </form>
  );
};

export default NetcashForm;
