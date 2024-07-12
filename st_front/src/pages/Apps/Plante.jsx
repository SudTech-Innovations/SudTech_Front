import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../models/utils/context/UserContext";
import Cookies from "js-cookie";

export default function AppPlante() {
  const [plantes, setPlantes] = useState([]);
  const labelMapping = {
    commonName: "Nom commun",
    scientificName: "Nom scientifique",
    family: "Famille",
    genus: "Genre",
    species: "Espèce",
    plantType: "Type de plante",
    origin: "Origine",
    hardinessZone: "Zone de rusticité",
    maxHeight: "Hauteur maximale en cm",
    maxWidth: "Largeur maximale en cm",
    lightRequirement: "Besoin en lumière",
    soilPreference: "Préférence de sol",
    waterRequirement: "Besoin en eau",
    floweringPeriod: "Période de floraison",
    flowerColor: "Couleur de fleur",
    foliageType: "Type de feuillage",
    usage: "Utilisation",
    description: "Description",
    imageUrl: "URL de l'image",
  };

  const { fetchData } = useContext(UserContext);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const fetchPlantes = async () => {
        try {
          const data = await fetchData("/app/plant");
          setPlantes(data);
          console.log(data);
        } catch (error) {
          console.error("Erreur de récupération des plantes", error);
        }
      };
      fetchPlantes();
    }
  }, [fetchData]);

  return (
    <>
      <div id="pagePlantes">
        <h1>Page Plantes</h1>

        <div className="allPlants">
          {plantes.map((plant) => (
            <div key={plant.id} className="card">
              <div
                class="img"
                style={{
                  backgroundImage: `url(${plant.imageUrl})`,
                  backgroundPosition: "center",
                  backgroundSize: "150%",
                }}
              />
              <div className="text">
                <p className="h3">{plant.commonName}</p>
                <p className="p">{plant.scientificName}</p>
                <p className="span">{plant.origin}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
