import { Container } from "@mui/system";

export default function Loader() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "80vh",
        pt: "20vh",
      }}
    >
      <div className="custom-loader"></div>
    </Container>
  );
}
