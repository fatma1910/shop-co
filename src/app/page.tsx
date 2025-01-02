import CategorySection from "./components/CategorySection";
import { CustomerReview } from "./components/CustomerReview";
import Hero from "./components/Hero";
import NewArrival from "./components/NewArrival";
import TopSelling from "./components/TopSelling";

export default function Home() {
  return (
    <div >
      <Hero/>
      <NewArrival/>
      <TopSelling/>
      <CategorySection/>
      <CustomerReview/>
    </div>
  );
}
