router.get("/:id/equipments", async (req, res) => {
  const practicalId = req.params.id;

  const { data, error } = await supabase
    .from("practical_equipments")
    .select("zone_id, equipment(*)")
    .eq("p_id", practicalId);

  if (error) return res.status(500).json({ error });

  // Format response
  const equipments = data.map((row) => ({
    id: row.equipments.id,
    name: row.equipments.name,
    image: row.equipments.image,
    zone_id: row.zone_id,
  }));

  res.json(equipments);
});
