import { useEffect, useState } from "react";

export default function Summary() {
  const [data, setData] = useState({});
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const obj = {};
      params.forEach((value, key) => {
        obj[key] = value;
      });
      setData(obj);

      const storedPhoto = sessionStorage.getItem("uploadedPhoto");
      if (storedPhoto) setPhoto(storedPhoto);
    }
  }, []);

  if (!data.name) return <p>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {photo && (
          <img src={photo} alt="User" style={styles.photo} />
        )}

        <h1 style={styles.name}>{data.name}</h1>
        <p style={styles.need}>I need help with: {data.need}</p>

        {data.story && (
          <p style={styles.story}>{data.story}</p>
        )}

        <button
          style={styles.button}
          onClick={() => {
            if (data.method === "Direct Deposit") {
              alert("Direct Deposit setup is coming soon.");
              return;
            }
            window.open(data.link, "_blank");
          }}
        >
          Donate via {data.method}
        </button>

        <button
          style={styles.secondaryButton}
          onClick={() => {
            window.location.href = "/share?" + window.location.search.substring(1);
          }}
        >
          Share This Page
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  photo: {
    width: "100%",
    maxWidth: "260px",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  name: {
    fontSize: "1.8rem",
    marginBottom: "10px",
  },
  need: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  story: {
    fontSize: "1rem",
    marginBottom: "20px",
    whiteSpace: "pre-wrap",
  },
  button: {
    width: "100%",
    padding: "14px",
    fontSize: "1.1rem",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "15px",
  },
  secondaryButton: {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    backgroundColor: "#eee",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
  },
};