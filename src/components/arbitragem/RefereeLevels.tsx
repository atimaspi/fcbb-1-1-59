
const RefereeLevels = () => {
  const levels = [
    {
      name: "Nível Internacional",
      description: "Árbitros qualificados para competições internacionais FIBA. Requer certificação internacional.",
      color: "blue"
    },
    {
      name: "Nacional A",
      description: "Árbitros para Liga Nacional e competições principais. Mínimo 5 anos de experiência.",
      color: "green"
    },
    {
      name: "Nacional B",
      description: "Árbitros para competições regionais e de formação. Entrada no sistema nacional.",
      color: "yellow"
    },
    {
      name: "Regional",
      description: "Árbitros iniciantes para competições locais e de base.",
      color: "gray"
    }
  ];

  return (
    <div className="space-y-4">
      {levels.map((level, index) => (
        <div key={index} className={`p-4 border-l-4 border-${level.color}-500 bg-${level.color}-50`}>
          <h4 className={`font-semibold text-${level.color}-800 mb-2`}>{level.name}</h4>
          <p className={`text-${level.color}-700 text-sm`}>{level.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RefereeLevels;
