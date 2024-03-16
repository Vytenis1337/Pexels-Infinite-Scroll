import FavSection from "../components/favSection/FavSection";
import FetchImages from "../components/fetchImages/FetchImages";
import ScrollTopButton from "../components/scrollTopButton/ScrollTopButton";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="container">
      <FavSection />
      <FetchImages />
      <ScrollTopButton />
    </div>
  );
};

export default MainPage;
