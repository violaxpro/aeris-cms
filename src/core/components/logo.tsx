import Image from 'next/image';
import logoImg from '@public/logo/Alarm Expert Logo.webp';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}

export default function Logo({ iconOnly = false, ...props }: IconProps) {
  return (
    <div className="relative aspect-video h-10 w-full">
      <Image alt="logo" src={logoImg} fill />
    </div>
  );
}
