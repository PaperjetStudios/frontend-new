import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  RadioGroup,
  Typography,
} from "@mui/material";

import { DeliveryMethod } from "../../../store/types";

import _ from "lodash";

import colors from "../../../../theme/colors";

import { useState } from "react";
import { moneyFormatter } from "../../../../config/util";
import {
  CartItems,
  cartState,
  getSelectedExtra,
  setDeliveryMethod,
  setExtraOnDeliveryMethod,
} from "../../../../state/cart";

import PepWidget from "./pep";
import { EcomRadio } from "../../../../forms/inputs/radiobutton";

import { config } from "../../config";

type Props = {
  storeId: number | string;
};

export type PepPoint = {
  id: number;
  nodeCode: string;
};

const DeliveryMethodElement: React.FC<DeliveryMethod & Props> = ({
  storeId,
  Title,
  id,
  delivery_options,
}) => {
  const [cart, setCart] = cartState.use();
  const [pepShowing, showPep] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // When a user clicks on a delivery option, find the id from the delivery options
    const selectedId = (event.target as HTMLInputElement).value;

    //find the delivery options object from the selected id
    const selectedOptionIndex = _.findIndex(delivery_options, (option) => {
      return option.id === selectedId;
    });

    // set the delivery method for that store with a cart state function called setDeliveryMethod
    setDeliveryMethod(storeId, {
      id: id,
      option: delivery_options[selectedOptionIndex],
    });

    // If it's a pep related item, show the modal box
    const selectedExtra = getSelectedExtra(storeId);
    if (!selectedExtra) {
      showPep(id === config.paxi.toString());
    }
  };

  // Set extra information in store
  const setPepPoint = (point: PepPoint) => {
    setExtraOnDeliveryMethod(storeId, {
      id: point.id,
      nodeCode: point.nodeCode,
    });
    showPep(false);
  };

  const currentIndex = _.findIndex(cart.cart, (list: CartItems) => {
    return list?.store === storeId;
  });

  const currentObject = cart.cart[currentIndex];

  const selectedMethodId = currentObject.selectedDelivery.id;
  const selectedOption = currentObject.selectedDelivery.option.id;
  const isMethodActive = selectedMethodId === id;
  const isPepSelection = id === config.paxi.toString();

  const showPepExtraDetails = () => {
    const selectedExtra = getSelectedExtra(storeId);
    if (isPepSelection && selectedExtra?.nodeCode) {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="small1">
            Selected: {selectedExtra.nodeCode}
          </Typography>
          <Button
            sx={{ fontSize: 11, ":hover": { backgroundColor: "transparent" } }}
            variant="text"
            onClick={() => showPep(true)}
            size="small"
          >
            (Change)
          </Button>
        </Box>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Box
        sx={{
          borderRadius: "5px",
          border: `1px solid ${
            isMethodActive ? colors[""] : colors["grey-light"]
          }`,
          transition: "0.2s all",
          boxShadow: isMethodActive
            ? "0 0px 10px rgba(0,0,0,0.08)"
            : "0 0 0 rgba(0,0,0,0)",
          p: 3,
        }}
      >
        <FormControl>
          <Typography variant="small2" id={`deliveryMethod-${Title}`}>
            {Title}
          </Typography>
          {showPepExtraDetails()}
          <RadioGroup
            aria-labelledby={`deliveryMethod-${Title}`}
            name="controlled-radio-buttons-group"
            value={selectedOption}
            sx={{ display: "flex", marginTop: 1 }}
            onChange={(e) => handleChange(e)}
          >
            {delivery_options.map((obj, ind) => {
              return (
                <FormControlLabel
                  key={obj.id}
                  value={obj.id}
                  control={<EcomRadio />}
                  label={`${obj.Description} (${moneyFormatter(obj.Cost)})`}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Box>
      {isPepSelection && (
        <Modal
          sx={{ width: "100%", height: "100%" }}
          open={pepShowing}
          onClose={() => showPep(false)}
        >
          <Box sx={{ width: "100%", height: "100%", padding: 5 }}>
            <PepWidget setPepPoint={setPepPoint} />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default DeliveryMethodElement;
