
import React from 'react';

interface FederationsDebugInfoProps {
  debugInfo: any;
}

const FederationsDebugInfo: React.FC<FederationsDebugInfoProps> = ({ debugInfo }) => {
  if (!debugInfo) return null;

  return (
    <div className="mb-4 p-3 bg-gray-100 rounded text-xs">
      <details>
        <summary className="cursor-pointer font-medium">
          Informações Técnicas de Debug (clique para expandir)
        </summary>
        <pre className="mt-2 overflow-auto max-h-64">
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default FederationsDebugInfo;
