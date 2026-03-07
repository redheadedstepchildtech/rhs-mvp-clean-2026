import { useState } from "react";

export default function Plan() {
  const [form, setForm] = useState({
    name: "",
    need: "",
    method: "",
    link: "",
    story: "",
    photo: null,
  });

  const [previewStory, setPreviewStory] = useState("");
  const [showModal, setShowModal] = useState(false);

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  async function improveStory() {
    if (!form.story.trim()) return;

    const res = await fetch("/api/improve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ story: form.story }),
    });

    const data = await res.json();
    setPreviewStory(data.improved);
    setShowModal(true);
  }

  function acceptImprovedStory() {
    update("story", previewStory);
    setShowModal(false);
  }

  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      sessionStorage.setItem("uploadedPhoto", reader.result);
      update("photo", reader.result);
    };
    reader.readAsDataURL(file);
  }

  function submitForm() {
    const params = new URLSearchParams({
      name: form.name,
      need: form.need,
      method: form.method,
      link: form.link,
      story: form.story,
    }).toString();

    window.location.href =
      "/summary?" + params + "&photo=" + (form.photo ? "yes" : "no");
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Your Donation Page</h1>

        <input
          style={styles.input}
          placeholder="Your name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />

        {/* NEED DROPDOWN */}
        <select
          style={styles.input}
          value={form.need}
          onChange={(e) => update("need", e.target.value)}
        >
          <option value="">What do you need?</option>
          <option value="Food">Food</option>
          <option value="Shelter">Shelter</option>
          <option value="Warm Clothes">Warm Clothes</option>
          <option value="Gas Money">Gas Money</option>
          <option value="Medical Help">Medical Help</option>
          <option value="Legal Help">Legal Help</option>
          <option value="Transportation">Transportation</option>
          <option value="Other">Other (type below)</option>
        </select>

        {/* FULL DONATION METHOD LIST */}
        <select
          style={styles.input}
          value={form.method}
          onChange={(e) => update("method", e.target.value)}
        >
          <option value="">Select donation method</option>
          <option value="Cash App">Cash App</option>
          <option value="Venmo">Venmo</option>
          <option value="PayPal">PayPal</option>
          <option value="Zelle">Zelle</option>
          <option value="GoFundMe">GoFundMe</option>
          <option value="Amazon Gift Card">Amazon Gift Card</option>
          <option value="Walmart Gift Card">Walmart Gift Card</option>
          <option value="Visa/Mastercard Gift Card">Visa/Mastercard Gift Card</option>
          <option value="Direct Deposit">Direct Deposit (Bank Account)</option>
        </select>

        <input
          style={styles.input}
          placeholder="Your donation link"
          value={form.link}
          onChange={(e) => update("link", e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Short story (optional)"
          value={form.story}
          onChange={(e) => update("story", e.target.value)}
        />

        <button style={styles.secondaryButton} onClick={improveStory}>
          Improve My Story
        </button>

        <input type="file" accept="image/*" onChange={handlePhotoUpload} />

        <button style={styles.button} onClick={submitForm}>
          Preview Donation Page
        </button>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Improved Story</h2>
            <p style={styles.modalText}>{previewStory}</p>

            <button style={styles.acceptButton} onClick={acceptImprovedStory}>
              Accept
            </button>

            <button
              style={styles.cancelButton}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
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
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    height: "100px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
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
    marginTop: "10px",
  },
  secondaryButton: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: "#eee",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
  },
  modalText: {
    marginBottom: "20px",
    whiteSpace: "pre-wrap",
  },
  acceptButton: {
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#ccc",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};