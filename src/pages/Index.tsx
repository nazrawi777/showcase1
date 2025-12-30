import { HeroBanner } from "@/components/HeroBanner";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Anime Store — Flash Sales, Collector Bundles & New Releases</title>
        <meta 
          name="description" 
          content="Shop premium anime merchandise with exclusive flash sales, limited collector bundles, and early access to new releases. Up to 50% off trending titles, figures, and apparel." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://animestore.example.com" />
      </Helmet>
      <main>
        <HeroBanner />
      </main>
    </>
  );
};

export default Index;
