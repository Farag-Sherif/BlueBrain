import loading from "../../assets/Images/loading.gif";

export default function Loading() {
  return (
    <div className="loading-container fixed z-50 w-full h-screen">
      <img src={loading} alt="Loading..." className="loading-image" />
    </div>
  );
}
