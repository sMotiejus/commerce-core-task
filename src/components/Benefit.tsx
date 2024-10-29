interface BenefitProps {
  title: string;
  content: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export default function Benefit({ title, content, Icon }: BenefitProps) {
  return (
    <div className="flex gap-4 w-full">
      <div className="w-[32px] h-[32px] shrink-0">
        <Icon className="w-full h-full" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-xs font-bold">{title}</div>
        <div className="text-xs text-quantity">{content}</div>
      </div>
    </div>
  );
}
