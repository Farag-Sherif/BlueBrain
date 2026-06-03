import loading from "../../assets/Images/loading.gif";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <img src={loading} alt="Loading..." className="w-full h-full object-contain" />
    </div>
  );
}
