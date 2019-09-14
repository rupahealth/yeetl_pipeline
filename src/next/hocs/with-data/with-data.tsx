import { ComponentType } from "react";

import { DataConsumer } from "../../components/data-provider";
import { DataConsumerState } from "../../components/data-provider/data-consumer-state.interface";

export const withData = (
  Component: ComponentType<Partial<DataConsumerState>>
) => {
  return (props: any) => {
    return (
      <DataConsumer>
        {({ repos, createRepo, deleteRepo, updateRepo, loaded }) => {
          return (
            <Component
              {...props}
              repos={repos}
              loaded={loaded}
              createRepo={createRepo}
              deleteRepo={deleteRepo}
              updateRepo={updateRepo}
            />
          );
        }}
      </DataConsumer>
    );
  };
};
