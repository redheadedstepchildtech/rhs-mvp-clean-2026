export default function Header() {
  return (
    <header style={styles.header}>
      <h2 style={styles.title}>Redheaded Stepchild</h2>
    </header>
  );
}

const styles = {
  header: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#333",
    color: "#fff",
    marginBottom: "20px",
  },
  title: {
    margin: 0,
    fontSize: "1.4rem",
    fontFamily: "Arial, sans-serif",
  },
};