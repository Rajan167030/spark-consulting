type CompanyLogoCardProps = {
  name: string;
  logo: string;
};

const CompanyLogoCard = ({ name, logo }: CompanyLogoCardProps) => {
  return (
    <div className="group flex h-full min-h-[150px] w-full flex-col items-center justify-center rounded-2xl border border-border/80 bg-card/90 px-4 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
      <div className="flex h-16 w-full items-center justify-center">
        <img
          src={logo}
          alt={name}
          className="max-h-12 w-full object-contain opacity-85 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>
      <p className="mt-4 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground group-hover:text-foreground">
        {name}
      </p>
    </div>
  );
};

export default CompanyLogoCard;
