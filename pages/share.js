import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function Share() {
  const [data, setData] = useState(null);
  const [qr, setQr] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const hasPhoto = params.get("photo") === "yes";
    const storedPhoto = hasPhoto ? sessionStorage.getItem("uploadedPhoto") : null;

    const info = {
      name: params.get("name") || "",
      need: params.get("need") || "",
      method: params.get("method") || "",
      link: params.get("link") || "",
      story: params.get("story") || "",
      photo: storedPhoto,
    };

    setData(info);

    // Build the public donation page link
    const shareLink = window.location.origin + "/summary?" + params.toString();

    // Generate QR code
    QRCode.toDataURL(shareLink).then((url) => setQr(url));
  }, []);

  if (!data) return <p>Loading...</p>;

  const shareLink =
    window.location.origin + "/summary?" + window.location.search.substring(1);

  function copyLink() {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied!");
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Share Your Donation Page</h1>

      {qr && (
        <img
          src={qr}
          alt="QR Code"
          style={{ width: "220px", marginBottom: "20px" }}
        />
      )}

      <p style={styles.linkBox}>{shareLink}</p>

      <button style={styles.button} onClick={copyLink}>
        Copy Link
      </button>

      <h2 style={{ marginTop: "40px" }}>Preview Donation Card</h2>

      <div style={styles.card}>
        {data.photo && (
          <img
            src={data.photo}
            alt="Uploaded"
            style={{ width: "200px", borderRadius: "10px", marginBottom: "15px" }}
          />
        )}

        <h3>{data.name}</h3>
        <p><strong>Need:</strong> {data.need}</p>
        {data.story && <p style={styles.story}>{data.story}</p>}

        <button
          style={styles.button}
          onClick={() => window.open(data.link, "_blank")}
        >
          Donate via {data.method}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "40px", fontFamily: "Arial, sans-serif" },
  title: { fontSize: "2rem", marginBottom: "20px" },
  linkBox: {
    padding: "10px",
    backgroundColor: "#eee",
    borderRadius: "6px",
    wordBreak: "break-all",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "1.1rem",
    cursor: "pointer",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    marginBottom: "20px",
  },
  card: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    maxWidth: "350px",
  },
  story: {
    marginBottom: "20px",
    whiteSpace: "pre-wrap",
  },
};