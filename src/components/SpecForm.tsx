import Button from "@material-ui/core/Button";
import React, { useEffect, useState, ChangeEvent } from "react";

import { getServices, WebService, SelectParameter } from "../api/web-services";
import {
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Grid,
} from "@material-ui/core";

interface FormData {
  [k: string]: string;
}

function SpecForm() {
  const [service, setService] = useState<WebService | null>(null);
  const [form, setForm] = useState<FormData>({});

  const handleParameterChange = (
    parameterName: string,
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setForm({ ...form, [parameterName]: event.target.value as string });
  };
  const saveForm = () => {
    console.log(form);
  };

  const init = async () => {
    const serviceModel = await getServices();
    const targetService = serviceModel[0]; //assume that we need only the first service from row

    setForm(
      targetService.parameters.input.reduce(
        (reduced, parameter) => ({ ...reduced, [parameter.name]: "" }),
        {}
      )
    );
    setService(targetService);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="spec-form">
      {service ? (
        <form noValidate>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            {Object.entries(service.parameters.input).map(
              ([parameterName, parameter]) => {
                switch (parameter.type) {
                  case "number":
                    return (
                      <FormControl
                        fullWidth
                        margin="normal"
                        key={`${parameterName}`}
                      >
                        <InputLabel htmlFor={parameter.name}>
                          {parameter.title}
                        </InputLabel>
                        <Input
                          id={parameter.name}
                          aria-describedby={parameter.title}
                          value={form[parameter.name]}
                          onChange={handleParameterChange.bind(
                            window,
                            parameter.name
                          )}
                        />
                      </FormControl>
                    );
                  case "select":
                    return (
                      <FormControl
                        fullWidth
                        margin="normal"
                        key={`${parameterName}`}
                      >
                        <InputLabel htmlFor={parameter.name}>
                          {parameter.title}
                        </InputLabel>
                        <Select
                          id={`${parameterName}`}
                          value={form[parameter.name]}
                          onChange={handleParameterChange.bind(
                            window,
                            parameter.name
                          )}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {(parameter as SelectParameter).items.map(
                            (item, parameterIndex) => (
                              <MenuItem
                                key={`${parameterName}-${parameterIndex}`}
                                value={item.value}
                              >
                                {item.title}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    );
                  default:
                    return `${JSON.stringify(parameterName)}, ${JSON.stringify(
                      parameter
                    )} is not supported`;
                }
              }
            )}
            <Button variant="contained" color="primary" onClick={saveForm}>
              Save
            </Button>
          </Grid>
        </form>
      ) : (
        "Загрузка"
      )}
    </div>
  );
}

export default SpecForm;
