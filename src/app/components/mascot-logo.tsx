import { ImageWithFallback } from "./figma/ImageWithFallback";

export function MascotLogo() {
  return (
    <div className="relative flex items-end">
      {/* Mascote PongoEdu - Macaco-prego cientista */}
      <ImageWithFallback
        src="/src/imports/Macaco.jpeg"
        alt="PongoEdu Mascote"
        className="w-[60px] h-[70px] object-contain"
      />
    </div>
  );
}