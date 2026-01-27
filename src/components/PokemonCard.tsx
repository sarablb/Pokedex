import { TYPE_COLORS } from "@/lib/colors";

interface PokemonCardProps {
  name: string;
  image: string;
  types: string[];
  listView?: boolean; // nuova prop
}

export default function PokemonCard({ name, image, types, listView }: PokemonCardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: listView ? "row" : "column",
        alignItems: listView ? "center" : "center",
        padding: "8px",
        gap: "8px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: listView ? "50px" : "80px", height: listView ? "50px" : "80px" }}
      />
      <div style={{ textAlign: listView ? "left" : "center" }}>
        <h3 style={{ margin: 0 }}>{name}</h3>
        <div style={{ display: "flex", gap: "4px", justifyContent: listView ? "flex-start" : "center" }}>
          {types.map((type) => (
            <span
              key={type}
              style={{
                backgroundColor: TYPE_COLORS[type.toLowerCase()] || "#ccc",
                color: "#fff",
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
