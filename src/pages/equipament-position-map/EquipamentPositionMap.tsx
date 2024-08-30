import React, { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useParams } from "react-router-dom";
import "./Map.css";
import { IEquipmentPositionHistory } from "../../models/EquipmentPositionHistory";
import MapComponent from "../../components/map/MapComponent";

const EquipamentPositionMapPage = () => {
  const { equipmentId } = useParams<{ equipmentId: string }>();
  const [equipmentHistory, setEquipmentHistory] =
    useState<IEquipmentPositionHistory>();

  useEffect(() => {
    getEquipmentPositionHistory();
  }, [equipmentId]);

  const getEquipmentPositionHistory = async () => {
    try {
      const resp = await fetch("../data/equipmentPositionHistory.json");
      const data: IEquipmentPositionHistory[] = await resp.json();

      setEquipmentHistory(data.find((eq) => eq.equipmentId === equipmentId));
    } catch (e) {
      console.log("errrorr", e);
    }
  };

  if (!equipmentHistory?.positions?.length || !equipmentId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="map-container">
      <MapComponent positions={equipmentHistory.positions} />
    </div>
  );
};

export default EquipamentPositionMapPage;
