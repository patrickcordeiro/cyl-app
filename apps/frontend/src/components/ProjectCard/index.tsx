import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  name: string;
  link: string;
  preview: string;
}

export default function ProjectCard({ name, link, preview }: ProjectCardProps) {
  return (
    <div className="flex max-w-80 items-center p-3 shadow-md">
      <div>
        <Image alt={name} src={preview} />
      </div>
      <div>
        <h3 className="font-bold">{name}</h3>
        <Link href={link} className="">
          Acesse aqui
        </Link>
      </div>
    </div>
  );
}
