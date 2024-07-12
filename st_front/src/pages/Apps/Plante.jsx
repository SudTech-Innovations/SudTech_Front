import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../models/utils/context/UserContext";
import Cookies from "js-cookie";

export default function AppPlante() {
  const [plantes, setPlantes] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const { fetchData } = useContext(UserContext);

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

  const handleCardClick = (plant) => {
    setSelectedPlant(plant);
  };

  const handleClosePopup = (event) => {
    if (event.target === event.currentTarget) {
      setSelectedPlant(null);
    }
  };

  return (
    <>
      <div id="pagePlantes">
        <h1>Page Plantes</h1>

        <div className="allPlants">
          {plantes.map((plant) => (
            <div
              key={plant.id}
              className="card"
              onClick={() => handleCardClick(plant)}
            >
              <div
                className="img"
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

        {selectedPlant && (
          <div className="popup" onClick={handleClosePopup}>
            <div className="popup-content">
              <p>
                {labelMapping.commonName}: {selectedPlant.commonName}
              </p>
              <p>
                {labelMapping.scientificName}: {selectedPlant.scientificName}
              </p>
              <p>
                {labelMapping.family}: {selectedPlant.family}
              </p>
              <p>
                {labelMapping.genus}: {selectedPlant.genus}
              </p>
              <p>
                {labelMapping.species}: {selectedPlant.species}
              </p>
              <p>
                {labelMapping.plantType}: {selectedPlant.plantType}
              </p>
              <p>
                {labelMapping.origin}: {selectedPlant.origin}
              </p>
              <p>
                {labelMapping.hardinessZone}: {selectedPlant.hardinessZone}
              </p>
              <p>
                {labelMapping.maxHeight}: {selectedPlant.maxHeight} cm
              </p>
              <p>
                {labelMapping.maxWidth}: {selectedPlant.maxWidth} cm
              </p>
              <p>
                {labelMapping.lightRequirement}:{" "}
                {selectedPlant.lightRequirement}
              </p>
              <p>
                {labelMapping.soilPreference}: {selectedPlant.soilPreference}
              </p>
              <p>
                {labelMapping.waterRequirement}:{" "}
                {selectedPlant.waterRequirement}
              </p>
              <p>
                {labelMapping.floweringPeriod}: {selectedPlant.floweringPeriod}
              </p>
              <p>
                {labelMapping.flowerColor}: {selectedPlant.flowerColor}
              </p>
              <p>
                {labelMapping.foliageType}: {selectedPlant.foliageType}
              </p>
              <p>
                {labelMapping.usage}: {selectedPlant.usage}
              </p>
              <p>
                {labelMapping.description}: {selectedPlant.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
