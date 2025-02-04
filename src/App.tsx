import React, { useState, useEffect } from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: string[]; // Предположим, что colors это массив строк
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues);

  const handleParamChange = (paramId: number, value: string) => {
    const updatedParamValues = paramValues.map((paramValue) =>
      paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
    );
    setParamValues(updatedParamValues);
  };

  const getModel = (): Model => {
    return {
      paramValues,
      colors: model.colors, // Предположим, что colors не редактируются
    };
  };

  useEffect(() => {
    setParamValues(model.paramValues);
  }, [model]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '100px'}}>
      <div>
      {params.map((param) => (
        <div key={param.id} style={{display: 'flex', justifyContent: 'space-between', margin: '6px 0px', gap:'6px'}}>
          <label>{param.name}</label>
          <input
            type="text"
            value={paramValues.find((pv) => pv.paramId === param.id)?.value || ''}
            onChange={(e) => handleParamChange(param.id, e.target.value)}
          />
        </div>
      ))}
      <button onClick={() => console.log(getModel())}>Get Model</button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
    colors: ['red', 'blue'],
  };

  return <ParamEditor params={params} model={model} />;
};

export default App;
