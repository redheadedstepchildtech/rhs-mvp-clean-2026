export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© {new Date().getFullYear()} Redheaded Stepchild</p>
    </footer>
  );
}

const styles = {
  footer: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#f5f5f5",
    color: "#333",
    marginTop: "40px",
    textAlign: "center",
  },
  text: {
    margin: 0,
    fontSize: "0.9rem",
    fontFamily: "Arial, sans-serif",
  },
};