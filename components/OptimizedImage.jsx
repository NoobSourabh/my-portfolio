import Image from 'next/image';

const defaultCoverStyle = {
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: 'inherit',
};

export default function OptimizedImage({
  src,
  alt,
  priority = false,
  sizes = '100vw',
  style,
  className,
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ ...defaultCoverStyle, ...style }}
    />
  );
}
