import { ComponentType } from "react";

import { DataConsumer } from "../../components/data-provider";
import { DataConsumerState } from "../../components/data-provider/data-consumer-state.interface";

export const withData = (
  Component: ComponentType<Partial<DataConsumerState>>
) => {
  return (props: any) => {
    return (
      <DataConsumer>
        {data => {
          return <Component {...props} {...data} />;
        }}
      </DataConsumer>
    );
  };
};
