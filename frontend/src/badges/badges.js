import React, { useEffect, useState } from "react";
import BadgeForm from "./components/BadgeForm";
import BadgeList from "./components/BadgeList";
import { fetchBadges, createBadge } from "./utils/api";

export default function Badges() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchBadges()
      .then(data => setBadges(data))
      .finally(() => setLoading(false));
  }, []);

  const handleCreateBadge = async (badgeData) => {
    setLoading(true);
    const newBadge = await createBadge(badgeData);
    setBadges(prev => [...prev, newBadge]);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestión de Badges</h2>
      <BadgeForm onCreate={handleCreateBadge} />
      <hr className="my-4" />
      <BadgeList badges={badges} loading={loading} />
    </div>
  );
}
