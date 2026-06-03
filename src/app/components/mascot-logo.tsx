import { ImageWithFallback } from "./figma/ImageWithFallback";
import MacacoImg from "@/imports/Macaco.jpeg";

export function MascotLogo() {
  return (
    <div className="relative flex items-end">
      <ImageWithFallback
        src={MacacoImg}
        alt="PongoEdu Mascote"
        className="w-[60px] h-[70px] object-contain"
      />
    </div>
  );
}