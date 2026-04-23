import TitleBG from "../../assets/Images/TitleBG.png";
const Title = ({ children, className = "" }) => {
    return (
      <div className="title h-80 flex items-center bg-start bg-no-repeat md:bg-center bg-cover mt-10 md:mt-10 lg:mt-15 xl:mt-20 mb-20" style={{backgroundImage : `url(${TitleBG})`}}>
            
    <h1
      className={`container mx-auto px-4 text-4xl md:text-6xl font-bold text-white uppercase ${className}`} >
      {children}
    </h1>
      </div>
  );
};

export default Title;