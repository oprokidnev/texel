import { FormControl, Grid, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { getService, runService } from '../services/api';
import { FormData, SelectParameter, WebService } from '../services/interfaces';

interface Result {
  createdAt?: Date;
  updatedAt?: Date;
  output?: string;
  params: Object;
}

function SpecForm() {
  const [service, setService] = useState<WebService | null>(null);
  const [form, setForm] = useState<FormData>({});
  const [result, setResult] = useState<Result | null>(null);

  const handleParameterChange = (parameterName: string, event: ChangeEvent<{ value: unknown }>) => {
    setForm({ ...form, [parameterName]: event.target.value as string });
  };

  const saveForm = async () => {
    setResult(await runService(form));
  };

  const init = async () => {
    const serviceConfig = await getService();

    setForm(
      serviceConfig.parameters.input.reduce(
        (reduced, parameter) => ({ ...reduced, [parameter.name]: '' }),
        {}
      )
    );
    setService(serviceConfig);
  };

  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (service) {
      document.title = service.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', service.description);
    }
  }, [service]);

  return (
    <div className="spec-form">
      {service ? (
        <form noValidate>
          <h1>{service.name}</h1>
          <p>{service.description}</p>
          <Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing={2}>
            {Object.entries(service.parameters.input).map(([parameterName, parameter]) => {
              switch (parameter.type) {
                case 'number':
                  return (
                    <FormControl fullWidth margin="normal" key={`${parameterName}`}>
                      <InputLabel htmlFor={parameter.name}>{parameter.title}</InputLabel>
                      <Input
                        id={parameter.name}
                        aria-describedby={parameter.title}
                        value={form[parameter.name]}
                        onChange={handleParameterChange.bind(window, parameter.name)}
                      />
                    </FormControl>
                  );
                case 'select':
                  return (
                    <FormControl fullWidth margin="normal" key={`${parameterName}`}>
                      <InputLabel htmlFor={parameter.name}>{parameter.title}</InputLabel>
                      <Select
                        id={`${parameterName}`}
                        value={form[parameter.name]}
                        onChange={handleParameterChange.bind(window, parameter.name)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {(parameter as SelectParameter).items.map((item, parameterIndex) => (
                          <MenuItem key={`${parameterName}-${parameterIndex}`} value={item.value}>
                            {item.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  );
                default:
                  return `${JSON.stringify(parameterName)}, ${JSON.stringify(parameter)} is not supported`;
              }
            })}
            <Button variant="contained" color="primary" onClick={saveForm}>
              Save
            </Button>
          </Grid>
        </form>
      ) : (
        'Загрузка'
      )}
      {result ? <pre>{JSON.stringify(result.output)}</pre> : ''}
    </div>
  );
}

export default SpecForm;
