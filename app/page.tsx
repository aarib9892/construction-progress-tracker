import { Dashboard } from "@/components/core/dashboard";
import Image from "next/image";
import { typicalAreasData , otherAreasWithQuantityData , otherAreasWithoutQuantityData } from "@/data/tracking-data";
export default function Home() {
  const initialData = {
    typical: typicalAreasData,
    withQuantity: otherAreasWithQuantityData,
    withoutQuantity: otherAreasWithoutQuantityData,
  };
  return (
    <Dashboard initialData={initialData}/>
  );
}
