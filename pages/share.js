import { useEffect, useState, useRef } from "react";
import QRCode from "qrcode";
import html2canvas from "html2canvas";

export default function Share() {
  const [shareLink, setShareLink] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [photo, setPhoto] = useState(null);

  const cardRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const link = window.location.href.replace("/share", "/summary");
      setShareLink(link);

      const storedPhoto = sessionStorage.getItem("uploadedPhoto");
      if (storedPhoto) setPhoto(storedPhoto);

      QRCode.toDataURL(link, { width: 300 }, (err, url) => {
        if (!err) setQrImage(url);
      });
    }
  }, []);

  async function downloadCard() {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
    });

    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "donation-card.png";
    link.click();
  }

  if (!shareLink) return <p>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {photo && (
          <img src={photo} alt="User" style={styles.photo} />
        )}

        {qrImage && (
          <img src={qrImage} alt="QR Code" style={styles.qr} />
        )}

        <button style={styles.downloadCard} onClick={downloadCard}>
          Download Donation Card
        </button>

        <a href={qrImage} download="donation-qrcode.png" style={styles.download}>
          Download QR Code Only
        </a>

        <p style={styles.subtitle}>Or copy your share link:</p>

        <div style={styles.box}>{shareLink}</div>

        <button
          style={styles.button}
          onClick={() => navigator.clipboard.writeText(shareLink)}
        >
          Copy Link
        </button>
      </div>

      {/* Hidden card for PNG rendering */}
      <div style={styles.hidden}>
        <div ref={cardRef} style={styles.renderCard}>
          {photo && (
            <img src={photo} alt="User" style={styles.renderPhoto} />
          )}
          {qrImage && (
            <img src={qrImage} alt="QR Code" style={styles.renderQR} />
          )}
          <p style={styles.renderText}>Scan to donate</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
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
  qr: {
    width: "260px",
    height: "260px",
    marginBottom: "20px",
  },
  downloadCard: {
    display: "inline-block",
    marginBottom: "20px",
    padding: "12px 20px",
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
  },
  download: {
    display: "inline-block",
    marginBottom: "20px",
    padding: "10px 20px",
    backgroundColor: "#444",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
  },
  subtitle: {
    marginBottom: "10px",
    fontSize: "1rem",
  },
  box: {
    backgroundColor: "#eee",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "20px",
    wordBreak: "break-all",
  },
  button: {
    padding: "12px 24px",
    fontSize: "1.1rem",
    cursor: "pointer",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
  },
  hidden: {
    position: "absolute",
    left: "-9999px",
    top: "-9999px",
  },
  renderCard: {
    width: "400px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    textAlign: "center",
  },
  renderPhoto: {
    width: "100%",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  renderQR: {
    width: "240px",
    height: "240px",
    marginBottom: "10px",
  },
  renderText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
};