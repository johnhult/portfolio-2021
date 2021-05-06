import { Box } from "@theme-ui/components";
import { Helmet } from "react-helmet";

interface PageProps {
  metadata: {
    /** Meta description of the current page */
    description?: string;
    /** OpenGraph sharing image */
    image?: {
      alt?: string;
      url?: string;
      width?: number;
      height?: number;
    };
    /** HTML lang attribute */
    lang?: string;
    /** Status Code used by prerendering engines (e.g. Netlify) to catch client-side status and apply it as an HTTP status code */
    prerenderStatusCode?: number;
    /** Meta title of the current page */
    title?: string;
    /** OpenGraph document type */
    type?: string;
    /** OpenGraph document address */
    url?: string;
  };
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ metadata, children, ...props }) => {
  return (
    <Box
      sx={{
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
      }}
      {...props}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>{metadata.title || "iamjohnhult"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta lang={metadata.lang || "en"} />
        <meta
          title="description"
          content={
            metadata.description ||
            "Portfolio of John Hult, a Gothenburg based 3D artist and web developer."
          }
        />
      </Helmet>
      {children}
    </Box>
  );
};

export default Page;
