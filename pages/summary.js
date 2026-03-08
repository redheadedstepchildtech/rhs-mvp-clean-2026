import { useEffect, useState } from "react";

export default function Summary() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const hasPhoto = params.get("photo") === "yes";
    const storedPhoto = hasPhoto ? sessionStorage.getItem("uploadedPhoto") : null;

    setData({
      name: params.get("name") || "",
      need: params.get("need") || "",
      method: params.get("method") || "",
      link: params.get("link") || "",
      story: params.get("story") || "",
      photo: storedPhoto,
    });
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{data.name}'s Donation Page</h1>

      {data.photo && (
        <img
          src={data.photo}
          alt="Uploaded"
          style={{ width: "250px", borderRadius: "10px", marginBottom: "20px" }}
        />
      )}

      <p style={styles.need}><strong>Need:</strong> {data.need}</p>

      {data.story && (
        <p style={styles.story}><strong>Why I need help:</strong> {data.story}</p>
      )}

      <h3>Donation Options</h3>
      <button
        style={styles.button}
        onClick={() => window.open(data.link, "_blank")}
      >
        Donate via {data.method}
      </button>

      <button
        style={styles.button}
        onClick={() =>
          (window.location.href = "/share" + window.location.search)
        }
      >
        Get QR Code & Share Link
      </button>
    </div>
  );
}

const styles = {
  container: { padding: "40px", fontFamily: "Arial, sans-serif" },
  title: { fontSize: "2rem", marginBottom: "20px" },
  need: { fontSize: "1.2rem", marginBottom: "10px" },
  story: { marginBottom: "20px" },
  button: {
    padding: "12px 24px",
    fontSize: "1.1rem",
    cursor: "pointer",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    marginRight: "10px",
    marginTop: "10px",
  },
};