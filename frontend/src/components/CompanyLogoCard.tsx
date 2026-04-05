type CompanyLogoCardProps = {
  name: string;
  logo: string;
};

const CompanyLogoCard = ({ name, logo }: CompanyLogoCardProps) => {
  return (
    <div className="group flex h-full min-h-[110px] w-full flex-col items-center justify-center px-5 py-4 transition-all duration-300">
      <div className="flex h-20 w-full items-center justify-center">
        <img
          src={logo}
          alt={name}
          className="max-h-12 w-full object-contain opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>
      <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground group-hover:text-foreground">
        {name}
      </p>
    </div>
  );
};

export default CompanyLogoCard;
