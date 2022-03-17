import { Box } from "@mui/material";
import { useEffect } from "react";
import { PepPoint } from "./delivery-method";

export type PepProps = {
  setPepPoint: (point: PepPoint) => void;
};

const PepWidget: React.FC<PepProps> = ({ setPepPoint }) => {
  useEffect(() => {
    function receiveMessage(message) {
      if (
        message.origin == "https://map.paxi.co.za" &&
        message.data &&
        message.data.trg === "paxi"
      ) {
        var point = message.data.point;
        setPepPoint(point);
      }
    }

    window.addEventListener("message", receiveMessage);

    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, []);
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <iframe
        width="100%"
        height="100%"
        src="https://map.paxi.co.za?size=l,m,s&status=1,3,4&maxordervalue=1000&output=nc&select=true"
        frameBorder="0"
        allow="geolocation"
      ></iframe>
    </Box>
  );
};

export default PepWidget;
