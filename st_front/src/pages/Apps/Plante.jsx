import { useEffect, useState, useContext } from "react";
import UserContext from "../../models/utils/context/UserContext";
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

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const fetchPlantes = async () => {
        try {
          const response = await fetch("http://localhost:8390/app/plant", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setPlantes(data);
          console.log(data);
        } catch (error) {
          console.error("Erreur de récupération des plantes", error);
        }
      };
      fetchPlantes();
    }
  }, []);

  return (
    <>
      <div id="pagePlantes">
        <h1>Page Plantes</h1>

        <div className="allPlants">
          {plantes.map((plant) => (
            <div key={plant.id} className="plant">
              {Object.entries(plant).map(([key, value]) => {
                if (value !== null && value !== "") {
                  return (
                    <div key={key} className={"plant-" + key}>
                      <span className="detail-label">
                        {labelMapping[key] || key}:
                      </span>
                      <span className="detail-value">{value}</span>
                    </div>
                  );
                }
                return null;
              })}
              <img
                src={plant.imageUrl}
                alt={plant.commonName}
                className="plant-image"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
