import { execute, makePromise } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import fetch from "node-fetch";
import { sanitizeName } from "./sanitizeName";

const uri = "http://localhost:3333/graphql";
const link = createHttpLink({ uri, fetch });

export const createArea = (record) => {
  if (record.AREA != undefined) {
    const gqlmutation = {
      query: gql`
        mutation createArea($input: AreaInput) {
          CreateArea(area: $input) {
            id
            name
          }
        }
      `,
      variables: {
        input: {
          name: sanitizeName(record.AREA),
          location: "Unset",
        },
      },
    };
    execute(link, gqlmutation).subscribe({
      next: (data) =>
        console.log(`received data: ${JSON.stringify(data, null, 2)}`),
      error: (error) =>
        console.log(`received error ${JSON.stringify(error, null, 2)}`),
      complete: () => console.log(`complete`),
    });
  }
};

// Since this is an async function I can't give a result until it is resolved, so I'll return the observable and subscribe on it.
export const getArea = async (record) => {
  return new Promise(async (resolve, reject) => {
    if (sanitizeName(record.AREA) != undefined) {
      const areaquery = {
        query: gql`
          query area($name: String!) {
            area(name: $name) {
              id
              name
              machines
            }
          }
        `,
        variables: {
          name: sanitizeName(record.AREA),
        },
      };
      resolve(execute(link, areaquery));
    }
  });
};

export const createAreaFromMachine = async (record, id) => {
  return new Promise(async (resolve, reject) => {
    if (sanitizeName(record.AREA) != undefined) {
      let areaQueryResults = await getArea(record);
      areaQueryResults.subscribe({
        next: (data) => {
          if (data.data.area != null) {
            console.log(`${sanitizeName(record.AREA)} already on db`);
            if (
              data.data.area.machines == undefined ||
              data.data.area.machines[0] == null
            ) {
              console.log(`update from undefined ${data.area.machines}`);
              const newMachines = [id];
              resolve(updateAreaMachines(newMachines, data.data.area.id));
            } else {
              console.log(`Defined machines: ${data.data.area.machines}`);
              console.log(`Current machine: ${id}`);
              let inlist = false;
              Promise.all(
                data.data.area.machines.map((machine) => {
                  if (machine == id) inlist = true;
                })
              ).then(() => {
                if (inlist) {
                  console.log("already on record");
                  resolve(getArea(record));
                } else {
                  let newMachines = [id];
                  Promise.all(
                    data.data.area.machines.map((machine) => {
                      console.log(`Machine list iter: ${machine}`);
                      console.log(`new Machines: ${newMachines}`);
                      newMachines = [...newMachines, machine];
                    })
                  ).then(() => {
                    console.log(`Area ID: ${data.data.area.id}`);
                    resolve(updateAreaMachines(newMachines, data.data.area.id));
                  });
                }
              });
            }
          } else {
            console.log(`${sanitizeName(record.AREA)} not on db`);
            const gqlmutation = {
              query: gql`
                mutation createArea($input: AreaInput) {
                  CreateArea(area: $input) {
                    id
                    name
                    machines
                  }
                }
              `,
              variables: {
                input: {
                  name: sanitizeName(record.AREA),
                  location: "Unset",
                  machines: [id],
                },
              },
            };
            execute(link, gqlmutation).subscribe({
              next: (data) =>
                console.log(`received data: ${JSON.stringify(data, null, 2)}`),
              error: (error) =>
                console.log(`received error ${JSON.stringify(error, null, 2)}`),
              complete: () => console.log(`complete`),
            });
          }
        },
        error: (error) =>
          console.log(`received error ${JSON.stringify(error, null, 2)}`),
        complete: () => {},
      });
    }
  });
};

export const updateAreaMachines = async (machines, areaId) => {
  console.log(`updating ${machines.length} machine records`);
  const gqlmutation = {
    query: gql`
      mutation updateArea($input: AreaInput) {
        UpdateArea(machines: $input) {
          id
          name
          machines
        }
      }
    `,
    variables: {
      input: {
        id: areaId,
        machines: machines,
      },
    },
  };
  execute(link, gqlmutation).subscribe({
    next: (data) => {}, //console.log(`received data: ${JSON.stringify(data, null, 2)}`),
    error: (error) =>
      console.log(`received error ${JSON.stringify(error, null, 2)}`),
    complete: () => console.log(`complete`),
  });
};
