import { MOCK_MODE } from "../modules/services/mockData";

export const DemoBadge = () => {
  if (!MOCK_MODE) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold">
      Modo Demo
    </div>
  );
};
