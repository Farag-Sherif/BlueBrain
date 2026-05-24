import loading from "../../assets/Images/loading.gif";

export default function Loading() {
  return (
    <div className="w-full h-96 flex items-center justify-center">
      <img src={loading} alt="Loading..." className="w-16 h-16" />
    </div>
  );
}
