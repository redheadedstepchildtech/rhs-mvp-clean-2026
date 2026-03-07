export default function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Redheaded Stepchild</h1>
        <p style={styles.tagline}>
          A simple, dignified way for people in need to share their story and receive help directly.
        </p>

        <button
          style={styles.cta}
          onClick={() => (window.location.href = "/plan")}
        >
          Create Your Donation Page
        </button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.steps}>
          <div style={styles.step}>
            <div style={styles.stepNumber}>1</div>
            <p>Create your page with a photo, your need, and your donation link.</p>
          </div>

          <div style={styles.step}>
            <div style={styles.stepNumber}>2</div>
            <p>Get a QR code and a printable donation card.</p>
          </div>

          <div style={styles.step}>
            <div style={styles.stepNumber}>3</div>
            <p>Share it in person or online so people can help directly.</p>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <p>© {new Date().getFullYear()} Redheaded Stepchild — Built with dignity in mind.</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  hero: {
    textAlign: "center",
    padding: "80px 20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "10px",
  },
  tagline: {
    fontSize: "1.2rem",
    maxWidth: "600px",
    margin: "0 auto 30px",
    lineHeight: "1.5",
  },
  cta: {
    padding: "16px 32px",
    fontSize: "1.2rem",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  section: {
    padding: "60px 20px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "2rem",
    marginBottom: "40px",
  },
  steps: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
  },
  step: {
    width: "260px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  stepNumber: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#333",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    margin: "0 auto 10px",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    marginTop: "40px",
    color: "#555",
  },
};