import { ApolloError, useQuery } from "@apollo/client";

import Box from "../../components/box";

import Loader from "../../components/loader";
import FooterMenu from "../../components/menu/footer_menu";

import Typo from "../../components/typo";
import FooterWidgets from "../../components/footer/footer-widgets";

import { footer_menu_query } from "./queries";
import CartPreview from "../../components/cart/cart-preview";

type Props = {
  className?: string;
};

type FooterColProps = {
  index: number;
};

const FooterColumn: React.FC<FooterColProps> = ({ index }) => {
  const { loading, data } = useQuery(footer_menu_query, {
    onError: (error: ApolloError) => {
      console.log(JSON.stringify(error));
    },
  });

  if (loading) {
    return <Loader />;
  }

  const columnData = data.footerMenu.data.attributes.Footer_Columns[index];

  return (
    <Box>
      <Typo t="h3" className="mb-2">
        {columnData.Title}
      </Typo>
      <FooterMenu data={columnData.Items} />
      <FooterWidgets data={columnData.Widgets} />
    </Box>
  );
};

const Footer: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Box className="mt-6 border-t border-grey">
        {/* Footer Columns */}
        <Box hcenter wrapper>
          <Box className="w-full px-6 py-8 grid gap-10 md:gap-0 grid-cols-1 md:grid-cols-4">
            <FooterColumn index={0} />
            <FooterColumn index={1} />
            <FooterColumn index={2} />
            <FooterColumn index={3} />
          </Box>
        </Box>
      </Box>
      <CartPreview />
    </>
  );
};
export default Footer;
