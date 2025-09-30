import { useNavigate, useParams } from "react-router";
import Page from "../../components/layout/Page";
import { useEffect, useState } from "react";
import type { AdvertData } from "./types";
import { getAdvert } from "./service";
import { AxiosError } from "axios";
//import { adverts } from "../../store/reducer"; ????

function AdvertPage() {
  const params = useParams();
  const [advert, setAdvert] = useState<AdvertData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.advertId) {
      return;
    }
    getAdvert(params.advertId)
      .then((advert) => setAdvert(advert))
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.status === 404) {
            navigate("/not-found", { replace: true });
          }
        }
      });
  }, [params.advertId, navigate]);

  return (
    <Page title="Advert detail">
      Advert detail {params.advertId}-{advert?.description}
    </Page>
  );
}

export default AdvertPage;