import Image from "next/image";

type UserAvatarProps = {
  image?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-8 w-8 text-sm",
  md: "h-12 w-12 text-xl",
  lg: "h-24 w-24 text-4xl",
};

export default function UserAvatar({ image, name, size = "md", className = "" }: UserAvatarProps) {
  const initial = name?.trim().charAt(0).toLocaleUpperCase() || "U";

  return (
    <div className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-primary font-semibold text-primary-content ${sizes[size]} ${className}`}>
      {image ? (
        <Image src={image} alt={name ? `${name} profile photo` : "Profile photo"} fill unoptimized sizes="96px" className="object-cover" />
      ) : (
        initial
      )}
    </div>
  );
}
